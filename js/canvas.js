/**
 * Created by Administrator on 2017/3/1.
 */

(function (){
  /*  function chart(){
   var _canvas = document.getElementsByClassName("canvas")[0];
   var _context = _canvas.getContext("2d");
   _context.font = "40px Arial";
   _context.fillText("1000",10,50);
   }*/
  function Chart(json){
    this.id = json.id;
    this.class = json.class;
    this.element = json.element;
    this.data = json.data;
    this.color = json.color ? json.color : "grey";
  }

  Chart.prototype = {
    background: function (){
      var list = [
        "0","100","200","300",
        "400","500","600","700",
        "800","900","1000","1100","1200"
      ];
      var month = ["0月","1月份","2月份","3月份","4月份","5月份","6月份","7月份",
        "8月份","9月份","10月份","11月份","12月份"];
      var _canvas = this._canvas();
      var _context = _canvas.getContext("2d");
      if (!_context){
        return;
      }
      var _this = this;
      this.width = _canvas.width;
      this.height = _canvas.height;
      var _listLength = list.length;
      var _monthLength = month.length;
      _this._marginY = _this.height*(_listLength-1)/_listLength/_listLength;
      _this._marginX = _this.width*(_monthLength-1)/_monthLength/_monthLength;
      _canvas = null;

      list.map(function(e, key){
        _this.drawText(_context, e, 50, _this.height-(_this._marginY *(key+1)));
      });

      month.map(function(e, key){
        _context.moveTo(_this._marginX * (key+1), _this.height - _this._marginY);
        _context.lineTo(_this._marginX * (key+1), _this.height - _monthLength * _this._marginY);
        _context.lineWidth= 1;
        _context.strokeStyle = "grey";
        _context.stroke();
        _context.beginPath();
        _context.moveTo(_this._marginX, _this.height - (_this._marginY*(key+1)));
        _context.lineTo(_this._marginX * _monthLength, _this.height - (_this._marginY*(key+1)));
        _context.stroke();
        if(key === 0){
          return;
        }
        _this.drawText(_context, e, _this._marginX * (key+1) -14, _this.height-_this._marginY+20);
      });
    },
    line: function(){
      var base = 100;
      var _this = this;
      var _canvas = this._canvas();
      var _context = _canvas.getContext("2d");
      if(!_context){
        return;
      }
      var list = _this.data;
      _context.beginPath();
      _context.moveTo(_this._marginX, _this.height - _this._marginY);
      list.map(function(e, key){
        _context.lineTo(_this._marginX*(key+2), _this.height- _this._marginY*(e/base+1));
      });
      _context.lineWidth= 2;
      _context.strokeStyle = this.color;
      _context.stroke();

    },
    chartDot: function(){
      var _this = this;
      var _dot = _this.data;
      var base = 100;
      _dot.map(function(e, key){
        _this._dot(_this._marginX *(key+2) , _this.height - _this._marginY * (e/base+1))
      })
    },
    _dot: function(x,y){
      var _canvas = this._canvas();
      var _context = _canvas.getContext("2d");
      _context.beginPath();
      _context.arc(x,y,3,0,2*Math.PI);
      _context.fillStyle = this.color;
      _context.fill()
    },
    _canvas: function (){
      if (this.id){
        return document.getElementById(this.id);
      }
      if (this.class){
        return document.getElementsByClassName(this.class)[0];
      }
      if (this.element){
        return this.element;
      }
      console.log("next Elements! class or id");
      return false;
    },
    drawText: function (_context, text, x, y){
      _context.fillStyle = "#123456";
      _context.font = "14px Arial";
      _context.textAlign = "right";
      _context.textBaseline = "middle";
      _context.fillText(text, x, y);
    }
  };
  var bg = new Chart({
    class: "canvas"
  });
  bg.background();
  var list= [
    [100, 300, 400, 500, 600, 700, 100, 200, 400, 500, 200, 300],
    [1000, 1200, 400, 500, 300, 200, 0, 0, 20],
    [1000, 1000, 300, 100, 100, 600]
  ];
  var color= ['red', 'blue', 'green'];
  list.map(function(e,key){
    var _canvas = document.createElement('canvas');
    var _group = document.getElementsByClassName("canvasGroup")[0];
    _canvas.height = 600;
    _canvas.width = 1000;
    _canvas.className = "line";
    bg.class = "";
    bg.data = e;
    bg.element = _canvas;
    bg.color = color[key];
    bg.line();
    bg.chartDot();
    _group.appendChild(_canvas);
  });
  /*var _div = document.getElementsByClassName("canvasGroup")[0];
  _div.addEventListener("mousemove",function(e){
    console.log(e.layerX, e.layerY);
  },true)*/
})();