<template lang="pug">
.container
  .row
    h1.text-center(style='margin-bottom: 1.0em;') BlueCupcake News
  .row
    .col-md-3
      .media
        .media-left.media-top
          a(href='#')
            img.media-object(style='height: 64px; width: 64px;', src='https://pbs.twimg.com/profile_images/822251886988267520/28GpoRsy_400x400.jpg')
        .media-body
          h4.media-heading The Election Year is Heating Up
      .media
        .media-left.media-top
          a(href='#')
            img.media-object(style='height: 64px; width: 64px;', src='https://pbs.twimg.com/profile_images/822251886988267520/28GpoRsy_400x400.jpg')
        .media-body
          h4.media-heading The Secret to Weight Loss: Eating More
    .col-md-6
      .text-center
        div(style='height: 230px; width: 430px; margin: auto;')
          div(style="height:100%; width:100%;\
          background: url('https://pbs.twimg.com/profile_images/822251886988267520/28GpoRsy_400x400.jpg') center center no-repeat;\
          background-size: cover;\
          ")
        h1 Candidates Announce their Bid for the White House
      p
        | Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent volutpat augue in urna gravida rhoncus. Donec efficitur nulla gravida, efficitur metus sit amet, scelerisque sem. Cras ac euismod dui. Maecenas ut est et risus aliquet tincidunt. Vivamus hendrerit porttitor ligula. Etiam id pharetra ex, eget fermentum dui.
    .col-md-3
      p
        | Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent volutpat augue in urna gravida rhoncus. Donec efficitur nulla gravida, efficitur metus sit amet, scelerisque sem. Cras ac euismod dui. Maecenas ut est et risus aliquet tincidunt. Vivamus hendrerit porttitor ligula. Etiam id pharetra ex, eget fermentum dui. Duis placerat eleifend urna et elementum. Aliquam gravida dignissim nunc, ut placerat velit egestas in. Integer vitae urna nec ante vulputate blandit. Etiam non leo nec velit feugiat consectetur sit amet a tortor. Vestibulum et feugiat erat, ut ultricies nibh. Vestibulum ornare lacus vel risus aliquet, sed ultricies risus sollicitudin. Nullam pretium ultricies justo non malesuada. Donec sed dui iaculis, hendrerit massa ac, vulputate purus. Fusce tincidunt eu nunc quis eleifend.
</template>

<script>
export default {
    name: "NewsView",
    data: function() {
        return {
        };
    }
};
</script>

<style lang="sass" scoped>

</style>