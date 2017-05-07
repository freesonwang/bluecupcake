import Vue from "vue"

function main() {
  var app = new Vue({
    el: '#app',
    data: {
      message: 'Hello Vue!'
    },
    render: function render(h) {
      return (
        <h3 style="color:blue">{ this.message }</h3>
      )
    }
  });
}

main();