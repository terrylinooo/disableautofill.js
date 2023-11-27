/* eslint-disable no-console */
import config from './config';
import { listen } from './listen';
import State from './state';
import EventAdapter from './event-adapter';
import { Config } from '../types';


export default class Main {
  setting: Config;
  form: HTMLFormElement;
  event: EventAdapter | null;
  state: State;

  constructor(formSelector: string, options: Partial<Config>) {
    this.setting = { ...config, ...options };
    this.form = document.querySelector(formSelector) as HTMLFormElement;
    this.event = null;
    this.state = new State();

    if (!this.form || this.form.tagName !== 'FORM') {
      console.error('Invalid Form DOM.');
      return;
    }
    this.event = new EventAdapter(this.form);
    this.init();
  }

  private init(): void {
    this.setting.fields.forEach((field) => {
      const fieldDom = document.querySelector(field) as HTMLInputElement | null;
      if (fieldDom && fieldDom.type === 'password') {
        fieldDom.setAttribute('data-original-type', fieldDom.type);
        fieldDom.setAttribute('type', 'text');
      }
    });

    this.form.setAttribute('autocomplete', 'off');
    listen(this);
  }

  destroy(): void {
    this.setting.fields.forEach((field) => {
      const fieldDom = document.querySelector(field) as HTMLInputElement | null;
      if (fieldDom && fieldDom.getAttribute('data-original-type')) {
        fieldDom.setAttribute('type', 'password');
      }
    });

    this.form.removeAttribute('autocomplete');

    if (this.event) {
      this.event.destroy();
    }
  }

  getState(): State {
    return this.state;
  }
}