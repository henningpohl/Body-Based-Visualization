// -----JS CODE-----
// @input SceneObject badgeObj
// @input Component.ScriptComponent weatherScript
// @input Component.ScriptComponent messageScript
// @ui {"widget":"separator"}
// @input vec2 cloudAppearTime
// @input vec2 weatherChangeTime
// @input vec2 cloudLeaveTime
// @input vec2[] messageNotificationTimes 

var cloudShowTime = MathUtils.randomRange(script.cloudAppearTime.x, script.cloudAppearTime.y);
var cloudChangeTime = MathUtils.randomRange(script.weatherChangeTime.x, script.weatherChangeTime.y);
var cloudGoneTime = MathUtils.randomRange(script.cloudLeaveTime.x, script.cloudLeaveTime.y);

var messageTimes = [];
for(var i in script.messageNotificationTimes) {
    var inputRange = script.messageNotificationTimes[i];
    messageTimes.push(MathUtils.randomRange(inputRange.x, inputRange.y));
}

var lastTime = 0.0;

function onFrame(eventData) {
    var curTime = getTime();
    
    function momentPassed(time) {
        return (curTime > time) && (lastTime < time);
    }
    
    if(momentPassed(cloudShowTime)) {
        script.weatherScript.api.showWeather();
        Studio.log('Showing cloud');
    }
    if(momentPassed(cloudChangeTime)) {
        script.weatherScript.api.triggerBadWeather();
        Studio.log('Changing weather');
    }
    if(momentPassed(cloudGoneTime)) {
        script.weatherScript.api.hideWeather();
        Studio.log('Hiding cloud');
    }
    
    for(var i = 0; i < messageTimes.length; ++i) {
        if(momentPassed(messageTimes[i])) {
            script.messageScript.api.toggleNotification((i + 1).toString());
            Studio.log('Showing message notification');
        }
    }
    
    /*
    if(getTime() > 5.0) {
        script.badgeObj.enabled = true;
//        global.emotionTrackerActive = true;
    }
    */
    
    lastTime = curTime;
}


// hide everything first
if(false) {
    script.badgeObj.enabled = false;    
}

var event = script.createEvent("UpdateEvent");
event.bind(onFrame);

script.createEvent('TapEvent').bind(function(eventData) {
    //script.weatherScript.api.triggerBadWeather();
});