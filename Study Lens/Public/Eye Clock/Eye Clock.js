// -----JS CODE-----
// @input Asset.Material circleMat

script.createEvent("UpdateEvent").bind(function(eventData) {
    
    
    
    var time = getTime();
    var seconds = time % 60;
    var minutes = Math.floor(time - seconds);
    
    script.circleMat.mainPass.Tweak_N0 = seconds / 60.0;
    
    //Studio.log(seconds);
});