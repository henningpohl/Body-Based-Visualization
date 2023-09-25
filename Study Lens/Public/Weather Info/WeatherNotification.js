// -----JS CODE-----
// @input Component.AnimationMixer mixer
// @input SceneObject cloud
// @input Component.VFXComponent rainVFX

var weatherTweens = new TWEEN.Group();
var transform = script.cloud.getTransform();
var finalPos = transform.getLocalPosition();
var finalScale = transform.getLocalScale();
var shown = false;

//transform.setLocalPosition(new vec3(-1000, 0, 0));
script.rainVFX.enabled = false;
//script.rainVFX.clear();

function updateCloud(data) {
    transform.setLocalScale(new vec3(data.scale, data.scale, data.scale));
    transform.setLocalPosition(new vec3(data.x, data.y, data.z))
}

function showWeather() {
    new TWEEN.Tween({x: 0, y: 10, z: -25, scale: 0}, weatherTweens)
    .to({x: finalPos.x, y: finalPos.y, z: finalPos.z, scale: finalScale.x}, 2000.0)
    .easing(TWEEN.Easing.Elastic.Out)
    .onUpdate(updateCloud)
    .start();
}

function hideWeather() {
    new TWEEN.Tween({x: finalPos.x, y: finalPos.y, z: finalPos.z, scale: finalScale.x}, weatherTweens)
    .to({x: -20, y: -20, z: 5, scale: 0}, 2000.0)
    .easing(TWEEN.Easing.Elastic.Out)
    .onUpdate(updateCloud)
    .start();
}

function triggerBadWeather() {
    script.mixer.setWeight('collide', 1.0);
    script.mixer.start('collide', 0.0, 1);
    script.rainVFX.enabled = true;
    //script.rainVFX.restart();
}


script.createEvent('TapEvent').bind(function(eventData) {
    
    /*
    if(shown) {
        hideWeather();
    } else {
        showWeather();    
    }
    shown = !shown;
    */
    triggerBadWeather();
});

script.createEvent("UpdateEvent").bind(function(eventData) {
    weatherTweens.update();
});



