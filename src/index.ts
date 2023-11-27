import Main from './core/main';

declare global {
  interface Window {
    Disableautofill: typeof Main;
  }
}

if (typeof window !== 'undefined') {
  window.Disableautofill = Main;
}
