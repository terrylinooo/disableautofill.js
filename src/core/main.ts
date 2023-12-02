/* eslint-disable no-console */
import config from './config';
import { listen } from './listen';
import State from './state';
import EventAdapter from './event-adapter';
import { Config } from '../types';

export default class Main {
  setting: Config;
  form: HTMLFormElement;
  clonedForm: HTMLFormElement | null;
  event: EventAdapter | null;
  state: State;

  constructor(formSelector: string, options: Partial<Config>) {
    this.setting = { ...config, ...options };
    this.form = document.querySelector(formSelector) as HTMLFormElement;
    this.clonedForm = this.form?.cloneNode(true) as HTMLFormElement;
    this.event = null;
    this.state = new State();

    if (!this.form || this.form.tagName !== 'FORM') {
      console.error('Invalid Form DOM.');
      return;
    }
    this.init();
  }

  init(): void {
    this.event = new EventAdapter(this.form);
    this.#applyAttributes();
    listen(this);
  }

  destroy(): void {
    this.#resetForm();
    if (this.event) {
      this.event.emit('restorePasswordName');
      this.event.destroy();
    }
  }

  /**
   * This method is only for internal use.
   */
  getState(): State {
    return this.state;
  }

  #applyAttributes(): void {
    this.setting.fields.forEach((field) => {
      const fieldDom = document.querySelector(field) as HTMLInputElement | null;
      if (fieldDom && fieldDom.type === 'password') {
        fieldDom.setAttribute('data-orig-type', fieldDom.type);
        fieldDom.setAttribute('type', 'text');
      }
    });
    this.form.setAttribute('autocomplete', 'off');
  }

  #resetForm(): void {
    /* v8 ignore next 3 */
    if (this.form.parentNode === null || this.clonedForm === null) {
      return;
    }
    this.form.parentNode.replaceChild(this.clonedForm, this.form);
    this.form = this.clonedForm;
  }
}
