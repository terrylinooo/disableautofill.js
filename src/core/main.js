/* eslint-disable no-console */
import config from './config';
import listen from './listen';
import { initializeState } from './states';
import EventAdapter from './event-adapter';

/**
 * The main class.
 */
export default class Main {
  constructor(form, options) {
    this.setting = Object.assign(config, options);
    this.form = document.querySelector(form);
    if (!this.form || this.form.tagName !== 'FORM') {
      console.error('Invalid Form DOM.');
      return;
    }
    this.event = new EventAdapter(this.form);
    this.#init();
  }

  #init() {
    this.setting.fields.forEach((field) => {
      const fieldDom = document.querySelector(field);
      if (fieldDom) {
        const type = fieldDom.getAttribute('type');
        if (type === 'password') {
          fieldDom.setAttribute('data-original-type', type);
          fieldDom.setAttribute('type', 'text');
        }
      }
    });

    this.form.setAttribute('autocomplete', 'off');
    initializeState();
    listen(this);
  }

  destory() {
    this.setting.fields.forEach((field) => {
      const fieldDom = document.querySelector(field);
      if (fieldDom && fieldDom.getAttribute('data-original-type')) {
        fieldDom.setAttribute('type', 'password');
      }
    });

    this.form.removeAttribute('autocomplete');
    this.event.destory();
  }
}
