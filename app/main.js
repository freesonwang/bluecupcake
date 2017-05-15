import Vue from "vue";
import random from "lodash/random";
import jp from "jsonpath"
import World from "./world"

function main() {

  const CONFIG = {
    "players": [{
      "name": "Hillary Clinton",
      "points": 10
    }, {
      "name": "Donald Trump",
      "points": 6
    }]
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
      let players_html = this.world.players.map(function(player, index) {
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
