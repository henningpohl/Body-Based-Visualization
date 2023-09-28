// -----JS CODE-----
// @input Component.Head headBinding
// @input SceneObject badgeObj
// @input Component.ScriptComponent weatherScript
// @input Component.ScriptComponent messageScript
// @input Component.Text pauseText
// @ui {"widget":"separator"}
// @input vec2 cloudAppearTime
// @input vec2 weatherChangeTime
// @input vec2 cloudLeaveTime
// @input vec2 emotionTrackerStartTime
// @input vec2 emotionTrackerEndTime
// @input vec2 clockAppearTime
// @input vec2[] messageNotificationTimes 

var cloudShowTime = MathUtils.randomRange(script.cloudAppearTime.x, script.cloudAppearTime.y);
var cloudChangeTime = MathUtils.randomRange(script.weatherChangeTime.x, script.weatherChangeTime.y);
var cloudGoneTime = MathUtils.randomRange(script.cloudLeaveTime.x, script.cloudLeaveTime.y);

var emotionTrackerStartTime = MathUtils.randomRange(script.emotionTrackerStartTime.x, script.emotionTrackerStartTime.y);
var emotionTrackerEndTime = MathUtils.randomRange(script.emotionTrackerEndTime.x, script.emotionTrackerEndTime.y);

var clockAppearTime = MathUtils.randomRange(script.clockAppearTime.x, script.clockAppearTime.y);

var messageTimes = [];
for(var i in script.messageNotificationTimes) {
    var inputRange = script.messageNotificationTimes[i];
    messageTimes.push(MathUtils.randomRange(inputRange.x, inputRange.y));
}

//script.badgeObj.enabled = false;    

var lastTime = 0.0;
var offsetTime = 0.0;
var paused = true;

function onFrame(eventData) {
    if(paused || script.headBinding.getFacesCount() != 1) {
        offsetTime += getDeltaTime();
        return;
    }
    
    var curTime = getTime() - offsetTime;
    
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
    if(momentPassed(emotionTrackerStartTime)) {
        global.emotionTrackerActive = true;
        Studio.log('Emotion tracking activated');
    }
    if(momentPassed(emotionTrackerEndTime)) {
        global.emotionTrackerActive = false;
        Studio.log('Emotion tracking deactivated');
    }
    if(momentPassed(clockAppearTime)) {
        global.clockShown = true;
        Studio.log('Showing clock');
    }
    
    
    for(var i = 0; i < messageTimes.length; ++i) {
        if(momentPassed(messageTimes[i])) {
            script.messageScript.api.toggleNotification((i + 1).toString());
            Studio.log('Showing message notification');
        }
    }
    
    lastTime = curTime;
}



var event = script.createEvent("UpdateEvent");
event.bind(onFrame);

script.createEvent('TapEvent').bind(function(eventData) {
    paused = !paused;
    if(paused) {
        global.clockRunning = false;
        script.pauseText.enabled = true;
    } else {
        global.clockRunning = true;
        script.pauseText.enabled = false;
    }
});