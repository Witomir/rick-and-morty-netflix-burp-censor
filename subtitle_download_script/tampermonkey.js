// ==UserScript==
// @name        Netflix - subtitle downloader
// @description Allows you to download subtitles from Netflix
// @license     MIT
// @version     2.2.0
// @namespace   tithen-firion.github.io
// @include     https://www.netflix.com/*
// @grant       none
// @require     https://cdn.rawgit.com/Tithen-Firion/UserScripts/7bd6406c0d264d60428cfea16248ecfb4753e5e3/libraries/xhrHijacker.js?version=1.0
// @require     https://cdn.rawgit.com/sizzlemctwizzle/GM_config/232c002a7421f10b666c6205b9f495367ba9dac2/gm_config.js?version=2016-11-03
// @require     https://cdn.rawgit.com/Stuk/jszip/579beb1d45c8d586d8be4411d5b2e48dea018c06/dist/jszip.min.js?version=3.1.5
// @require     https://cdn.rawgit.com/eligrey/FileSaver.js/5ed507ef8aa53d8ecfea96d96bc7214cd2476fd2/FileSaver.min.js?version=1.3.3
// ==/UserScript==

var MAIN_TITLE = '.player-status-main-title, .ellipsize-text>h4, .video-title>h4';
var TRACK_MENU = '#player-menu-track-settings, .audio-subtitle-controller';
var NEXT_EPISODE = '.player-next-episode:not(.player-hidden), .button-nfplayerNextEpisode';
var SELECTED_SUBS = '.player-timed-text-tracks > .player-track-selected';

var DOWNLOAD_MENU = `<lh class="list-header">Netflix subtitle downloader</lh>
<li class="list-header">Netflix subtitle downloader</li>
<li class="track options">Options</li>
<li class="track download">Download subs for this episode</li>
<li class="track download-all">Download subs from this ep till last available</li>`;

var SCRIPT_CSS = `.player-timed-text-tracks, .track-list-subtitles{ border-right:1px solid #000 }
.player-timed-text-tracks+.player-timed-text-tracks, .track-list-subtitles+.track-list-subtitles{ border-right:0 }
#player-menu-track-settings .subtitle-downloader-menu li.list-header,
.audio-subtitle-controller .subtitle-downloader-menu lh.list-header{ display:none }`;
var OPTIONS_CSS = `#NetflixSubtitleDownloaderConfig_wrapper{ text-align:center }
.config_var{ display:inline-block; padding:10px }
.config_var>*{ vertical-align:middle }`;

var DOWNLOADED_WITH = 'Subtitles downloaded with "Netflix subtitle downloader" UserScript by Tithen-Firion.';

// INIT
(function () {
    // default settings
    GM_config.init({
        'id': 'NetflixSubtitleDownloaderConfig',
        'title': 'Script Settings',
        'fields': {
            'b': {
                'label': 'bold (&lt;b>...&lt;/b>)',
                'type': 'checkbox',
                'default': true
            },
            'i': {
                'label': 'italics (&lt;i>...&lt;/i>)',
                'type': 'checkbox',
                'default': true
            },
            'u': {
                'label': 'underline (&lt;u>...&lt;/u>)',
                'type': 'checkbox',
                'default': true
            },
            'font': {
                'label': 'colour (&lt;font color="...">...&lt;/font>)',
                'type': 'checkbox',
                'default': true
            },
            'position': {
                'label': 'position ({\\an8})',
                'type': 'checkbox',
                'default': false
            }
        },
        'css': OPTIONS_CSS
    });

    // add CSS style
    var s = document.createElement('style');
    s.innerHTML = SCRIPT_CSS;
    document.head.appendChild(s);

    // add menu when it's not there
    var observer = new MutationObserver(function (mutations) {
        mutations.forEach(function (mutation) {
            mutation.addedNodes.forEach(function (node) {
                if (node.nodeName.toUpperCase() == 'DIV') {
                    let trackMenu = (node.parentNode || node).querySelector(TRACK_MENU);
                    if (trackMenu !== null && trackMenu.querySelector('.subtitle-downloader-menu') === null) {
                        let ol = document.createElement('ol');
                        ol.setAttribute('class', 'subtitle-downloader-menu player-timed-text-tracks track-list track-list-subtitles');
                        ol.innerHTML = DOWNLOAD_MENU;
                        trackMenu.appendChild(ol);
                        ol.querySelector('.options').addEventListener('click', GM_config.open.bind(GM_config));
                        ol.querySelector('.download').addEventListener('click', downloadThis);
                        ol.querySelector('.download-all').addEventListener('click', downloadAll);
                    }
                }
            });
        });
    });
    observer.observe(document.body, {childList: true, subtree: true});
})();

