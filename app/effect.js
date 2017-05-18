export default class Effect {
    constructor(params) {
        this.params = params;
    }
    static effect(effect_spec) {
        let cls = EffectTypeNames[effect_spec.type];
        return new cls(effect_spec.params);
    }
}

class TargetSelfEffect extends Effect {
    onPlay(result) {
        result.target = result.source;
    }
}

class AddPointsEffect extends Effect {
    onPlay(result) {
        result.base_impact = result.base_impact + this.params.base_impact;
    }
}

const EffectTypeNames = {
    "AddPointsEffect" : AddPointsEffect,
    "TargetSelfEffect" : TargetSelfEffect
}

