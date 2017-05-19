import UIHandler from "./uihandler"

export default class Effect {
    constructor(params) {
        this.params = params;
        this.card = null;
        this.result = null;
    }
    
    onPlay(card, result) {
        this.result = result;
        this.card = card;
    }
    
    static effect(effect_spec) {
        let cls = EffectTypeNames[effect_spec.type];
        let effect =  new cls(effect_spec.params);
        return effect;
    }
}

class TargetSelfEffect extends Effect {
    onPlay(card, result) {
        super.onPlay(card, result);
        result.target = result.source;
        this.card.onEffectDone(this, this.result);
    }
}

class AddPointsEffect extends Effect {
    onPlay(card, result) {
        super.onPlay(card, result);
        result.base_impact = result.base_impact + this.params.base_impact;
        this.card.onEffectDone(this, this.result);
    }
}

class TargetPlayerEffect extends Effect {
    onPlay(card, result) {
        super.onPlay(card, result);
        alert("You need to pick a target");
        let inst = UIHandler.instance()
        console.log(inst);
        inst.addNotifiee(this); // this notifee stuff should be in a class
    }
    
    isMeaningfulNotification(obj) {
        console.log("calling meaningful");
        return obj.constructor.name == "Player";
    }
    
    notify(obj) {
        this.result.target = obj;
        console.log("notify: target is set to " + this.result.target.name);
        this.card.onEffectDone(this, this.result); // continue execution
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
}

