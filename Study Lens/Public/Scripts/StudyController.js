// -----JS CODE-----
// @input SceneObject badgeObj

function onFrame(eventData) {
    
    if(getTime() > 5.0) {
        script.badgeObj.enabled = true;
//        global.emotionTrackerActive = true;
    }
    
    
}


// hide everything first
if(false) {
    script.badgeObj.enabled = false;    
}


var event = script.createEvent("UpdateEvent");
event.bind( onFrame );
