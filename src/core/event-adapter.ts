import { EventHandler } from '../types';

/**
 * Implement the adapter pattern to the native DOM event methods.
 * So we are able to make references on the events we created,
 * and remove them completely when we don't need them.
 *
 * Source:
 * https://github.com/terrylinooo/sliderm.js/blob/master/src/core/events/event-adapter.js
 */
export default class EventAdapter {
  private target: EventTarget;
  private events: Record<string, EventHandler>;

  /**
   * Constructor.
   */
  constructor(target: EventTarget) {
    this.target = target;
    this.events = {};
  }

  /**
   * Adds an event listener to the target element.
   */
  on(event: string, handler: EventHandler): void {
    this.events[event] = handler;
    this.target.addEventListener(event, this.events[event]);
  }

  /**
   * Removes an event listener from the target element.
   */
  off(event: string): void {
    this.target.removeEventListener(event, this.events[event]);
  }

  /**
   * Dispatches an event on the target element.
   */
  emit(event: string): void {
    if (typeof this.events[event] !== 'undefined') {
      this.target.dispatchEvent(new Event(event));
    }
  }

  /**
   * Destroys all event listeners associated with the target element.
   */
  destroy(): void {
    Object.keys(this.events).forEach(event => {
      this.off(event);
    });
    this.events = {};
  }

  /**
   * Mocks the dispatch of an event for the current target.
   * Mainly used for testing purposes.
   */
  mock(event: string, dispatchEvent: Event): void {
    if (typeof this.events[event] !== 'undefined') {
      this.events[event](dispatchEvent);
    }
  }
}
