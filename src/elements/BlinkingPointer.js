import { Num } from "pts";
import { curry } from "ramda";

export default curry(function BlinkingPointer(space, form, time) {
  let radius = Num.cycle((time % 1000) / 1000) * 20;
  form.fill("#09f").point(space.pointer, radius, "circle");
});
