import jp from "jsonpath"

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
          console.log(count);
          for (let c = 0; c < count; c++) {
            cards.push(card);   
          }
        }
        return cards;
    }
}

//
// Effect
//

class Effect {
    constructor(params) {
        this.params = params;
    }
    static effect(effect_spec) {
        let cls = EffectTypeNames[effect_spec.type];
        return new cls(effect_spec.params);
    }
}

class AddPointsEffect extends Effect {
    onEffect(target) {
        target.points = target.points + this.params.impact;
    }
}

const EffectTypeNames = {
    "AddPointsEffect" : AddPointsEffect
}