// -----JS CODE-----
// @input Asset.Material circleMat

global.clockRunning = false;
global.clockShown = false;
global.clockTime = 0.0;
var offsetTime = 0.0;

script.circleMat.mainPass.Tweak_N0 = 0.0;   

script.createEvent("UpdateEvent").bind(function(eventData) {
    if(!global.clockRunning) {
        offsetTime += getDeltaTime();
        return;
    }
    
    global.clockTime = getTime() - offsetTime;
    var seconds = global.clockTime % 60;
    
    if(!global.clockShown) {
        seconds = 0.0;
    }
    
    script.circleMat.mainPass.Tweak_N0 = seconds / 60.0;    
    //Studio.log(seconds);
});