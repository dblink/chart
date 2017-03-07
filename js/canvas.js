/**
 * Created by Administrator on 2017/3/1.
 */

(function (){
  function Chart(json){
    this.id = json.id;
    this.class = json.class;
    this.element = json.element;
    this.data = json.data;
    this.color = json.color ? json.color : "grey";
    this.saveContext = this._canvas().getContext('2d');
    this._pathDot = [];
    this.base = json.base ? json.base : 100;
  }

  Chart.prototype = {
    generateLineCanvas: function (){
      var _canvas = document.createElement('canvas');
      _canvas.height = this._canvas().height;
      _canvas.width = this._canvas().width;
      _canvas.className = this.className;
      this.element = _canvas;
      this.class = "";
      return _canvas;
    },

    background: function (){
      var list = [
        "0", "100", "200", "300",
        "400", "500", "600", "700",
        "800", "900", "1000", "1100", "1200"
      ];
      var month = ["0月", "1月份", "2月份", "3月份", "4月份", "5月份", "6月份", "7月份",
        "8月份", "9月份", "10月份", "11月份", "12月份"];
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
      _this._marginY = _this.height * (_listLength - 1) / _listLength / _listLength;
      _this._marginX = _this.width * (_monthLength - 1) / _monthLength / _monthLength;
      _canvas = null;

      list.map(function (e, key){
        _this.drawText(_context, e, 50, _this.height - (_this._marginY * (key + 1)));
      });

      month.map(function (e, key){
        _context.moveTo(_this._marginX * (key + 1), _this.height - _this._marginY);
        _context.lineTo(_this._marginX * (key + 1), _this.height - _monthLength * _this._marginY);
        _context.lineWidth = 1;
        _context.strokeStyle = "grey";
        _context.stroke();
        _context.beginPath();
        _context.moveTo(_this._marginX, _this.height - (_this._marginY * (key + 1)));
        _context.lineTo(_this._marginX * _monthLength, _this.height - (_this._marginY * (key + 1)));
        _context.stroke();
        if (key === 0){
          return;
        }
        _this.drawText(_context, e, _this._marginX * (key + 1) - 14, _this.height - _this._marginY + 20);
      });
    },

    line: function (){
      var base = 100;
      var _this = this;
      var _canvas = this._canvas();
      var _context = _canvas.getContext("2d");
      if (!_context){
        return;
      }
      var list = _this.data;
      _context.beginPath();

      _context.moveTo(_this._marginX, _this.height - _this._marginY);

      list.map(function (e, key){
        _context.lineTo(_this._marginX * (key + 2), _this.height - _this._marginY * (e / base + 1));
      });
      _context.lineWidth = 2;
      _context.strokeStyle = this.color;
      _context.stroke();
    },

    isPath: function (x, y){
      var _this = this;
      var json = {
        inPath: false,
        position: -1
      };
      var _context = _this.saveContext;
      if (_context.isPointInPath(x, y)){
        json.inPath = true;
        json.position = (x / _this._marginX).toFixed(0);
      }
      return json;
    },

    clear: function (){
      var _context = this._canvas().getContext("2d");
      _context.clearRect(0, 0, this.width, this.height);
    },

    chartDot: function (){
      var _this = this;
      var _dot = _this.data;
      var base = 100;
      var _context = this.dotContext = this._canvas().getContext("2d");
      _context.beginPath();
      _dot.map(function (e, key){
        _this._drawDot(_this._marginX * (key + 2), _this.height - _this._marginY * (e / base + 1));
        _this._pathDot.push({x: _this._marginX * (key + 2), y: _this.height - _this._marginY * (e / base + 1)});
      });
      _context.fillStyle = "#fff";
      _context.fill();
    },

    drawText: function (_context, text, x, y){
      _context.fillStyle = "#123456";
      _context.font = "14px Arial";
      _context.textAlign = "right";
      _context.textBaseline = "middle";
      _context.fillText(text, x, y);
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
      console.log("need Elements! class or id");
      return false;
    },

    _drawDot: function (x, y, r){
      var _context = this.dotContext;
      r = r ? r : 5;
      this.saveContext.moveTo(x, y);
      this.saveContext.arc(x, y, r, 0, 2 * Math.PI);
      _context.moveTo(x, y);
      _context.arc(x, y, r, 0, 2 * Math.PI);
    },

    drawDot: function (x, y, r){
      var _context = this._canvas().getContext("2d");
      _context.beginPath();
      _context.moveTo(x, y);
      _context.arc(x, y, r, 0, 2 * Math.PI);
      _context.fillStyle = "#ededed";
      _context.fill();
    },

    dataSum: function (x, y, data){
      var _div = document.getElementsByClassName("dataList")[0];
      if(x+ 110 + bg._marginX > bg.width ){
        _div.style.right = (bg.width- x + 10) + "px";
        _div.style.left = "auto";
      }else{
        _div.style.left = (x+10)+"px";
        _div.style.right = "auto";
      }
      if(y+ 110 + bg._marginY > bg.height){
        _div.style.bottom =  (bg.height- y + 10) + "px";
        _div.style.top = "auto";
      }else{
        _div.style.bottom =  "auto";
        _div.style.top = (y+10)+"px";
      }

      _div.style.display = "block";
      _div.innerHTML = "";
      var _p= "";
      data.map(function (line, key){
        _p += "<p>xxx</p><p>总金额</p><p>"+ line.money +"</p>";
      });
      _div.innerHTML = _p;
    },
    hideData:function(){
      var _div = document.getElementsByClassName("dataList")[0];
      _div.style.display = "none";
    }
  };

  var bg = new Chart({
    class: "canvas"
  });
  bg.background();
  /*var list=[
   [100, 300, 400, 500, 600, 700, 100, 200, 400, 500, 200, 300]
   ,[700, 100, 200, 400, 500, 200, 300,100, 300, 400, 500, 600, 700, 100]
   ,[100, 300, 400, 500, 600, 700, 100,100, 300, 400, 500, 600, 700, 100]
   ,[100, 300, 400, 300, 400, 1000, 100, 200, 400, 500, 200, 100]
   ,[700, 100, 200, 400,400, 500,  300,100, 300, 400, 500, 600, 700, 100]
   ,[100, 300, 400, 500, 600, 700, 100,100, 300, 400, 500, 600, 700, 100]
   ,[100, 300, 400, 500, 600, 700, 100, 200, 400, 500, 200, 300]
   ];*/
  var list = [
    [50, 300, 400, 500, 600, 700, 100, 200, 400, 500, 200, 300]
    , [700, 100, 200, 400, 600, 200, 300, 100, 300, 400, 500, 600]
    , [500, 250, 100, 401, 600, 200, 300, 100, 300, 400, 500, 600]
  ];
  var color = ['red', 'blue', 'green', "grey", "yellow", "#12345a", "#123", "#cdcdcd"];
  var _canvas;
  var _group = document.getElementsByClassName("canvasGroup")[0];
  bg.className = "line";
  list.map(function (list, key){
    bg.color = color[key];
    bg.data = list;
    _canvas = bg.generateLineCanvas();
    bg.line();
    bg.chartDot();
    _group.appendChild(_canvas);
  });

  _canvas = bg.generateLineCanvas();
  _group.appendChild(_canvas);

  var last = {x: 0, y: 0};
  _canvas.addEventListener("mousemove", function (e){
    var _json = bg.isPath(e.layerX, e.layerY);
    if (_json.inPath){
      this.style.cursor = "pointer";
      if (Math.abs(e.layerX - last.x) < 10 && Math.abs(e.layerY - last.y) < 10){
        return;
      }
      last.x = e.layerX;
      last.y = e.layerY;
      var isPoint = [];
      list.map(function (list, key){
        var _nowLayer = (bg.height - e.layerY - bg._marginY) / bg._marginY;
        var _point = list[_json.position - 2] / bg.base;
        var _diff = Math.abs(_nowLayer - _point);
        _nowLayer = _point = null;
        if (_diff < .3){
          isPoint.push({key: key, money: list[_json.position - 2]})
        }
        _diff = null;
      });
      bg.drawDot(_json.position * bg._marginX, bg.height - (isPoint[0].money / bg.base + 1) * bg._marginY, 4);
      bg.dataSum(_json.position * bg._marginX, bg.height - (isPoint[0].money / bg.base + 1) * bg._marginY, isPoint);
    }else{
      last = {x: 0, y: 0};
      bg.clear();
      bg.hideData();
      this.style.cursor = "auto"
    }
  });
})();