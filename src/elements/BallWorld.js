import { World, Body, Polygon, Particle, Pt } from "pts";

export default function BallWorld(space, form) {
  var world;
  var parameters = {
    friction: 0.99,
    gravity: new Pt(0, 500),
  };
  return {
    start() {
      world = new World(
        space.innerBound,
        parameters.friction,
        parameters.gravity
      );

      var unit = (space.size.x + space.size.y) / 150;

      // Create bodies and particles
      var hexagon = Body.fromGroup(
        Polygon.fromCenter(space.center.add(100, -100), unit * 10, 6),
        0.1
      );
      var square = Body.fromGroup(
        Polygon.fromCenter(space.center.subtract(100, 50), unit * 8, 4),
        1
      );
      var triangle = Body.fromGroup(
        Polygon.fromCenter(space.center, unit * 6, 3)
      );
      var p1 = new Particle(new Pt(space.center.x, 100)).size(unit * 4);
      var p2 = new Particle(new Pt(space.center.x, 100)).size(unit * 2);

      // add to world
      world.add(hexagon).add(square).add(triangle, "triangle"); // to reference it later
      world.add(p1).add(p2);

      // hit them with impulse
      p1.hit(200, -20);
      p2.hit(100, -50);
      hexagon[0].hit(120, -40);
      square[0].hit(-300, -20);

      // lock triangle's first vertice so we can control it by pointer
      triangle[0].lock = true;
    },
    animate(_time, frameTime) {
      world.drawParticles((point) =>
        form.fillOnly("#09f").point(point, point.radius, "circle")
      );

      world.drawBodies((body, index) => {
        form.fillOnly(["#0c9", "#f03", "#fe6"][index % 3]).polygon(body);
        form.strokeOnly("rgba(0,0,0,0.1");
      });

      world.update(frameTime);
    },
    action(_type, px, py) {
      world.body("triangle")[0].position = new Pt(px, py);
    },
    resize() {
      if (world) world.bound = space.innerBound;
    },
  };
}
