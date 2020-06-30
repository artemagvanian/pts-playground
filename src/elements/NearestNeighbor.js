import { Create } from "pts";

export default function NearestNeighbor(space, form) {
  var pts;
  return function animate() {
    if (!pts) pts = Create.distributeRandom(space.innerBound, 100);

    var t = space.pointer;
    pts.sort(
      (a, b) => a.$subtract(t).magnitudeSq() - b.$subtract(t).magnitudeSq()
    );

    form.fillOnly("#123").points(pts, 2, "circle");
    form.fill("#f05").point(pts[0], 10, "circle");
    form.strokeOnly("#f05", 2).line([pts[0], space.pointer]);
  };
}
