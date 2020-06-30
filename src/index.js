import { CanvasSpace } from "pts";
// import SqueezyRectangle from "./elements/SqueezyRectangle";
// import BlinkingPointer from "./elements/BlinkingPointer";
// import NearestNeighbor from "./elements/NearestNeighbor";
import BallWorld from "./elements/BallWorld";
import "./index.css";

var mainCanvas = document.createElement("canvas");
document.body.appendChild(mainCanvas);

var space = new CanvasSpace(mainCanvas);
space.setup({ bgcolor: "#e2e6ef" });

[BallWorld(space, space.getForm())].map(function addToSpace(element) {
  space.add(element);
});

space.bindMouse().bindTouch().play();
