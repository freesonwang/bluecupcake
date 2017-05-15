import Player from "./player";
import Card from "./card"

export default class World {
  constructor() {
    this.players = [];
    this.cards = [];
  }

  static world(spec) {
    let world = new World;
    world.players = Player.players(spec);
    world.cards = Card.cards(spec);
    return world;
  }
}