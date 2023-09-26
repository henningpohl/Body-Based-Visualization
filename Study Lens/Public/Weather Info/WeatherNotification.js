// -----JS CODE-----
// @input float infoShowDuration
// @input Component.AnimationMixer mixer
// @input SceneObject cloud
// @input Component.VFXComponent rainVFX
// @input Component.Text3D infoText

var weatherTweens = new TWEEN.Group();
var transform = script.cloud.getTransform();
var finalPos = transform.getLocalPosition();
var finalScale = transform.getLocalScale();

var labelTransform = script.infoText.getTransform();
var labelInPos = new vec3(0.0, 5.0, 0.0);
var labelOutPos = labelTransform.getLocalPosition();

function hideInfoLabel() {
    labelTransform.setLocalScale(new vec3(2, 2, 2));
    labelTransform.setLocalPosition(labelInPos);
}

function updateCloud(data) {
    transform.setLocalScale(new vec3(data.scale, data.scale, data.scale));
    transform.setLocalPosition(new vec3(data.x, data.y, data.z))
}

function updateLabel(data) {
    labelTransform.setLocalScale(new vec3(data.scale, data.scale, data.scale));
    labelTransform.setLocalPosition(new vec3(data.x, data.y, data.z))
}

script.api.showWeather = function() {
    hideInfoLabel();
    script.infoText.text = 'Clouds incoming';
    
    var cloudTweenIn = new TWEEN.Tween({x: 0, y: 10, z: -25, scale: 0}, weatherTweens)
    .to({x: finalPos.x, y: finalPos.y, z: finalPos.z, scale: finalScale.x}, 2000.0)
    .easing(TWEEN.Easing.Elastic.Out)
    .onUpdate(updateCloud);
    
    var labelTweenIn = new TWEEN.Tween({x: labelInPos.x, y: labelInPos.y, z: labelInPos.z, scale: 2.0}, weatherTweens)
    .to({x: labelOutPos.x, y: labelOutPos.y, z: labelOutPos.z, scale: 15.0}, 200.0)
    .easing(TWEEN.Easing.Quadratic.Out)
    .onUpdate(updateLabel)
    .onComplete(function() {
        labelTweenOut.delay(script.infoShowDuration);        
        labelTweenOut.start();
    });
    
    var labelTweenOut = new TWEEN.Tween({x: labelOutPos.x, y: labelOutPos.y, z: labelOutPos.z, scale: 15.0}, weatherTweens)
    .to({x: labelInPos.x, y: labelInPos.y, z: labelInPos.z, scale: 2.0}, 200.0)
    .easing(TWEEN.Easing.Quadratic.In)
    .onUpdate(updateLabel);
    
   
    cloudTweenIn.chain(labelTweenIn);
    cloudTweenIn.start();
}

script.api.hideWeather = function() {
    hideInfoLabel();
    
    new TWEEN.Tween({x: finalPos.x, y: finalPos.y, z: finalPos.z, scale: finalScale.x}, weatherTweens)
    .to({x: -20, y: -20, z: 5, scale: 0}, 2000.0)
    .easing(TWEEN.Easing.Elastic.Out)
    .onUpdate(updateCloud)
    .start();
}

script.api.triggerBadWeather = function() {
    script.infoText.text = 'Caution: Rain!';
    script.mixer.setWeight('collide', 1.0);
    script.mixer.start('collide', 0.0, 1);
    script.rainVFX.enabled = true;
    //script.rainVFX.restart();
    
    var labelTweenIn = new TWEEN.Tween({x: labelInPos.x, y: labelInPos.y, z: labelInPos.z, scale: 2.0}, weatherTweens)
    .to({x: labelOutPos.x, y: labelOutPos.y, z: labelOutPos.z, scale: 15.0}, 200.0)
    .easing(TWEEN.Easing.Quadratic.Out)
    .onUpdate(updateLabel)
    .onComplete(function() {
        labelTweenOut.delay(script.infoShowDuration);        
        labelTweenOut.start();
    });
    
    var labelTweenOut = new TWEEN.Tween({x: labelOutPos.x, y: labelOutPos.y, z: labelOutPos.z, scale: 15.0}, weatherTweens)
    .to({x: labelInPos.x, y: labelInPos.y, z: labelInPos.z, scale: 2.0}, 200.0)
    .easing(TWEEN.Easing.Quadratic.In)
    .onUpdate(updateLabel);
    
    labelTweenIn.start();
}

script.createEvent("UpdateEvent").bind(function(eventData) {
    weatherTweens.update();
});

script.rainVFX.enabled = false;
//script.rainVFX.clear();
hideInfoLabel();
transform.setLocalPosition(new vec3(-1000, 0, 0));

