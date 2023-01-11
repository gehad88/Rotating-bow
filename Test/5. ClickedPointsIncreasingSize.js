
var VSHADER_SOURCE = `
  attribute vec4 a_Pos;
  attribute float a_Siz;

  void main() { 
    gl_Position = a_Pos; 
    gl_PointSize = a_Siz; 
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
  var a_Size = gl.getAttribLocation(gl.program, 'a_Siz');
  canvas.onmousedown = function (ev) { click(ev, gl, canvas, a_Posit,a_Size); };

  gl.clearColor(0.0, 0.0, 0.0, 1.0);

  gl.clear(gl.COLOR_BUFFER_BIT);
}

var g_points = [];

function click(ev, gl, canvas, a_Posit,a_Size) {
  var size=1;
  var x = ev.clientX;
  var y = ev.clientY;
  var rect = ev.target.getBoundingClientRect();

  x = ((x - rect.left) - canvas.width / 2) / (canvas.width / 2);
  y = (canvas.height / 2 - (y - rect.top)) / (canvas.height / 2);

  g_points.push([x, y]);

  gl.clear(gl.COLOR_BUFFER_BIT);

  for (var i = 0; i < g_points.length; i++) {
    var xy = g_points[i];
    gl.vertexAttrib3f(a_Posit, xy[0], xy[1], 0.0);
    gl.vertexAttrib1f(a_Size, size);

    gl.drawArrays(gl.POINTS, 0, 1);
    size+=0.5;
  }
}