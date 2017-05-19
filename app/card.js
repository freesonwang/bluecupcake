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
    
    onPlay(source) {
        Logging.trace(`Beginning to play ${this.name}`);
        let result = new Result(source);
        if (this.effects.length > 0) {
            Logging.trace(`Beginning effect ${this.effects[0].constructor.name}`);
            this.effects[0].onPlay(this, result);    
        }
    }
    
    onEffectDone (effect, result) {
        Logging.trace(`${effect.constructor.name} has finished`);
        const next_effect = this._nextEffect(effect);
        if (next_effect) {
            Logging.trace(`Starting next effect ${next_effect.constructor.name}`);
            next_effect.onPlay(this, result);
        }
        else {
            Logging.trace(`All effects have finished. Setting result`);
            result.target.setResult(result);
        }
    }
    
    _nextEffect(current_effect) {
        Logging.trace(`Getting the effect after '${current_effect.constructor.name}'`);
        const effect_index = this.effects.indexOf(current_effect);
        let next_effect = null;
        if (effect_index + 1 < this.effects.length) {
            next_effect = this.effects[effect_index + 1];
        }
        return next_effect;
    }
    
    static cards(spec) {
        Logging.trace(`Creating cards from spec`);
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
