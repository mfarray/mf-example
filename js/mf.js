console.clear();
var canvas = document.createElement('canvas'),
    ctx = canvas.getContext('2d'),
    width = canvas.width = 400,
    halfWidth = width / 2,
    height = canvas.height = window.innerHeight,
    halfHeight = height / 2;

document.body.appendChild(canvas);

var lineCount = 21,
    color = 'white',
    offset = Math.PI * 10.0;

ctx.shadowBlur = 4;
ctx.shadowColor = color;
ctx.fillStyle = color;

function Line(pos){ this.pos = pos; }

Line.prototype = {
  constructor: Line,
  pos: 0,
  width: halfWidth,
  height: 2,
  range: halfHeight * 0.4,
  
  render: function(ctx, delta){
    
    var pos = this.pos;//Math.sin(delta + (this.pos*Math.PI));// * ( delta < Math.PI ? Math.sin(delta * 0.5) : 1);//Math.abs( Math.sin( delta + this.pos) ) ;
    
    var minWidth = (this.width * 2.10)
    var lineWidth = minWidth + (this.width * 0.1 * pos);
    var lineHeight = Math.cos(delta + (pos * offset)) * this.height;
    var x = ( width - minWidth ) * (1 - pos);
    var y = 
      ( Math.sin( delta + (pos * offset) )
      * ( this.range/2 + this.range/2 * ( pos )) )
      + halfHeight;
    
    ctx.globalAlpha = 0.75 + (0.75 * ( 1 - pos));
    ctx.beginPath();
    ctx.rect(x, y, lineWidth, lineHeight);
    ctx.closePath();
    ctx.fill();
  }
}

var lines = [];

for ( var i = 0; i < lineCount; i++) {
  lines.push( new Line( i / lineCount )  ); 
}

var wave = 0;
function render(){
  requestAnimationFrame(render);
  wave += 0.02;
  ctx.clearRect(0, 0, width, height);
  lines.forEach(function(line){ line.render(ctx, wave); });
}

render();