class EventEmitter {
    constructor() {
      this.events = {};
    }
  
    on(event, listener) {
      if (!this.events[event]) {
        this.events[event] = [];
      }
      this.events[event].push(listener);
    }
  
    addEventListener(event, listener) {
      this.on(event, listener);
    }
  
    off(event, listener) {
      if (this.events[event]) {
        this.events[event] = this.events[event].filter((fn) => fn !== listener);
      }
    }
  
    removeEventListener(event, listener) {
      this.off(event, listener);
    }
  
    once(event, listener) {
      const onceHandler = (...args) => {
        listener(...args);
        this.off(event, onceHandler);
      };
      this.on(event, onceHandler);
    }
  
    emit(event, ...args) {
      if (this.events[event]) {
        for (const listener of this.events[event]) {
          listener(...args);
        }
      }
    }
  
    rawListeners(event) {
      return this.events[event] || [];
    }
  
    listenerCount(event) {
      return this.rawListeners(event).length;
    }
  }

  module.exports = EventEmitter; 