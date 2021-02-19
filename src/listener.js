'use strict';

const debug = require('debug');
const handler = require('handler');

 /**
 * Event listener for password fields.
 * We'd like to hide the original password string with symbol characters.
 *
 * @param {string}   form     The form's .class or #id
 * @param {array}    fields   A collecition of the DOMs' .class or #id
 * @param {string}   asterisk The asterisk symbol. (option)
 * @param {function} callback Generally the form validator.
 * @return null
 */
function listener(form, fields, asterisk, callback) {
    let formDom = null;

    let getDom = text => {

        // text is a string of "class".
        if (text.indexOf('.') == 0) {
            return document.getElementsByClassName(
                text.substring(1)
            )[0];

         // text is a string of "id".
        } else if (text.indexOf('#') == 0) {
            return document.getElementById(
                text.substring(1)
            );
        }
    };

    formDom = getDom(form);

    if (formDom !== null) {
        formDom.addEventListener('keyup', event => {
            fields.forEach((field, i) => {
                let fieldDom = {};
                fieldDom[i] = getDom(field);

                if (typeof fieldDom[i] !== 'undefined') {
                    debug('info', 'Keyup event ' + i + ' is triggered!');
                    handler(fieldDom[i], event, asterisk, 'randomize');
                } else {
                    debug('warning', 'The field called "' + field + '" is not found.');
                }
            });
        });

        formDom.addEventListener('submit', event => {
            event.preventDefault();

            let restorePassword = new Promise((resolve, reject) => {
                fields.forEach((field, i) => {
                    let fieldDom = {};
                    fieldDom[i] = getDom(field);
    
                    if (typeof fieldDom[i] !== 'undefined') {
                        handler(fieldDom[i], event, asterisk, 'restore');
                        return resolve();
                    } else {
                        debug('warning', 'The field called "' + field + '" is not found.');
                        return reject();
                    }
                });
            });

            if (typeof callback === 'function') {
                restorePassword.then(() => {
                    // Once restore the password successfully, run callback function to check the form.
                    if (callback(formDom)) {
                       formDom.submit();
                    } else {
                        debug('warning', 'Callback returned false.');
                    }
                });
            } else {
                restorePassword.then(() => {
                    formDom.submit();
                });
            }
        });

    } else {
        debug('warning', 'Form element "' + form + '" not found.');
    }
    return null;
}

module.exports = listener;
