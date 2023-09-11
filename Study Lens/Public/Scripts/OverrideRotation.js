// -----JS CODE-----
var obj = script.getSceneObject()
var event = script.createEvent("UpdateEvent");
event.bind(function(eventData) {
    obj.getTransform().setWorldRotation(quat.quatIdentity());
});