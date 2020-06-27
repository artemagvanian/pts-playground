import { CanvasSpace, Num, Rectangle } from "pts";
import "./index.css";

var mainCanvas = document.createElement("canvas");
document.body.appendChild(mainCanvas);

var creativeSpace = new CanvasSpace(mainCanvas);
creativeSpace.setup({ bgcolor: "#555" });

var form = creativeSpace.getForm();

creativeSpace.add(function squeezyRectangle(time) {
  var rect = Rectangle.fromCenter(
    creativeSpace.center, // center of drawing
    creativeSpace.size.$divide(2) // size of drawing
  );
  var poly = Rectangle.corners(rect);
  poly.shear2D(Num.cycle((time % 2000) / 2000) - 0.5, creativeSpace.center);

  form.fillOnly("#123").polygon(poly);
  form.strokeOnly("#fff", 3).rect(rect);
});

creativeSpace.add(function blinkingPointer(time) {
  let radius = Num.cycle((time % 1000) / 1000) * 20;
  form.fill("#09f").point(creativeSpace.pointer, radius, "circle");
});

creativeSpace.bindMouse().bindTouch().play();
