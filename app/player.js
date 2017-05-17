import jp from "jsonpath"

export default class Player {
  constructor() {
    this.name = "";
    this.points = 0;
    this.hand = [];
  }

  static players(spec) {
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