import Player from "./player";
import Card from "./card";
import Logging from "./logging";

export default class World {
  constructor() {
    this.players = [];
    this.cards = [];
  }

  static world(spec) {
    Logging.trace("Creating World from world spec");
    const world = new World;
    world.players = Player.players(spec);
    world.cards = Card.cards(spec);
    return world;
  }
}