var VSHADER_SOURCE = `
attribute vec4 a_Position;
attribute vec4 a_Color;
uniform mat4 a_Mat;
varying vec4 v_Color;
void main(){
  gl_Position = a_Mat * a_Position;
  gl_PointSize = 10.0;
  v_Color = a_Color;
}`;

var FSHADER_SOURCE = `
precision mediump float;
varying vec4 v_Color;
void main(){
gl_FragColor = v_Color; 
}`;

var ANGLE_STEP = -45.0;
var Angle = 0;
var Trans_STEP = 1.0;
var Tx = 0.0

function main() {
  var canvas = document.getElementById('webgl');
  var gl = getWebGLContext(canvas);
  initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE);
  var n = initVertexBuffers(gl);
  gl.clearColor(0, 0, 0, 1);
  var modelMatrix = new Matrix4();

  var a_Mat = gl.getUniformLocation(gl.program, 'a_Mat');
  var tick = function () {
    Angle = animate(Angle);
    draw(gl, n, Angle, modelMatrix, a_Mat);
    requestAnimationFrame(tick, canvas);
  }
  tick();
}

function initVertexBuffers(gl) {
  var vertices = new Float32Array([
    0.0, 0.0, 1, 0, 0,
    0.5, 0.5, 0, 0, 1,
    0.5, 0.0, 0, 1, 0,
    -0.5, 0.0, .3, .2, .1,
    -0.5, 0.5, 1, 0, 1
  ]);
  var n = 5;
  var FSIZE = vertices.BYTES_PER_ELEMENT;

  var vertexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
  var a_Position = gl.getAttribLocation(gl.program, 'a_Position');
  gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 5 * FSIZE, 0);
  gl.enableVertexAttribArray(a_Position);


  var a_Color = gl.getAttribLocation(gl.program, 'a_Color');
  gl.vertexAttribPointer(a_Color, 3, gl.FLOAT, false, 5 * FSIZE, FSIZE * 2);
  gl.enableVertexAttribArray(a_Color);
  return n;
}
function draw(gl, n, Angle, modelMatrix, a_Mat) {
  //modelMatrix.setTranslate(0, Tx, 0);
  modelMatrix.setRotate(Angle, 0, 0, 1);
  gl.uniformMatrix4fv(a_Mat, false, modelMatrix.elements);
  gl.clear(gl.COLOR_BUFFER_BIT);
  gl.drawArrays(gl.TRIANGLE_FAN, 0, n);
}

var g_last = Date.now();
function animate() {
  var now = Date.now();
  var elapsed = now - g_last;
  g_last = now;

  var newAngle = Angle + (ANGLE_STEP * elapsed) / 100.0;
  return newAngle %= 360;
}