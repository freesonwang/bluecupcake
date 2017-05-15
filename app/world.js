import Player from "./player";

export default class World {
  constructor() {
    this.players = [];
  }

  static world(spec) {
    let world = new World;
    world.players = Player.players(spec);
    return world;
  }
}