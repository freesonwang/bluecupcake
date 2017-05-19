import jp from "jsonpath"
import Result from "./result"
import Effect from "./effect"

export default class Card {
    constructor(params) {
        this.name = "";
        this.desc = "";
        this.type = "";
        this.params = params;
        // Future features...
        // this.duration = 0;
        // this.duration_remaining = 0;
        // this.prep_time = 0;
        // this.prep_time_remaining = 0;
        // this.cost = 0;
        // this.conditions = [];
        this.effects = [];
    }
    
    onPlay(source) {
        let result = new Result(source);
        this.effects[0].onPlay(this, result);
    }
    
    onEffectDone (effect, result) {
        let effect_index = this.effects.indexOf(effect);
        if (effect_index + 1 < this.effects.length) {
            let next_effect = this.effects[effect_index + 1];
            next_effect.onPlay(this, result);
        }
        else {
            console.log("done with effects");
            result.target.setResult(result);
        }
    }
    
    static cards(spec) {
        let cards = [];
        let cards_spec = jp.query(spec, '$..cards')[0];
        for (let card_spec of cards_spec) {
          let card = new Card();
          card.name = card_spec.name;
          card.desc = card_spec.desc;
          card.effects = card_spec.effects.map(
              effect_spec => Effect.effect(effect_spec));
          let count = card_spec.count;
          for (let c = 0; c < count; c++) {
            cards.push(card);   
          }
        }
        return cards;
    }
}