import Main from './core/main';

declare global {
  interface Window {
    Disableautofill: typeof Main | undefined;
  }
}

if (typeof window !== 'undefined') {
  window.Disableautofill = Main;
}

export default Main;
