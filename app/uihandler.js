import Logging from "./logging";

export default class UIHandler {
  constructor() {
    this.notifiees = [];
  }
  
  @Logging.prologue("Something clicked. {this.notifiees.length} listening...")
  onObjClick(obj) {
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
  
  @Logging.prologue("Adding notifee")
  addNotifiee(notifiee) {
    this.notifiees.push(notifiee);
  }
  
  @Logging.prologue("Removing notifiee")
  removeNotifiee(notifee) {
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