// get show name or full name with episode number
function getTitle(full) {
    full = full || false;
    var titleElement = document.querySelector(MAIN_TITLE);
    if (titleElement === null)
        return null;
    var title = "";
    if (full) {
        var episodeElement = titleElement.nextElementSibling;
        if (episodeElement) {
            var m = episodeElement.innerText.match(/^[^\d]*?(\d+)[^\d]*?(\d+)?[^\d]*?$/);
            if (m && m.length == 3) {
                if (typeof m[2] == 'undefined') // example: Stranger Things season 1
                    title += 'S01E' + m[1].padStart(2, '0');
                else
                    title += 'S' + m[1].padStart(2, '0') + 'E' + m[2].padStart(2, '0');
            }
        }
        var selectedSubs = document.querySelector(SELECTED_SUBS);
        if (selectedSubs !== null)
            title += '.' + selectedSubs.getAttribute('data-id').split(';')[2];
    }
    return title;
}

function setCurrentSubFile(extension, content, count) {
    if (typeof currentSubFile == 'undefined' || currentSubFile.count < count) {
        let title = getTitle(true);
        if (title === null)
            window.setTimeout(setCurrentSubFile, 200, extension, content, count);
        else {
            currentSubFile = {
                name: title + extension,
                content: content,
                count: count
            };
            if (batch)
                downloadAll();
        }
    }
}

// convert XML subs to SRT and set as current subs
function processXmlSubs(responseText, count) {
    var srt = responseText;
    if (srt !== null)
        setCurrentSubFile('.xml', srt, count);
}

// download and process subs in image format
function downloadImageSubs(url, count) {
    var req = new XMLHttpRequest();
    req.open('GET', url);
    req.responseType = 'arraybuffer';
    req.onload = function () {
        setCurrentSubFile('.zip', req.response, count);
    };
    req.send(null);
}
function imageSubDetection(response, count, url) {
    let arr = new Uint8Array(response);
    var str = String.fromCharCode(arr[1], arr[2], arr[3]);
    if (str == 'idx' || str == 'PNG')
        downloadImageSubs(url, count);
}

// download subs for current episode
function downloadThis() {
    if (typeof currentSubFile == 'undefined')
        window.setTimeout(downloadThis, 100);
    else {
        var blob = new Blob([currentSubFile.content]);
        saveAs(blob, currentSubFile.name, true);
    }
}
//download subs from this ep till last available
function downloadAll() {
    batch = true;
    if (typeof currentSubFile !== 'undefined') {
        zip = zip || new JSZip();
        zip.file(currentSubFile.name, currentSubFile.content);
        var nextEp = document.querySelector(NEXT_EPISODE);
        if (nextEp)
            nextEp.click();
        else
            zip.generateAsync({type: 'blob'})
                .then(function (content) {
                    saveAs(content, getTitle() + '.zip');
                    zip = undefined;
                    batch = false;
                });
    }
}

//parse URL to get parameters
function parseURL(url) {
    var vars = {};
    var params = url.slice(url.indexOf('?') + 1).split('&');
    params.forEach(param => {
        let paramPair = param.split('=');
        vars[paramPair[0]] = paramPair[1];
    });
    return vars;
}


var IDs = {}, counter = 0, batch = false, currentSubFile, zip, imageSubIDs = [], imageSubURLs = {};
xhrHijacker(function (xhr, id, origin, args) {
    if (origin === 'open' && window.location.pathname.startsWith('/watch/')) {
        let url = args[1];
        if (url.indexOf('/?o=') > -1) {
            IDs[id] = counter++;
        }
        else {
            let pattern = /\/range\/\d+-\d+\?/;
            let m = url.match(pattern);
            if (m !== null) {
                let params = parseURL(url);
                if (imageSubIDs.indexOf(params.o) === -1) {
                    IDs[id] = counter++;
                    imageSubIDs.push(params.o);
                    imageSubURLs[id] = url.replace(pattern, '/range/1-0?');
                }
            }
        }
    }
    else if (origin === 'load') {
        if (id in IDs && IDs.hasOwnProperty(id)) {
            let c = IDs[id];
            delete IDs[id];
            if (id in imageSubURLs && imageSubURLs.hasOwnProperty(id)) {
                let url = imageSubURLs[id];
                delete imageSubURLs[id];
                imageSubDetection(xhr.response, c, url);
            }
            else {
                processXmlSubs(xhr.response, c);
            }
        }
    }
});
