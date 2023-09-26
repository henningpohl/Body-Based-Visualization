// -----JS CODE-----
// @input vec3 inPos
// @input vec3 outPos
// @input SceneObject bubbleRoot
// @input Component.Text bubbleNumberText
// https://docs.snap.com/lens-studio/references/templates/object/Try-On/earring-try-on
// https://support.lensstudio.snapchat.com/hc/en-us/community/posts/115020391963-Using-Tween-js-for-Simple-Animations

var curCount = "";
var msgTweens = new TWEEN.Group();

script.createEvent("UpdateEvent").bind(function(eventData) {
    msgTweens.update();    
    //var time = getDeltaTime();    
});

script.api.toggleNotification = function(count) {
    var obj = script.getSceneObject();
    var transform = obj.getTransform();
    var bubbleTransform = script.bubbleRoot.getTransform();
        
    if(count != curCount && msgTweens.getAll().length > 0) {
        curCount = count;
        script.bubbleNumberText.text = count;
        return;
    }    
    
    function updateRod(pos) {
        var newPos = new vec3(pos.x, pos.y, pos.z);
        transform.setLocalPosition(newPos);
    }    
    
    function updateBubble(rot) {
        bubbleTransform.setLocalRotation(quat.fromEulerAngles(rot.x, 0, 0));
    }  
    
    var rodOutTween = new TWEEN.Tween({x: script.inPos.x, y: script.inPos.y, z: script.inPos.z}, msgTweens)
    .to({x: script.outPos.x, y: script.outPos.y, z: script.outPos.z}, 1500.0)
    .easing(TWEEN.Easing.Elastic.Out)
    .onUpdate(updateRod);
    
    var rodInTween = new TWEEN.Tween({x: script.outPos.x, y: script.outPos.y, z: script.outPos.z}, msgTweens)
    .to({x: script.inPos.x, y: script.inPos.y, z: script.inPos.z}, 1500.0)
    .easing(TWEEN.Easing.Elastic.In)
    .onUpdate(updateRod);
    
    var bubbleOutTween = new TWEEN.Tween({x: -2.8}, msgTweens)
    .to({x: 0}, 900.0)
    .easing(TWEEN.Easing.Elastic.Out)
    .onUpdate(updateBubble);
    
    var bubbleInTween = new TWEEN.Tween({x: 0}, msgTweens)
    .to({x: -2.8}, 900.0)
    .easing(TWEEN.Easing.Elastic.In)
    .onUpdate(updateBubble);
    
    script.bubbleNumberText.text = count;
    curCount = count;
    rodOutTween.chain(bubbleOutTween);
    bubbleOutTween.chain(bubbleInTween);
    bubbleInTween.delay(20000);
    bubbleInTween.chain(rodInTween);
    rodOutTween.start();

    //Studio.log(newPos);
    
}

/*
script.createEvent("TapEvent").bind(function(eventData){   
    toggleNotification(Math.floor(Math.random() * 10).toString());
});
*/

//toggleNotification("2");