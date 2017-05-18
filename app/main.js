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
            "type": "TargetSelfEffect"
          },
          {
            "type": "AddPointsEffect",
            "params": {
              "base_impact": 1
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
        card.onPlay(player);
      },
      dealCard: function (target) {
        let card = world.cards.pop();
        target.hand.push(card);
      }
    }
  });
}

main();
