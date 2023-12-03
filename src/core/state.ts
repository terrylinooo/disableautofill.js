import { StateData } from '../types';

export default class State {
  private id: string;
  private state: { [id: string]: StateData };

  constructor(id?: string) {
    this.id = id || Math.random().toString(36).substring(5);
    this.state = {};
    this.state[this.id] = {};
  }

  get(type: string): StateData {
    return this.state[this.id][type] || {};
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  update(type: string, data: any): void {
    this.state[this.id][type] = data;
  }
}
