// -----JS CODE-----
// Based on PinToFaceLandmarks.js
// @input Component.Camera camera
// @input Component.Head headBinding
// @input vec3 offset

// https://docs.snap.com/lens-studio/references/templates/face/face-landmarks#points-mode
var eyebrowIDs = [27, 22, 23, 24, 25, 26];
var landmarks = [];

var sceneObj = script.getSceneObject();

function getDepth() {
    return -script.headBinding.getTransform().getLocalPosition().z;
}

script.createEvent('UpdateEvent').bind(function(eventData) {
    if(script.headBinding.getFacesCount() != 1) {
        //Studio.log('No face visible');
        return;
    }
    
    var seconds = global.clockTime % 60;
    var minutes = Math.floor((global.clockTime - seconds) / 60.0);
    if(!global.clockShown) {
        minutes = 0;
    }
    
    var controlLength = 0.0;
    for(var i = 0; i < eyebrowIDs.length; ++i) {
        var lm = script.headBinding.getLandmark(eyebrowIDs[i]);
        if(i == 0) {
            landmarks[i] = new vec3(lm.x, lm.y, 0.0);
        } else {
            var delta = new vec2(lm.x - landmarks[i - 1].x, lm.y - landmarks[i - 1].ý);
            landmarks[i] = new vec3(lm.x, lm.y, delta.length);
            controlLength += landmarks[i].z;
        }
    }
    
    var minuteMarks = sceneObj.children.length;    
    for(var i = 0; i < minuteMarks; ++i) {
        var child = sceneObj.getChild(i);
        if((i + 1) > minutes) {
            child.enabled = false;
            continue;            
        } else {
            child.enabled = true;
        }
        
        var t = minuteMarks > 1 ? i / (minuteMarks - 1) : 0.0;
        t = 0.03 + 0.8 * t * controlLength;
        
        var a = 0;
        var b = 0;
        for(var j = 1; j < landmarks.length; ++j) {
            var delta = landmarks[j].z;
            if(delta > t) {
                a = j - 1;
                b = j;
                t /= delta;
                break;
            }
            a = j;
            b = j;
            t -= delta;
        }
        
        a = landmarks[Math.min(landmarks.length - 1, a)];
        b = landmarks[Math.min(landmarks.length - 1, b)];
        var ipos = vec3.lerp(a, b, t);
        var worldPos = script.camera.screenSpaceToWorldSpace(new vec2(ipos.x + script.offset.x, ipos.y + script.offset.y), getDepth());
        child.getTransform().setWorldPosition(worldPos);
    }
    
});