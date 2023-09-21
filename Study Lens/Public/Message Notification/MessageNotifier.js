// -----JS CODE-----
// @input vec3 inPos
// @input vec3 outPos
// https://docs.snap.com/lens-studio/references/templates/object/Try-On/earring-try-on
// https://support.lensstudio.snapchat.com/hc/en-us/community/posts/115020391963-Using-Tween-js-for-Simple-Animations

var visibleState = false;

function onFrame(eventData) {
    TWEEN.update();    
    //var time = getDeltaTime();
}

script.createEvent("UpdateEvent").bind(onFrame);

script.createEvent("TapEvent").bind(function(eventData){
    var obj = script.getSceneObject();
    var transform = obj.getTransform();
   
    var tPos = transform.getLocalPosition();
    var curPos = {
        x: tPos.x,
        y: tPos.y,
        z: tPos.z
    }
    var endPos = {
        x: visibleState ? script.outPos.x : script.inPos.x,
        y: visibleState ? script.outPos.y : script.inPos.y,
        z: visibleState ? script.outPos.z : script.inPos.z
    }

    new TWEEN.Tween(curPos)
    .to(endPos, 500.0)
    .easing(TWEEN.Easing.Elastic.Out)
    .onUpdate(function() {
        var newPos = new vec3(curPos.x, curPos.y, curPos.z);
        //Studio.log(newPos);
        transform.setLocalPosition(newPos);
    })
    .start();

    
    visibleState = !visibleState;
});