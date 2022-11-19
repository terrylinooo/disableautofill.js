import listen from './listen';
import { initializeState } from './states';

/**
 * This class is used as an initialization, defining the basic settings
 * and implementing the functionality of disabling autofill.
 */
export default class Main {
  constructor(form, setting) {
    // Default settings.
    this.setting = {
      fields: [],
      asterisk: '●',
      callback: null,
    };
    this.form = form;

    Object.keys(this.setting).forEach((key) => {
      if (typeof setting[key] !== 'undefined') {
        this.setting[key] = setting[key];
      }
    });

    initializeState();
  }

  init() {
    const { fields } = this.setting;
    const { asterisk } = this.setting;
    const { callback } = this.setting;
    listen(this.form, fields, asterisk, callback);
  }
}
