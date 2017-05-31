import Vue from "vue";
import World from "./world";
import UIHandler from "./uihandler";
import Logging from "./logging";

const CONFIG = {
  "players": [{
    "name": "Brenda King",
    "points": 10
  }, {
    "name": "Jon Gordon",
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
      "desc": "Target a player. Lose 100 points.",
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

function main() {
  Logging.log("Running app's main function...");

  const world = World.world(CONFIG);
  document.world = world; // For debugging

  const app = new Vue({
    el: "#app",
    data: {
      world: world
    },
    methods: {
      onObjClick: function(obj) {
        UIHandler.instance().onObjClick(obj);
      },
      playCard: function (player, card) {
        card.onPlay(player);
      },
      dealCard: function (target) {
        const card = world.cards.pop();
        target.hand.push(card);
      }
    }
  });
}

main();
