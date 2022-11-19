import handler from './handle';
/**
 * Event listener for password fields.
 * We'd like to hide the original password string with symbol characters.
 *
 * @param {Object} main The main instance.
 */
export default function listen(main) {
  const { form } = main;
  const { event } = main;
  const { fields } = main.setting;
  const { asterisk } = main.setting;
  const { callback } = main.setting;

  event.on('keyup', (e) => {
    fields.forEach((field) => {
      const fieldDom = document.querySelector(field);
      if (fieldDom) {
        handler(fieldDom, e, asterisk, 'randomize');
        fieldDom.setAttribute('type', 'text');
      }
    });
  });

  event.on('submit', (e) => {
    e.preventDefault();

    const restorePassword = new Promise((resolve) => {
      for (let i = 0; i < fields.length; i += 1) {
        const fieldDom = document.querySelector(fields[i]);
        if (fieldDom) {
          handler(fieldDom, e, asterisk, 'restore');
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
          form.submit();
        }
        return;
      }
      form.submit();
    });
  });
}
