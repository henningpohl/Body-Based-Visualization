// -----JS CODE-----
// @input Asset.RenderMesh faceMesh
// @input Asset.Material maskMaterial
// Alternative: https://medium.com/@adrienchuttarsing/making-an-emotion-recognition-model-for-snapchat-filter-with-lens-studio-c24dc0488fa0

var buffer = [];
var bufferMax = 50;

global.emotionTrackerActive = false;
var alpha = 0.0;

function onFrame(eventData) {
    var mouthSmileLeftWeight = script.faceMesh.control.getExpressionWeightByName(Expressions.MouthSmileLeft);
    var mouthSmileRightWeight = script.faceMesh.control.getExpressionWeightByName(Expressions.MouthSmileRight);
    var mouthFrownLeftWeight = script.faceMesh.control.getExpressionWeightByName(Expressions.MouthFrownLeft);
    var mouthFrownRightWeight = script.faceMesh.control.getExpressionWeightByName(Expressions.MouthFrownRight);
    var mouthOverall = (mouthSmileLeftWeight + mouthSmileRightWeight) - (mouthFrownLeftWeight + mouthFrownRightWeight);
    
    buffer.push(mouthOverall);
    if(buffer.length > bufferMax) {
        buffer.shift();
    }
    
    if(!global.emotionTrackerActive) {
        alpha = Math.max(0.0, alpha - getDeltaTime() * 0.3);        
    } else {
        alpha = Math.min(0.8, alpha + getDeltaTime() * 0.3);
    }

    script.maskMaterial.mainPass.Tweak_N33 = alpha;    
    var smile = buffer.reduce((a, x) => a + x, 0) / buffer.length;
    smile = MathUtils.remap(smile, 0.0, 1.5, 0.0, 1.0);
    script.maskMaterial.mainPass.Tweak_N29 = smile;

    //Studio.log(mouthSmileLeftWeight);
}


var event = script.createEvent("UpdateEvent");
event.bind( onFrame );
