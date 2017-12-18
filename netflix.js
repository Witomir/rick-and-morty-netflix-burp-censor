var muteData = {
    "1": {
        "1": [
            [369.6, 4.5],
            [481.9, 3.9],
            [577.5, 2.9],
            [673.0, 3.6],
            [750.4, 2.3],
            [893.2, 4.0],
            [897.4, 2.5],
            [1134.4, 3.4],
            [1157.6, 4.4],
            [1174.2, 2.8],
            [1226.2, 3.7]
        ],
        "2": [],
        "3": [
            [83.3, 3.7],
            [93.7, 3.4],
            [187.4, 3.5],
            [201.1, 2.0],
            [526.8, 4.0],
            [1203.5, 2.7]
        ],
        "4": [
            [177.0, 3.9],
            [316.3, 3.1],
            [518.6, 3.2],
            [773.6, 3.2],
            [1148.2, 2.7]
        ],
        "5": [
            [177.6, 3.1],
            [257.3, 2.5],
            [466.0, 2.1]
        ],
        "6": [
            [212.6, 2.7]
        ],
        "7": [
            [6.9, 3.9],
            [69.6, 4.2],
            [202.0, 3.5],
            [443.1, 2.3],
            [525.6, 3.6],
            [921.0, 2.4],
            [1234.9, 2.1]
        ],
        "8": [
            [59.0, 2.4],
            [959.6, 2.9],
            [962.5, 3.4],
            [1174.3, 4.7],
            [1183.8, 2.2],
            [1190.1, 1.8]
        ],
        "9": [
            [113.3, 3.4],
            [252.0, 3.5],
            [328.5, 2.8],
            [336.7, 3.5],
            [412.3, 1.5],
            [847.3, 2.4],
            [973.2, 1.1],
            [1266.3, 4.5],
            [1273.1, 1.6]
        ],
        "10": [
            [105.5, 3.7],
            [200.4, 3.4],
            [237.7, 3.6],
            [415.3, 2.5],
            [454.7, 4.3],
            [465.2, 2.4],
            [628.4, 3.0],
            [873.4, 3.3],
            [1093.8, 3.5],
            [1156.3, 3.6],
            [1196.2, 2.8]
        ],
        "11": [
            [137.2, 3.1],
            [167.8, 4.2],
            [531.3, 3.4],
            [915.7, 1.7],
            [1185.4, 2.9],
            [1245.4, 2.7]
        ]
    },
    "2": {
        "1": [
            [42.8, 2.7],
            [406.7, 2.2],
            [570.9, 3.1],
            [714.4, 2.2],
            [742.4, 2.1]
        ],
        "2": [
            [163.7, 3.3]
        ],
        "3": [
            [23.4, 2.7],
            [241.5, 3.0],
            [458.1, 2.0],
            [848.6, 2.2],
            [867.1, 1.9],
            [1066.8, 2.9],
            [1334.3, 3.0]
        ],
        "4": [
            [369.2, 2.5]
        ],
        "5": [
            [52.8, 4.9],
            [177.1, 3.7],
            [578.3, 1.7],
            [580.1, 2.6],
            [840.8, 2.2]
        ],
        "6": [
            [16.1, 3.1],
            [38.2, 3.1],
            [145.3, 3.2],
            [428.1, 4.6],
            [488.9, 2.2],
            [1032.8, 2.4]
        ],
        "7": [
            [407.5, 3.1]
        ],
        "8": [
            [41.6, 3.2]
        ],
        "9": [
            [12.1, 2.2],
            [174.2, 1.3],
            [247.5, 1.4],
            [492.6, 1.9],
            [969.3, 1.6],
            [1010.1, 3.5],
            [1113.2, 2.0]
        ],
        "10": [
            [59.7, 1.5],
            [433.1, 1.4],
            [470.8, 2.9],
            [744.3, 3.0]
        ]
    },
    "3": {
        "1": [
            [687.9, 2.4],
            [701.6, 1.9],
            [796.0, 1.9],
            [920.4, 4.1],
            [1071.6, 1.7],
            [1289.3, 2.9]
        ],
        "2": [
            [1174.0, 2.4]
        ],
        "3": [
            [1175.6, 1.7]
        ],
        "4": [
            [288.2, 3.9],
            [492.5, 2.4],
            [604.4, 2.0],
            [628.2, 2.2],
            [645.9, 3.4],
            [722.4, 4.8],
            [794.5, 1.6],
            [1154.9, 2.8]
        ],
        "5": [
            [36.5, 2.1]
        ],
        "6": [
            [42.3, 1.9],
            [278.3, 2.1],
            [280.5, 1.7],
            [853.1, 2.0],
            [964.0, 1.9],
            [966.0, 2.4],
            [1227.1, 2.0]
        ],
        "7": [
            [25.6, 3.3],
            [43.7, 2.0],
            [369.2, 1.7],
            [1035.3, 1.6],
            [1141.0, 1.9]
        ],
        "8": [
            [103.3, 2.3],
            [105.7, 2.7]
        ],
        "9": [
            [614.8, 2.3]
        ],
        "10": [
            [545.8, 1.4],
            [1270.6, 1.8]
        ]
    }
};

var videoElement;
var appIntervalId;
var currentSeason;
var currentEpisode;

chrome.runtime.onMessage.addListener(data => {
    if (data.action == "watching") {
        disableAppLoop();
        startLookingForVideo();
    }
});

function checkTimeLoop(){
    if(videoElement){
        var currentVideoTime = videoElement.currentTime;
        currentVideoTime = Math.round(currentVideoTime * 10);
        var curentData = muteData[currentSeason][currentEpisode];
        for(var i = 0; i < curentData.length; i++){
            var currentPoint = curentData[i];
            var muteTimestamp = currentPoint[0] * 10;
            var muteDuration = currentPoint[1] * 1000;

            if(currentVideoTime == muteTimestamp) {
                muteVideo();
                unmuteVideoAfter(muteDuration);
            }
        }
    }
}

function getSeasonNumberFromVideoTitle(videoTitle) {
    return parseInt(videoTitle.substr(1,1));
};

function getEpisodeNumberFromVideoTitle(videoTitle) {
    return parseInt(videoTitle.substr(4,6));
};

function runApp (video) {
    var videoTitle = document.querySelector('.video-title span');
    if(videoTitle){
        console.log(videoTitle.innerText);
        currentSeason = getSeasonNumberFromVideoTitle(videoTitle.innerText);
        currentEpisode = getEpisodeNumberFromVideoTitle(videoTitle.innerText);
        appIntervalId = setInterval(checkTimeLoop, 100);
    }
};

function startLookingForVideo () {
    var video = document.getElementsByTagName("video");
    if (video.length > 0) {
        videoElement = video[0];
        runApp(videoElement);
    } else {
        sheduleNextVideoLookup();
    }
};

function sheduleNextVideoLookup(){
    setTimeout(startLookingForVideo, 50);
}

sheduleNextVideoLookup();





function disableAppLoop() {
    clearInterval(appIntervalId);
};

function muteVideo() {
    videoElement.muted = true;
    console.log("mute!");
}

function unmuteVideoAfter(bleepDuration) {
    setTimeout(function(){
        videoElement.muted = false;
        console.log("unmuted");
    }, bleepDuration);
}
