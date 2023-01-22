(function () {

  var width, height, largeHeader, canvas, ctx, points, target, animateHeader = true;

  // Main
  initHeader();
  initAnimation();
  addListeners();

  function initHeader() {
    width = window.innerWidth;
    height = window.innerHeight;
    target = { x: width / 2, y: height / 2 };

    largeHeader = document.getElementById('large-header');
    largeHeader.style.height = height + 'px';

    canvas = document.getElementById('demo-canvas');
    canvas.width = width;
    canvas.height = height;
    ctx = canvas.getContext('2d');

    // create points
    points = [];
    for (var x = 0; x < width; x = x + width / 20) {
      for (var y = 0; y < height; y = y + height / 20) {
        var px = x + Math.random() * width / 20;
        var py = y + Math.random() * height / 20;
        var p = { x: px, originX: px, y: py, originY: py };
        points.push(p);
      }
    }

    // for each point find the 5 closest points
    for (var i = 0; i < points.length; i++) {
      var closest = [];
      var p1 = points[i];
      for (var j = 0; j < points.length; j++) {
        var p2 = points[j]
        if (!(p1 == p2)) {
          var placed = false;
          for (var k = 0; k < 5; k++) {
            if (!placed) {
              if (closest[k] == undefined) {
                closest[k] = p2;
                placed = true;
              }
            }
          }

          for (var k = 0; k < 5; k++) {
            if (!placed) {
              if (getDistance(p1, p2) < getDistance(p1, closest[k])) {
                closest[k] = p2;
                placed = true;
              }
            }
          }
        }
      }
      p1.closest = closest;
    }

    // assign a circle to each point
    for (var i in points) {
      var c = new Circle(points[i], 2 + Math.random() * 2, 'rgba(255,255,255,0.3)');
      points[i].circle = c;
    }
  }
  // Event handling
  function addListeners() {
    if (!('ontouchstart' in window)) {
      window.addEventListener('mousemove', mouseMove);
    }
    window.addEventListener('scroll', scrollCheck);
    window.addEventListener('resize', resize);
  }

  function mouseMove(e) {
    // var posx = posy = 0;
    // if (e.pageX || e.pageY) {
    //   posx = e.pageX;
    //   posy = e.pageY;
    // }
    // else if (e.clientX || e.clientY) {
    //   posx = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
    //   posy = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
    // }
    // target.x = posx;
    // target.y = posy;
  }

  function scrollCheck() {
    if (document.body.scrollTop > height) animateHeader = false;
    else animateHeader = true;
  }

  function resize() {
    width = window.innerWidth;
    height = window.innerHeight;
    largeHeader.style.height = height + 'px';
    canvas.width = width;
    canvas.height = height;
  }

  // animation
  function initAnimation() {
    animate();
    for (var i in points) {
      shiftPoint(points[i]);
    }
  }

  function animate() {
    if (animateHeader) {
      ctx.clearRect(0, 0, width, height);
      for (var i in points) {
        // detect points in range
        // if (Math.abs(getDistance(target, points[i])) < 2000) {
        //   points[i].active = 0.4;
        //   points[i].circle.active = 0.006;
        // } else 
        if (Math.abs(getDistance(target, points[i])) < 4000) {
          if(window.innerWidth>=1600){
            points[i].active = 0.4;
            points[i].circle.active = 0.9;
          }
          else{
            points[i].active = 0.3;
            points[i].circle.active = 0.6;
          }
        } else if (Math.abs(getDistance(target, points[i])) < 20000) {
          if(window.innerWidth>=1600){
            points[i].active = 0.2;
            points[i].circle.active = 0.9;
          }else{
            points[i].active = 0.1;
            points[i].circle.active = 0.3;
          }
        } else if (Math.abs(getDistance(target, points[i])) < 40000) {
          if (window.innerWidth >= 1600) {
            points[i].active = 0.09;
            points[i].circle.active = 0.1;
          }
          else {
            points[i].active = 0.02;
            points[i].circle.active = 0.1;
          }
        } else if (Math.abs(getDistance(target, points[i])) < 80000) {
          if (window.innerWidth >= 1600) {
            points[i].active = 0.1;
            points[i].circle.active = 1;
          }
        } else {
          points[i].active = 0;
          points[i].circle.active = 0;
        }

        drawLines(points[i]);
        points[i].circle.draw();
      }
    }
    requestAnimationFrame(animate);
  }

  function shiftPoint(p) {
    TweenLite.to(p, 1 + 1 * Math.random(), {
      x: p.originX - 50 + Math.random() * 100,
      y: p.originY - 50 + Math.random() * 100, ease: Circ.easeInOut,
      onComplete: function () {
        shiftPoint(p);
      }
    });
  }

  // Canvas manipulation
  function drawLines(p) {
    if (!p.active) return;
    for (var i in p.closest) {
      ctx.beginPath();
      ctx.moveTo(p.x, p.y);
      ctx.lineTo(p.closest[i].x, p.closest[i].y);
      ctx.strokeStyle = 'rgba(216,243,220,' + p.active + ')';
      //ctx.strokeStyle = 'rgba(149,213,178,'+ p.active+')';
      //ctx.strokeStyle = 'rgba(156,217,249,'+ p.active+')';
      ctx.stroke();
    }
  }

  function Circle(pos, rad, color) {
    var _this = this;

    // constructor
    (function () {
      _this.pos = pos || null;
      _this.radius = rad || null;
      _this.color = color || null;
    })();

    this.draw = function () {
      if (!_this.active) return;
      ctx.beginPath();
      ctx.arc(_this.pos.x, _this.pos.y, _this.radius, 0, 2 * Math.PI, false);
      ctx.fillStyle = 'rgba(216,243,220,' + _this.active + ')';
      //ctx.fillStyle = 'rgba(149,213,178,'+ _this.active+')';
      //ctx.fillStyle = 'rgba(156,217,249,'+ _this.active+')';
      ctx.fill();
    };
  }

  // Util
  function getDistance(p1, p2) {
    return Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2);
  }

})();






