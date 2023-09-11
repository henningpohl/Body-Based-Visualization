// -----JS CODE-----
// @input Asset.RenderMesh faceMesh
// @input Component.Text outText

var buffer = [];
var bufferMax = 50;

global.emotionTrackerActive = true;

function onFrame(eventData) {
    if(!global.emotionTrackerActive) {
        script.outText.text = "";
        return;
    }    
    
    var mouthSmileLeftWeight = script.faceMesh.control.getExpressionWeightByName(Expressions.MouthSmileLeft);
    var mouthSmileRightWeight = script.faceMesh.control.getExpressionWeightByName(Expressions.MouthSmileRight);
    
    buffer.push(mouthSmileLeftWeight + mouthSmileRightWeight);
    if(buffer.length > bufferMax) {
        buffer.shift();
    }
    
    var smile = buffer.reduce((a, x) => a + x, 0) / buffer.length;
    
    if(smile > 1.0) {
        script.outText.text = "😄";
    } else if(smile > 0.7) {   
        script.outText.text = "😀";
    } else if(smile > 0.4) {
        script.outText.text = "😐";
    } else if(smile > 0.2) {
        script.outText.text = "😟";
    } else {
        script.outText.text = "☹";
    }
    
    //script.outText.text = smile.toString();
    //Studio.log(mouthSmileLeftWeight);
}


var event = script.createEvent("UpdateEvent");
event.bind( onFrame );
