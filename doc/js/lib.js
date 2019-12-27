(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = global || self, global.Foa = factory());
}(this, (function () { 'use strict';

  class Fo{
    constructor(name){
      this.name=name;
    }
    hello(){
      console.log(`Hello, ${this.name}`);
    }
  }

  return Fo;

})));
