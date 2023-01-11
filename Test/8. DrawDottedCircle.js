
var VSHADER_SOURCE = `
  attribute vec4 a_Pos;  
  void main() { 
    gl_Position = a_Pos; 
    gl_PointSize = 10.0; 
  }`;

var FSHADER_SOURCE = ` 
   void main() { 
     gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0); 
   }` ;

function main() {
  var canvas = document.getElementById('myCanvas');

  var gl = canvas.getContext('webgl');

  initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE);

  var a_Posit = gl.getAttribLocation(gl.program, 'a_Pos');

  gl.clearColor(0.0, 0.0, 0.0, 1.0);
  gl.clear(gl.COLOR_BUFFER_BIT);

  drawCircle(gl, a_Posit, 0, 0, 0.5);
}

function drawCircle(gl, a_Posit, x, y, radius) {
  var step = 0.01;
  for (var i = x - radius; i <= x + radius; i += step) {
    for (var j = y - radius; j < y + radius; j += step) {
      if ((i - x) * (i - x) + (j - y) * (j - y) <= (radius * radius)) {
        gl.vertexAttrib3f(a_Posit, i, j, 0.0);
        gl.drawArrays(gl.POINTS, 0, 1);
      }
    }
  }
}

