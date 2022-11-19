/**
 * Implement the adapter pattern to the native DOM event methods.
 * So we are able to make references on the events we created,
 * and remove them completely when we don't need them.
 *
 * Source:
 * https://github.com/terrylinooo/sliderm.js/blob/master/src/core/events/event-adapter.js
 */
export default class EventAdapter {
  /**
   * Constructor.
   *
   * @param {EventTarget} target
   */
  constructor(target) {
    this.target = target;
    this.events = {};
  }

  /**
   * Add an event to a HTML element.
   *
   * @param {String} event
   * @param {Function} handler
   */
  on(event, handler) {
    this.events[event] = handler;
    this.target.addEventListener(event, this.events[event]);
  }

  /**
   * Remove an event from a HTML element.
   *
   * @param {String} event
   * @param {Function} handler
   */
  off(event) {
    this.target.removeEventListener(event, this.events[event]);
  }

  /**
   * Dispatch an event on a HTML element.
   *
   * @param {String} event
   */
  emit(event) {
    if (typeof this.events[event] !== 'undefined') {
      this.target.dispatchEvent(new Event(event));
    }
  }

  /**
   * As you see, destory everything.
   */
  destory() {
    const events = Object.keys(this.events);
    for (let i = 0; i < events.length; i += 1) {
      this.off(events[i]);
    }
    delete this.events;
  }

  /**
   * Mock to dispatch an event for current target.
   *
   * @param {String} event
   * @param {Object} dispatchEvent
   */
  mock(event, dispatchEvent) {
    if (typeof this.events[event] !== 'undefined') {
      this.events[event](dispatchEvent);
    }
  }
}
