import Logging from "./logging";

export default class Result {
    constructor(source) {
        this.source = source;
        this.target = null;
        this.base_impact = 0;
        this.impact_multiplier = 1;
    }
    
    impact() {
        Logging.trace("Getting total impact...");
        return this.base_impact * this.impact_multiplier;
    }
}