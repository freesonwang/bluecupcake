export default class UIHandler {
  constructor() {
    this.notifiees = [];
    
  }
  
  onObjClick(obj) {
    console.log("onObjClick - Clicked object!");
    console.log(obj);
    console.log("going to notify..." + this.notifiees.length);
    
    
    for (let notifiee of this.notifiees) {
        if (notifiee.isMeaningfulNotification(obj)) {
            notifiee.notify(obj);
        }
    }
  }
  
  addNotifiee(notifiee) {
      this.notifiees.push(notifiee);
  }
  
  static instance() {
    console.log("calling instance");
    if (UIHandler._instance === undefined) {
      console.log("creatinging instance");
      UIHandler._instance = new UIHandler();
    }
    console.log("returning instance");
    console.log(UIHandler._instance);
    return UIHandler._instance;
  }
}
