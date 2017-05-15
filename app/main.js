import Vue from "vue";
import World from "./world";

function main() {
  const CONFIG = {
    "players": [{
      "name": "Hillary Clinton",
      "points": 10
    }, {
      "name": "Donald Trump",
      "points": 6
    }],
    "cards": [
      {
        "name": "Pander",
        "desc": "Add 1 political point",
        "type": "action"
      }
    ]
  };

  let world = World.world(CONFIG);

  console.log(world);
  console.log(world.players);
  document.world = world; // For debugging

  let app = new Vue({
    el: "#app",
    data: {
      world: world
    },
    template: `
    <div id="view">
      <h2>Players</h2>
  			<ul>
  			  <li v-for="player in world.players">
  			    <b>{{ player.name }}</b> - {{ player.points }}
  			  </li>
  			</ul>
  			
  			<h2>Cards</h2>
  			<ul>
  				<li v-for="card in world.cards">
  					<b>{{ card.name }}</b> - {{ card.desc }}
  				</li>
  		</ul>
		</div>
    `
  });
}

main();
