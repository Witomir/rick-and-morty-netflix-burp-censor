## Purpose
This Chrome plugin was created to allow you to automatically mute audio in Rick and Morty on Netflix when Rick (or anyone else) burps.
Extension mutes audio, based on predefined list of burp timestamps and it's durations. 
I wanted to watch this show with my wife, but she hates any burp-like noises, so we were forced to watch this with polish dubbing, 
which is crap, but burps are not so disturbing.

## How to use it? 
1. Clone this repo or download it from 
[https://github.com/Witomir/rick-and-morty-netflix-burp-censor/archive/master.zip](https://github.com/Witomir/rick-and-morty-netflix-burp-censor/archive/master.zip)
2. Go to Chrome extensions settings: [chrome://extensions/](chrome://extensions/)
3. Enable "Developer mode" on top of the page
4. Click on "Load unpacked extension" and choose folder where you cloned this repo

## How to help? 
I've added 2 custom buttons to Netflix button bar, so you can save/view timestamps!

Add them to this list:  https://docs.google.com/document/d/1JEjqydLp5M5lMIm1XhRvAi35-a4OCvkNZZCxN_QY4QM/edit?usp=sharing

![plugin demo](https://thumbs.gfycat.com/BetterPracticalBetafish-size_restricted.gif)


## For devs
To create the initial data I downloaded all subtitles from Netflix using [modified tampermonkey script](subtitle_download_script/tampermonkey.js) 
from [https://greasyfork.org/pl/scripts/26654-netflix-subtitle-downloader](https://greasyfork.org/pl/scripts/26654-netflix-subtitle-downloader). 
Then I used python script to scan those subtitles and grep "burps" word, extract timestamps, and subtitle duration.
It's not perfect, because it mutes the duration of a whole sentence, and has to be adjusted by hand. It also doesn't 
include lots of shorter burps, that are not subtitle-worthy.