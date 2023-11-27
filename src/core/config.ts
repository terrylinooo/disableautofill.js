import { Config } from '../types';

const config: Config = {
  /**
   * DOM selectors for password fields.
   *
   * @type {Array}
   */
  fields: [],

  /**
   * Symbol used to replace password characters, typically an asterisk.
   *
   * @type {String}
   */
  asterisk: '●',

  /**
   * Callback function that is executed for form validation or other purposes.
   *
   * @type {Function|null}
   */
  callback: null,
};

export default config;
