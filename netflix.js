var videoElement;
var appIntervalId;
var muteData = [
   [10.44, 0.1],
   [14.4, 0.2],
   [16.4, 0.3],
   [19.4, 0.4],
   [22.4, 0.5],
   [27.4, 1],
   [31.4, 1],
];

chrome.runtime.onMessage.addListener(data => {
    if (data.action == "watching") {
        disableAppLoop();
        startLookingForVideo();
    }
});

function checkTimeLoop(){
    if(videoElement){
        var time = videoElement.currentTime;
        time = Math.round(time * 10);
        for(var i = 0; i < muteData.length; i++){
            var currentPoint = muteData[i];
            var muteTimestamp = currentPoint[0] * 10;
            var muteDuration = currentPoint[1] * 1000;

            if(time == muteTimestamp) {
                muteVideo();
                unmuteVideoAfter(muteDuration);
            }
        }
    }
}

function runApp (video) {
    var videoTitle = document.querySelector('.video-title span');
    if(videoTitle){
        console.log(videoTitle.innerText);
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