(function ($) {
  // animated hex background
  $(document).ready(function () {
    $('.animated-background').each(function (index) {
      var cnv = $("<canvas></canvas>").attr("id", "can" + index);

      var colorToUse = $(this).attr('data-color');
      if (colorToUse === 'red') {
        // colorRange = ['rgba(206, 23, 41, 0)', 'rgba(193, 23, 43, 0)'];
        // strokeColor = 'rgba(206, 23, 41, 1)';
        colorRange = ['rgba(8, 28, 21, 0)', 'rgba(0, 0, 0, 0)'];
        strokeColor = 'rgba(216, 243, 220, 1)';
        //strokeColor = 'rgba(64, 145, 108, 1)';
      } else {
        // colorRange = ['rgba(245, 245, 245, alp)', 'rgba(229, 229, 229, alp)'];
        // strokeColor = 'rgba(245,245,245, 0.5)';
        // colorRange = ['rgba(116, 198, 157, alp)', 'rgba(0, 0, 0, alp)'];
        colorRange = ['rgba(8, 28, 21, alp)', 'rgba(0, 0, 0, alp)'];
        strokeColor = 'rgba(216, 243, 220, 1)';
        //strokeColor = 'rgba(64,145,108, 1)';
      }

      $(this).prepend(cnv);

      var can = document.getElementById("can" + index);
      var w = can.width = $(this).width(),
        h = can.height = $(this).height(),
        sum = w + h,
        ctx = can.getContext('2d'),

        opts = {
          side: 56,
          picksParTick: 5, //originally 5
          baseTime: 100,
          // addedTime: 500000,
          addedTime: 499990,
          colors: colorRange,
          addedAlpha: 1,
          strokeColor: strokeColor,
          hueSpeed: 1000,
          repaintAlpha: 1
        },

        difX = Math.sqrt(3) * opts.side / 2,
        difY = opts.side * 3 / 2,
        rad = Math.PI / 6,
        cos = Math.cos(rad) * opts.side,
        sin = Math.sin(rad) * opts.side,

        hexs = [],
        tick = 0;

      function loop() {
        window.requestAnimationFrame(loop);

        tick += opts.hueSpeed;
        ctx.shadowBlur = 0;

        var backColor;
        if (colorToUse === 'green') {
          backColor = 'rgba(0, 0, 0, 0.9)';
          //backColor = 'rgba(232, 28, 47, 0.9)';
        }
        else {
          backColor = 'rgba(0, 0, 0, 0.5)';
          //backColor = 'rgba(225, 225, 225, 0.5)';
        }
        ctx.fillStyle = backColor.replace('alp', opts.repaintAlpha);
        ctx.fillRect(0, 0, w, h);

        for (var i = 0; i < opts.picksParTick; ++i) {
          hexs[(Math.random() * hexs.length) | 0].pick();
        }

        hexs.map(function (hex) {
          hex.step();
        });
      }

      function Hex(x, y) {

        this.x = x;
        this.y = y;
        this.sum = this.x + this.y;
        // change between false and true to animate from left to right, or all at once
        this.picked = false;
        this.time = 0;
        this.targetTime = 0;
        this.xs = [this.x + cos, this.x, this.x - cos, this.x - cos, this.x, this.x + cos];
        this.ys = [this.y - sin, this.y - opts.side, this.y - sin, this.y + sin, this.y + opts.side, this.y + sin];
      }
      Hex.prototype.pick = function () {
        this.color = opts.colors[(Math.random() * opts.colors.length) | 0];
        this.picked = true;
        this.time = this.time || 0;
        this.targetTime = this.targetTime || (opts.baseTime + opts.addedTime * Math.random()) | 0;
      }
      Hex.prototype.step = function () {

        var prop = this.time / this.targetTime;

        ctx.beginPath();
        ctx.moveTo(this.xs[0], this.ys[0]);
        for (var i = 1; i < this.xs.length; ++i)
          ctx.lineTo(this.xs[i], this.ys[i]);
        ctx.lineTo(this.xs[0], this.ys[0]);

        if (this.picked) {

          ++this.time;

          if (this.time >= this.targetTime) {

            this.time = 0;
            this.targetTime = 0;
            this.picked = false;
          }

          ctx.fillStyle = ctx.shadowColor = this.color.replace('alp', Math.sin(prop * Math.PI));
          ctx.fill();
        } else {

          ctx.strokeStyle = ctx.shadowColor = opts.strokeColor;
          ctx.stroke();
        }
      }

      for (var x = 0; x < w; x += difX * 2) {
        var i = 0;
        for (var y = 0; y < h; y += difY) {
          ++i;
          hexs.push(new Hex(x + difX * (i % 2), y));
        }
      }

      loop();

      window.addEventListener('resize', function () {

        w = can.width = window.innerWidth;
        h = can.height = window.innerHeight;
        sum = w + h;

        if (can.width < window.innerWidth) {
          can.alpha = 0.5;
          can.opacity = 0.5;
        }

        hexs.length = 0;
        for (var x = 0; x < w; x += difX * 2) {
          var i = 0;
          for (var y = 0; y < h; y += difY) {
            ++i;
            hexs.push(new Hex(x + difX * (i % 2), y));

          }
        }
      });
    });
  });
})(jQuery);
