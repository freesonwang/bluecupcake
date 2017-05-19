import Vue from "vue";
import World from "./world";
import UIHandler from "./uihandler"

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
      },
      {
        "name": "Had an Affair",
        "desc": "Scandal. Costs you 3 political points.",
        "type": "scandal",
        "count": 5,
        "effects": [
          {
            "type": "TargetSelfEffect"
          },
          {
            "type": "AddPointsEffect",
            "params": {
              "base_impact": -3
            }
          }
        ]
      },
      {
        "name": "Hack National Committee Headquarters",
        "desc": "Target a player. Force player to reveal a scandal",
        "type": "offense",
        "count": 3,
        "effects": [
          {
            "type": "TargetPlayerEffect"
          },
          {
            "type": "AddPointsEffect",
            "params": {
              "base_impact": -100
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
      onObjClick: function(obj) {
        console.log(obj);
        UIHandler.instance().onObjClick(obj);
      },
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
