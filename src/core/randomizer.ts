import State from './state';

export default class Randomizer {
  private dom: HTMLInputElement;
  private originalPassChars: string[];
  private state: State;
  private originalNames: Record<string, string>;
  private temporaryNames: Record<string, string>;

  /**
   * Constructor.
   */
  constructor(dom: HTMLInputElement, originalPassChars: string[], state: State) {
    this.dom = dom;
    this.originalPassChars = originalPassChars;
    this.state = state;
    this.originalNames = this.state.get('original_names') as Record<string, string>;
    this.temporaryNames = this.state.get('temporary_names') as Record<string, string>;
  }

  /**
   * Randomize
   *
   * Add random characters to the "name" attribute to prevent the browser from
   * remembering what was submitted before.
   */
  randomize(): void {
    const { id } = this.dom;
    const randomName = Math.random()
      .toString(36)
      .replace(/[^a-z]+/g, '');

    if (!this.originalNames[id]) {
      this.originalNames[id] = this.dom.getAttribute('name') ?? '';
    }

    if (this.temporaryNames[this.originalNames[id]]) {
      this.dom.setAttribute('name', this.temporaryNames[this.originalNames[id]]);
    } else {
      this.dom.setAttribute('name', randomName);
      this.temporaryNames[this.originalNames[id]] = randomName;
    }

    this.state.update('original_names', this.originalNames);
    this.state.update('temporary_names', this.temporaryNames);
  }

  /**
   * Restore
   *
   * Remove random characters from the "name" attribute, allowing correct data submission.
   * Restore the password from asterisks to the original input.
   */
  restore(): void {
    const name = this.originalNames[this.dom.id];
    if (name) {
      this.dom.setAttribute('name', name);
    }
    this.dom.value = this.originalPassChars.join('');
  }
}

