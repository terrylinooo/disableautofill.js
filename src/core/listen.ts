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

  /* v8 ignore next 4 */
  if (event === null) {
    console.error('EventAdapter is not initialized.');
    return;
  }

  const submit = (form: HTMLFormElement): void => {
    if ((window as Window & { disableautofill_unit_test?: boolean }).disableautofill_unit_test) {
      console.log('test ok, submitted.');
      return;
      /* v8 ignore next 2 */
    }
    form.submit();
  };

  const keyupPasswordField = (e: Event | KeyboardEvent) => {
    const fieldDom = e.target as HTMLInputElement | null;
    if (fieldDom && fieldDom.getAttribute('data-orig-type') === 'password') {
      handle({
        fieldDom,
        event: e,
        asterisk,
        action: 'randomize',
        state,
      });
    }
  };

  const handlePasswordField = (e: Event, action: 'restore' | 'randomize') => {
    fields.forEach((field: string) => {
      const fieldDom = document.querySelector(field) as HTMLInputElement | null;
      if (fieldDom && fieldDom.getAttribute('data-orig-type') === 'password') {
        handle({
          fieldDom,
          event: e,
          asterisk,
          action: action,
          state,
        });
      }
    });
  };

  const restorePasswordFieldNames = (e: Event) => {
    handlePasswordField(e, 'restore');
  };

  const randomizePasswordFieldNames = (e: Event) => {
    handlePasswordField(e, 'randomize');
  };

  const submitForm = (e: Event) => {
    e.preventDefault();

    const restorePassword = new Promise<void>((resolve) => {
      restorePasswordFieldNames(e);
      resolve();
    });

    restorePassword.then(() => {
      if (typeof callback === 'function' && callback(form) === false) {
        randomizePasswordFieldNames(e);
        return;
      }
      submit(form);
      randomizePasswordFieldNames(e);
    });
  };

  event.on('keyup', keyupPasswordField);
  event.on('submit', submitForm);
  event.on('restorePasswordName', restorePasswordFieldNames);
};
