import Logging from "./logging";

export default class UIHandler {
  constructor() {
    this.notifiees = [];
    
  }
  
  onObjClick(obj) {
    Logging.trace("An object ahs been clicked...");    
    for (let notifiee of this.notifiees) {
        if (notifiee.isMeaningfulNotification(obj)) {
            notifiee.notify(obj);
        }
    }
  }
  
  addNotifiee(notifiee) {
    Logging.trace("Adding notifee");
      this.notifiees.push(notifiee);
  }
  
  static instance() {
    if (UIHandler._instance === undefined) {
      UIHandler._instance = new UIHandler();
    }
    return UIHandler._instance;
  }
}
