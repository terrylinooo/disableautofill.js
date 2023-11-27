import { handle } from './handle';
import Main from './main';

/**
 * Sets up event listeners for password fields in a form.
 * The objective is to hide the original password string with symbol characters.
 *
 * @param {Object} main The main instance managing the form.
 */
export const listen = (main: Main): void => {
  const { form, event, state, setting } = main;
  const { fields, asterisk, callback } = setting;

  const submit = (form: HTMLFormElement): void => {
    if ((window as any).disableautofill_unit_test) {
      console.log('test ok, submitted.');
      return;
    }
    form.submit();
  };

  if (event === null) {
    console.error('EventAdapter is not initialized.')
    return;
  }

  event.on('keyup', (e: Event | KeyboardEvent) => {
    fields.forEach((field: any) => {
      const fieldDom = document.querySelector(field) as HTMLInputElement | null;
      if (fieldDom) {
        handle({
          fieldDom,
          event: e,
          asterisk,
          action: 'randomize',
          state,
        });
        fieldDom.setAttribute('type', 'text');
      }
    });
  });

  event.on('submit', (e: Event) => {
    e.preventDefault();

    const restorePassword = new Promise<void>((resolve) => {
      for (let i = 0; i < fields.length; i += 1) {
        const fieldDom = document.querySelector(fields[i]) as HTMLInputElement | null;
        if (fieldDom) {
          handle({
            fieldDom,
            event: e,
            asterisk,
            action: 'restore',
            state,
          });
          if (fieldDom.getAttribute('data-original-type') === 'password') {
            fieldDom.setAttribute('type', 'password');
          }
        }
      }
      resolve();
    });

    restorePassword.then(() => {
      if (typeof callback === 'function') {
        if (callback(form)) {
          submit(form);
        }
        return;
      }
      submit(form);
    });
  });
};