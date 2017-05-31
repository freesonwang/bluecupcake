import StackTrace from "stacktrace-js";
import zipObject from "lodash/zipObject";
import merge from "lodash/merge";
import "string.format";
var getParameterNames = require('get-parameter-names');

export default class Logging {
  constructor() {
    this.stackinfo = {};
    this.msg = "";
  }
  
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
  
  static trace(doc) {
    StackTrace.get().then(function(stack) {
      Logging.stackLog(stack, "TRACE", doc, 1);
    });
  }
  
  static logger() {
    return new Logging();
  }
  
  prologue(msg) {
    // When the decorator is called, we need to preprocess and 
    // store the stack information.
    this.msg = msg;
    this.stack_promise = StackTrace.get();
    return this._decorator.bind(this);
  }
  
  _decorator(target, key, descriptor) {
      var ctx = this;
      var orgMethod = descriptor.value;
      descriptor.value = function (...arg) {
        var self = this;
        return function() {
          var methodCallback = function() { return orgMethod.apply(self, arg) };
          const args_map = zipObject(getParameterNames(orgMethod), arg);
          const self_map = {"this" : self};
          const combined_args = merge(args_map, self_map);
          const doc = ctx.msg.format(combined_args);
          const log_type = "DOC  ";
          ctx.stack_promise.then(function(stack) {
            const fn_line = stack[1].lineNumber;
            const fn_name = orgMethod.name;
            const file_name = stack[1].fileName.split("/").pop();
            if (doc === undefined || doc == "") {
              console.log(`[${log_type}] ${file_name}:${fn_line} - ${fn_name}()`);
            } else {
              console.log(`[${log_type}] ${file_name}:${fn_line} - ${fn_name}() - ${doc}`);
            }
          });
          return methodCallback();
        }();
      };
      return descriptor;
  }
}
