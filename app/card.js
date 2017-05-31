import jp from "jsonpath";
import Result from "./result";
import Effect from "./effect";
import Logging from "./logging";

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
    
    @Logging.logger().prologue(`Beginning to play '{this.name}'`)
    onPlay(source) {
        let result = new Result(source);
        if (this.effects.length > 0) {
            this.effects[0].onPlay(this, result);    
        }
    }
    
    @Logging.logger().prologue("{effect.constructor.name} has finished")
    onEffectDone (effect, result) {
        const next_effect = this._nextEffect(effect);
        if (next_effect) {
            next_effect.onPlay(this, result);
        }
        else {
            result.target.setResult(result);
        }
    }
    
    @Logging.logger().prologue("Getting the effect after '{current_effect.constructor.name}'")
    _nextEffect(current_effect) {
        const effect_index = this.effects.indexOf(current_effect);
        let next_effect = null;
        if (effect_index + 1 < this.effects.length) {
            next_effect = this.effects[effect_index + 1];
        }
        return next_effect;
    }
    
    @Logging.logger().prologue("Creating cards from spec")
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
