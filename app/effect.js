import UIHandler from "./uihandler";
import Logging from "./logging";
import Player from "./player";

export default class Effect {
    constructor(params) {
        this.params = params;
    }
    
    onPlay(card, result) {
        this._beforeOnPlay(card, result);
        this.play(card, result);
        this._afterOnPlay(card, result);
    }
    
    play(card, result) {
        
    }
    
    _beforeOnPlay(card, result) {

    }
    
    _afterOnPlay(card, result) {
        card.onEffectDone(this, result);
    }
    
    static effect(effect_spec) {
        let cls = EffectTypeNames[effect_spec.type];
        let effect =  new cls(effect_spec.params);
        return effect;
    }
}

class TargetSelfEffect extends Effect {
    @Logging.logger().prologue("Setting target to self")
    play(card, result) {
        result.target = result.source;
    }
}

class AddPointsEffect extends Effect {
    @Logging.logger().prologue("{card.name} adding {this.params.base_impact} damage")
    play(card, result) {
        result.base_impact = result.base_impact + this.params.base_impact;
    }
}

class TargetPlayerEffect extends Effect {
    @Logging.logger().prologue("Begin to look for a target")
    onPlay(card, result) {
        this._beforeOnPlay(card, result);
        alert("You need to pick a target"); // TODO: Take this out
        UIHandler.instance().addNotifiee({
            onlyFiresOnce: () => true,
            notify: (obj) => {
                if (obj instanceof Player) {
                    result.target = obj;
                    this._afterOnPlay(card, result);
                }
            },
        });
    }
}

class PlayCardEffect extends Effect {
    onPlay(card, result) {
        
    }
}

const EffectTypeNames = {
    "AddPointsEffect" : AddPointsEffect,
    "TargetSelfEffect" : TargetSelfEffect,
    "TargetPlayerEffect" : TargetPlayerEffect,
    "PlayCardEffect" : PlayCardEffect
};

