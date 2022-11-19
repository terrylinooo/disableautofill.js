import handler from './handle';
import EventAdapter from './event-adapter';

/**
 * Event listener for password fields.
 * We'd like to hide the original password string with symbol characters.
 *
 * @param {string} selector The form's .class or #id
 * @param {array} fields A collecition of the DOMs' .class or #id
 * @param {string} asterisk The asterisk symbol. (option)
 * @param {function} callback Generally the form validator.
 */
export default function listen(selector, fields, asterisk, callback) {
  const form = document.querySelector(selector);

  if (!form) {
    return;
  }

  const event = new EventAdapter(form);

  event.on('keyup', (e) => {
    fields.forEach((field, i) => {
      const fieldDom = {};
      fieldDom[i] = document.querySelector(field);
      if (fieldDom[i]) {
        handler(fieldDom[i], e, asterisk, 'randomize');
      }
    });
  });

  event.on('submit', (e) => {
    e.preventDefault();

    const restorePassword = new Promise((resolve, reject) => {
      fields.forEach((field, i) => {
        const fieldDom = {};
        fieldDom[i] = document.querySelector(field);
        if (fieldDom[i]) {
          handler(fieldDom[i], e, asterisk, 'restore');
          return resolve();
        }
        return reject();
      });
    });

    restorePassword.then(() => {
      if (typeof callback === 'function') {
        if (callback(form)) {
          form.submit();
        }
        return;
      }
      form.submit();
    });
  });
}
