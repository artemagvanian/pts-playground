import { Num, Rectangle } from "pts";

export default function squeezyRectangle(space) {
  var form = space.getForm();

  return function animate(time) {
    var centeredRectangle = Rectangle.fromCenter(
      space.center,
      space.size.$divide(2)
    );

    var polygon = Rectangle.corners(centeredRectangle);

    var tris = polygon.segments(2, 1, true);
    tris.map((t) => t.push(space.pointer));

    polygon.shear2D(Num.cycle((time % 2000) / 2000) - 0.5, space.center);

    form.fillOnly("#123").polygon(polygon);
    form.strokeOnly("#fff ", 3).polygons(tris);
    form.strokeOnly("#fff", 3).rect(centeredRectangle);
  };
}
