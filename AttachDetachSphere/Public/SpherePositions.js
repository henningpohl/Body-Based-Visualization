// -----JS CODE-----
// @input vec3[] scales
// @input vec3[] positions
// @input int index

var transform = script.getTransform();
transform.setLocalScale(script.scales[script.index]);
transform.setLocalPosition(script.positions[script.index]);
