import StackTrace from "stacktrace-js";
import zipObject from "lodash/zipObject";
import merge from "lodash/merge";
import "string.format";
import align from "string-align";
var getParameterNames = require('get-parameter-names');

export default class Logging {
  constructor() {
    this.stackinfo = {};
    this.msg = "";
  }
  
  static logline(doc, log_type, stack, fn_name) {
    const fn_line = stack[1].lineNumber;
    const file_name = stack[1].fileName.split("/").pop();
    const origin = align(`${file_name}:${fn_line} - ${fn_name}()`, 25, "left");
    if (doc === undefined || doc == "") {
      console.log(`[${log_type}] ${origin}`);
    } else {
      console.log(`[${log_type}] ${origin} ${doc}`);
    }
  }
  
  static log(doc) {
    StackTrace.get().then(function(stack) {
      Logging.logline(doc, "LOG  ", stack, stack[1].functionName);
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
          ctx.stack_promise.then(function(stack) {
            Logging.logline(doc, "TRACE", stack, orgMethod.name);
          });
          return methodCallback();
        }();
      };
      return descriptor;
  }
}
