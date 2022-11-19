import { getState, updateState } from './states';

/**
 * Randomize or recover the name attribute.
 */
export default class Randomizer {
  /**
   * Constructor.
   *
   * @param {object} dom The DOM.
   * @param {array} originalPassChars The original password.
   */
  constructor(dom, originalPassChars) {
    this.dom = dom;
    this.originalPassChars = originalPassChars;
    this.originalNames = getState('original_names');
    this.temporaryNames = getState('temporary_names');
  }

  /**
   * ramdomize
   *
   * Add random chars on "name" attribute to avid Browser remember what you submitted before.
   */
  randomize() {
    const { id } = this.dom;
    const randomName = Math.random()
      .toString(36)
      .replace(/[^a-z]+/g, '');

    if (!this.originalNames[id]) {
      this.originalNames[id] = this.dom.name;
    }

    if (this.temporaryNames[this.originalNames[id]]) {
      this.dom.name = this.temporaryNames[this.originalNames[id]];
    } else {
      this.dom.name = randomName;
      this.temporaryNames[this.originalNames[id]] = randomName;
    }

    updateState('original_names', this.originalNames);
    updateState('temporary_names', this.temporaryNames);
  }

  /**
   * resote
   *
   * Remove random chars on "name" attribute, so we can submit correct data then.
   * Restore password from star signs to original input password.
   */
  restore() {
    this.dom.name = this.originalNames[this.dom.id];
    this.dom.value = this.originalPassChars.join('');
  }
}
