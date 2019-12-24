(function() {
  var PERCENT_MAX = 100;
  var exampleImage = document.querySelector(".example__image--1");
  var exampleToggle = document.querySelector(".example__toggle");
  var exampleScale = document.querySelector(".example__scale");
  var beforeBtn = document.querySelector(".example__status--before");
  var afterBtn = document.querySelector(".example__status--after");

  var scaleWidth = exampleScale.offsetWidth;
  var toggleWidth = exampleToggle.offsetWidth;
  var scaleRightEdge = scaleWidth - toggleWidth;


  var toggleLeft = function() {
    exampleToggle.style.right = "";
    exampleScale.style.position = "relative";
    exampleToggle.style.position = "absolute";
    exampleToggle.style.left = "0";
  };

  var toggleRight = function() {
    exampleToggle.style.left = "";
    exampleScale.style.position = "relative";
    exampleToggle.style.position = "absolute";
    exampleToggle.style.right = "0";
  };

  var onToggleLeftClick = function() {
    exampleImage.style.width = "100%";
    toggleLeft();
  };

  var onToggleRightClick = function() {
    exampleImage.style.width = "0";
    toggleRight();
  };

  beforeBtn.addEventListener("click", onToggleLeftClick);
  afterBtn.addEventListener("click", onToggleRightClick);

  var resizeImage = function(xPin) {
    var togglePositionRel = parseInt(xPin / (scaleWidth - toggleWidth) * PERCENT_MAX);

    exampleToggle.style.left = xPin + "px";
    exampleImage.style.width = 100 - togglePositionRel + '%';
  };

  exampleToggle.addEventListener('mousedown', function(evt) {
    evt.preventDefault();

    exampleToggle.style.position = "absolute";

    var startCoords = {
      x: evt.clientX
    };

    var onMouseMove = function(moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX
      };

      startCoords = {
        x: moveEvt.clientX

      };

      var pinX = exampleToggle.offsetLeft - shift.x;

      if (pinX < 0) {
        pinX = 0
      }

      if (pinX > scaleRightEdge) {
        pinX = scaleRightEdge;
      }

      resizeImage(pinX);
    };

    var onMouseUp = function(upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });


})();
