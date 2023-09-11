// -----JS CODE-----
// https://support.lensstudio.snapchat.com/hc/en-us/community/posts/115020391963-Using-Tween-js-for-Simple-Animations
// @input vec3 startScale = {1.0, 1.0, 1.0}
// @input vec3 goalScale = {20.0, 20.0, 20.0}
// @input float time = 1.0

/*
var transform = script.getTransform();
var pos = transform.getLocalPosition();
pos.y = Math.sin(getTime() * 1) * 10;
transform.setLocalPosition(pos);
*/

var tweenStartScale = {
    x: script.startScale.x,
    y: script.startScale.y,
    z: script.startScale.z
};
var tweenGoalScale = {
    x: script.goalScale.x,
    y: script.goalScale.y,
    z: script.goalScale.z
};

var tween = new TWEEN.Tween(tweenStartScale)
    .to(tweenGoalScale, script.time * 1000.0)
    .easing(TWEEN.Easing.Elastic.Out)
    .onUpdate(function() {
        updateScale(tweenStartScale);
    })
    .yoyo(true)
    .repeat(Infinity)
    .start();


function updateScale(scale) {
    var transform = script.getTransform();
    transform.setLocalScale(new vec3(scale.x, scale.y, scale.z));
}

// On update, update the Tween engine
function onUpdateEvent() {
    TWEEN.update();
}

// Bind an update event
var updateEvent = script.createEvent("UpdateEvent");
updateEvent.bind(onUpdateEvent);