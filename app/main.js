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
        "type": "action",
        "count": 10,
        "effects": [
          {
            "type": "AddPointsEffect",
            "params": {
              "impact": 1
            }
          }
        ]
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
    methods: {
      playCard: function (player, card) {
        let target = player; // self target
        for (let effect of card.effects) { // TODO: Move to Card class
          effect.onEffect(target); 
        }
      },
      dealCard: function (target) {
        let card = world.cards.pop();
        target.hand.push(card);
      }
    },
    template: `
    <div id="view">
      <h2>Players</h2>
  			<ul>
  			
  			  <li v-for="player in world.players">
  			    <b>{{ player.name }}</b> - {{ player.points }}
  			    <ul>
  			      <li><a @click="dealCard(player)">Deal me</a></li>
  			      <ul>
  			        <li v-for="card in player.hand">
  			        <b>{{ card.name }}</b> - {{ card.desc }} <a @click="playCard(player, card)">Play card</a>
  			        </li>
  			      </ul>
  			    </ul>
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
