import Player from '@vimeo/player';
import throttle from "lodash.throttle";

const DATA_KEY = "videoplayer-current-time"
// 1-------------------------------------------------------
const iframe = document.querySelector("#vimeo-player");
console.log(iframe)
const player = new Player(iframe);
console.log(player)
player.on('play', function() {
    console.log('played the video!');

});
player.getVideoTitle().then(function(title) {
    console.log('title:', title);
});

// 2--------------------------------------------------------------

const onPlay = function(data) {
    // data is an object containing properties specific to that event
    console.log(data.seconds);
    const value = JSON.stringify(data.seconds)
    const saveTime = localStorage.setItem(DATA_KEY,value)
};
const getValue = JSON.parse(localStorage.getItem(DATA_KEY)) || 0;
player.on('play', onPlay);

// ------------------------------------------------------------------

// ---------------------------------------------------------------
player.setCurrentTime(getValue).then(function(seconds) {
    // seconds = the actual time that the player seeked to
}).catch(function(error) {
    switch (error.name) {
        case 'RangeError':
            // the time was less than 0 or greater than the video’s duration
            break;
            
            default:
                // some other error occurred
                break;
            }
        });
        // ------------------------------------------------------------------------
        
        const throttledSaveTime = throttle(onPlay, 1000);
        player.on("timeupdate", throttledSaveTime);
        
