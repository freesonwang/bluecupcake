<template lang="pug">
    .container
        NewsView
        .container(style='background:yellow')
            h1 Hello. This is using Pug
            h2 Your greeting is {{ greeting }}
            h3 The number of players is {{ world.players.length }}
</template>

<script>
import World from "../world";
import Config from "../config";
import NewsView from "./news.vue"

export default {
    name: "GameView",
    components: {
        NewsView
    },
    data: function() {
        const world = World.world(Config);
        return {
            greeting: "Aroha!",
            world: World.world(Config)
        };
    }
};
</script>

<style lang="sass" scoped>
$primary-color: purple;
body, h1, h2 {
  color: $primary-color;
}
</style>