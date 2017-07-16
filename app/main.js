import Vue from "vue";
import World from "./world";
import UIHandler from "./uihandler";
import Logging from "./logging";
import GameView from "./view/game.vue";

function main() {
  Logging.log("Running app's main function...");

  new Vue({
    el: '#gameview',
    render: h => h(GameView)
  });

/* 
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
*/
}

main();
