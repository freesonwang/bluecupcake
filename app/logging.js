import StackTrace from "stacktrace-js";
import zipObject from "lodash/zipObject";
import merge from "lodash/merge";
import "string.format";
var getParameterNames = require('get-parameter-names');

export default class Logging {
  static stackLog (stack_frames, log_type, doc, stack_frame_level) {
    const fn_line = stack_frames[stack_frame_level].lineNumber;
    const fn_name = stack_frames[stack_frame_level].functionName;
    const file_name = stack_frames[stack_frame_level].fileName.split("/").pop();
    if (doc === undefined) {
      console.log(`[${log_type}] ${file_name}:${fn_line} - ${fn_name}()`);
    } else {
      console.log(`[${log_type}] ${file_name}:${fn_line} - ${fn_name}() - ${doc}`);
    }
  }
  
  static debug(doc) {
    StackTrace.get().then(function(stack_frames) {
      Logging.stackLog(stack_frames, "DEBUG", doc, 1);
    });
  }
  
  static trace(doc) {
    StackTrace.get().then(function(stack_frames) {
      Logging.stackLog(stack_frames, "TRACE", doc, 1);
    });
  }
  
  static info(doc) {
    StackTrace.get().then(function(stack_frames) {
      Logging.stackLog(stack_frames, "INFO ", doc, 1);
    });
  }

  static prologue(msg) {
    return function(target, key, descriptor) {
      let orgMethod = descriptor.value;
      descriptor.value = function (...arg) {
        var self = this;
        return function() {
          var methodCallback = function() { return orgMethod.apply(self, arg) };
          const args_map = zipObject(getParameterNames(orgMethod), arg);
          const self_map = {"this" : self};
          const combined_args = merge(args_map, self_map);
          const doc = msg.format(combined_args);
          StackTrace.get().then(function(stack_frames) {
            Logging.stackLog(stack_frames, "DOC  ", doc, 2);
          });
          return methodCallback();
        }();
      };
      return descriptor;
    };
  }
}
