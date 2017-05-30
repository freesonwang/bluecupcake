import StackTrace from "stacktrace-js";
var template = require('es6-template-strings');
var stringformat = require('stringformat');

export default class Logging {
  static stackLog (stack_frames, log_type, doc) {
    var file_name, fn_line, fn_name;
    fn_line = stack_frames[1].lineNumber;
    fn_name = stack_frames[1].functionName;
    file_name = stack_frames[1].fileName.split("/").pop();
    if (doc === undefined) {
      return console.log("[" + log_type + "] " + file_name + ":" + fn_line + " - " + fn_name + "()");
    } else {
      return console.log("[" + log_type + "] " + file_name + ":" + fn_line + " - " + fn_name + "() - " + doc);
    }
  }
  
  static debug(doc) {
    return StackTrace.get().then(function(stack_frames) {
      return Logging.stackLog(stack_frames, "DEBUG", doc);
    });
  }
  
  static trace(doc) {
    return StackTrace.get().then(function(stack_frames) {
      return Logging.stackLog(stack_frames, "TRACE", doc);
    });
  }
  
  static info(doc) {
    return StackTrace.get().then(function(stack_frames) {
      return Logging.stackLog(stack_frames, "INFO ", doc);
    });
  }

  static docstring(msg) {
    return function(target, key, descriptor) {
      let orgMethod = descriptor.value;
      descriptor.value = function (...arg) {
        var self = this;
        return function() {
          var methodCallback = function() { return orgMethod.apply(self, arg) };
          let s1 = template(msg, self);
          let s2 = stringformat(s1, ...arg);
          console.log(s2);
          return methodCallback();
        }();
      };
      return descriptor;
    };
  }
}
