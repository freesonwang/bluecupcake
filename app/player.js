import jp from "jsonpath";
import Logging from "./logging";

export default class Player {
  constructor() {
    this.name = "";
    this.points = 0;
    this.hand = [];
  }

  setResult(result) {
    Logging.trace(`Setting result. Points impacted by ${result.impact()}`);
    this.points = this.points + result.impact();
  }

  static players(spec) {
    Logging.trace("Creating players from player spec...");
    let players = [];
    let players_spec = jp.query(spec, '$..players')[0];
    for (let player_spec of players_spec) {
      let player = new Player();
      player.name = player_spec.name;
      player.points = player_spec.points;
      players.push(player);
    }
    return players;
  }
}