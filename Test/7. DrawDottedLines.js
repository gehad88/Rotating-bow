
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

  drawVerticalLine(gl, a_Posit, 0, 0, 1);
  drawHorizontalLine(gl, a_Posit, 0, 0, -1);
}

function drawVerticalLine(gl, a_Posit, x, startY, endY) {
  step = Math.abs((endY - startY) / 10);
  if (endY > startY) {
    for (var y = startY; y <= endY; y += step) {
      gl.vertexAttrib3f(a_Posit, x, y, 0.0);
      gl.drawArrays(gl.POINTS, 0, 1);
    }
  }
  else {
    for (var y = startY; y >= endY; y -= step) {
      gl.vertexAttrib3f(a_Posit, x, y, 0.0);
      gl.drawArrays(gl.POINTS, 0, 1);
    }
  }
}

function drawHorizontalLine(gl, a_Posit, startX, y, endX) {
  step = Math.abs((endX - startX) / 10);
  if (endX > startX) {
    for (var x = startX; x <= endX; x += step) {

      gl.vertexAttrib3f(a_Posit, x, y, 0.0);
      gl.drawArrays(gl.POINTS, 0, 1);
    }
  }
  else {
    for (var x = startX; x >= endX; x -= step) {

      gl.vertexAttrib3f(a_Posit, x, y, 0.0);
      gl.drawArrays(gl.POINTS, 0, 1);
    }
  }
}