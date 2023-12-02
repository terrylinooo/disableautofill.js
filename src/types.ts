import EventAdapter from './core/event-adapter';
import State from './core/state';

export type EventHandler = (event: Event | KeyboardEvent) => void;

export interface StateData {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

export interface Config {
  fields: string[];
  asterisk: string;
  callback: ((form: HTMLFormElement) => boolean) | null;
}

export interface HandleOptions {
  fieldDom: HTMLInputElement;
  event: Event | KeyboardEvent;
  asterisk: string;
  action: 'randomize' | 'restore';
  state: State;
}

export interface MainInterface {
  form: HTMLFormElement;
  event: EventAdapter;
  state: State;
  setting: Config;
}
