// -----JS CODE-----
// @input Component.Head headBinding
// @input SceneObject badgeObj
// @input Component.ScriptComponent weatherScript
// @input Component.ScriptComponent messageScript
// @input Component.Text pauseText
// @input Component.Text titleText
// @input Component.Text badgeText
// @input float segmentDuration


var lastTime = 0.0;
script.pauseText.enabled = false;
script.badgeText.text = "Laura";
script.badgeObj.enabled = true;
script.messageScript.bubbleDurationSeconds = 2.0;

function onFrame(eventData) {
    var curTime = getTime();
    function momentPassed(time) {
        return (curTime > time) && (lastTime < time);
    }
    
    // first switch
    if(momentPassed(script.segmentDuration)) {
        script.badgeObj.enabled = false;
        script.titleText.text = "Emotion Tracker";
        global.emotionTrackerActive = true;
    }
    if(momentPassed(1.9 * script.segmentDuration)) {
        global.emotionTrackerActive = false; 
    }
        
    // second switch
    if(momentPassed(2 * script.segmentDuration)) {
        script.titleText.text = "Weather Notification";     
    }
    if(momentPassed(2.1 * script.segmentDuration)) {    
        script.weatherScript.api.showWeather();
    }
    if(momentPassed(2.5 * script.segmentDuration)) {
        script.titleText.text = "Weather Notification";
        script.weatherScript.api.triggerBadWeather();
    }
    if(momentPassed(2.95 * script.segmentDuration)) {
        script.titleText.text = "Weather Notification";
        script.weatherScript.api.hideWeather();
    }
    
    // third switch
    if(momentPassed(3 * script.segmentDuration)) {
        script.titleText.text = "Message Notification";
        script.messageScript.api.toggleNotification("1");
    }    
    if(momentPassed(3.5 * script.segmentDuration)) {
        script.messageScript.api.toggleNotification("2");
        global.clockRunning = true;
    }
    
    // forth switch
    if(momentPassed(4 * script.segmentDuration)) {
        script.titleText.text = "Conversation Clock";
        global.clockShown = true;
    }
    
    // final state
    if(momentPassed(5 * script.segmentDuration)) {
        script.titleText.enabled = false;
        global.clockShown = false;
    }

    lastTime = curTime;
}

var event = script.createEvent("UpdateEvent");
event.bind(onFrame);
