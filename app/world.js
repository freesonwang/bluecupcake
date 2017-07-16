import Player from "./player";
import Card from "./card";
import Logging from "./logging";

export default class World {
  constructor() {
    this.players = [];
    this.cards = [];
    this.curr_player = null;
  }

  @Logging.logger().prologue("Creating World from world spec")
  static world(spec) {
    const world = new World();
    world.players = Player.players(spec);
    world.cards = Card.cards(spec);
    world.curr_player = world.players[0];
    return world;
  }
}