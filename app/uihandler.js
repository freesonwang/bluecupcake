import Logging from "./logging";

export default class UIHandler {
  constructor() {
    this.notifiees = [];
  }
  
  onObjClick(obj) {
    Logging.trace(`Something clicked. ${this.notifiees.length} listening...`);
    const fired = [];
    for (let i = 0; i < this.notifiees.length; i++) {
        const notifiee = this.notifiees[i];
        notifiee.notify(obj);
        if (notifiee.onlyFiresOnce()) {
          fired.push(i);
        }
    }
    for (let index of fired) {
      this.notifiees.splice(index, 1);
    }
  }
  
  addNotifiee(notifiee) {
    Logging.trace("Adding notifee");
    this.notifiees.push(notifiee);
  }
  
  removeNotifiee(notifee) {
    Logging.trace("Removing notifiee");
    const index = this.notifiees.indexOf(notifee);
    this.notifiees.splice(index, 1);
  }
  
  static instance() {
    if (UIHandler._instance === undefined) {
      UIHandler._instance = new UIHandler();
    }
    return UIHandler._instance;
  }
}
