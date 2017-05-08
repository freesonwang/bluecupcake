import Vue from "vue";
import random from "lodash/random";
import jp from "jsonpath"

class World {
  constructor () {
    this.players = [];
  }
  
  static world (spec) {
    let world = new World;
    world.players = Player.players(spec);
    return world;
  }
}

class Player {
  constructor () {
    this.name = "";
    this.points = random(10);
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

function main() {
  
  const CONFIG = {
    "players": [
      {
        "name": "Hillary Clinton",
        "points": 10
      },
      {
        "name": "Donald Trump",
        "points": 6
      }
    ]
  }
  
  let world = World.world(CONFIG);

  console.log(world);
  console.log(world.players);
  document.world = world; // For debugging
  
  let app = new Vue({
    el: "#app",
    data: {
      world: world
    },
    render: function render(h) {
      let players_html = this.world.players.map (function (player, index) {
        return <li>{player.name} - {player.points}</li>;
      });
      
      return (
        <ul>
        {
        this.world.players.map (player => 
            <li><strong>{player.name}</strong> - {player.points}</li>
          )
        }
        </ul>
      );
    }
  });
}

main();
