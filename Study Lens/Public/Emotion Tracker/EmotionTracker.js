// -----JS CODE-----
// @input Asset.RenderMesh faceMesh
// @input Component.Text outText
// Alternative: https://medium.com/@adrienchuttarsing/making-an-emotion-recognition-model-for-snapchat-filter-with-lens-studio-c24dc0488fa0

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
    var mouthFrownLeftWeight = script.faceMesh.control.getExpressionWeightByName(Expressions.MouthFrownLeft);
    var mouthFrownRightWeight = script.faceMesh.control.getExpressionWeightByName(Expressions.MouthFrownRight);
    var mouthOverall = (mouthSmileLeftWeight + mouthSmileRightWeight) - (mouthFrownLeftWeight + mouthFrownRightWeight);
    
    buffer.push(mouthOverall);
    if(buffer.length > bufferMax) {
        buffer.shift();
    }
    
    var smile = buffer.reduce((a, x) => a + x, 0) / buffer.length;
    
    if(smile > 1.2) {
        script.outText.text = "😄";
    } else if(smile > 0.9) {   
        script.outText.text = "😀";
    } else if(smile > 0.25) {
        script.outText.text = "😐";
    } else if(smile > 0.15) {
        script.outText.text = "😟";
    } else {
        script.outText.text = "☹";
    }
    
    //script.outText.text = mouthOverall.toString();
    //Studio.log(mouthSmileLeftWeight);
}


var event = script.createEvent("UpdateEvent");
event.bind( onFrame );
