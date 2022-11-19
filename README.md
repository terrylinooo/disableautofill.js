# disableautofill.js

![Disable auto-fill, auto-complete functions](https://i.imgur.com/MvWi2Sr.png)

The easiest solution for disabling Google Chrome auto-fill, auto-complete functions.

This library does the following steps:

* Replace `type="password"` with `type="text"`. [1]
* Replace the text of password with asterisk symbols.
* Add an attribute `autocomplete="off"` on form.
* Randomize the attribute `name` in order to prevent Google Chrome to remember what you fill.

Note:

[1] *It is recommended to use `type="text"` directly, or it might not work depends on browser's version and page rendering speed.*

## Install

#### NPM
```bash
npm install disableautofill
```

#### CDN

```bash
https://cdn.jsdelivr.net/npm/disableautofill@3.0.1/dist/disableautofill.min.js

```

## Usage

HTML
```html
<form id="login-form">
    ...
</form>
```

JS
```javascript
import Disableautofill from 'disableautofill';

var daf = new Disableautofill('#login-form', {
  // settings.
});

// If you want to remove the attached events.
daf.destory();
```

## Options

option | default | type | note 
---- | --- | --- | ---
fields | [] | array | The id or class of the fields (the `input` elements for filling password in the form). For example: `['.newpass', 'newpass2']`
asterisk | ● | string | Character use to hide the real password value.
callback | null | function | To validate form fields or something you can do.

## Examples

This example form presents the main functionality of disableautofill.js

```html
<form id="testForm" method="get" action="/">
    <div class="input-group">
        <label>Username</label>
        <input type="text" name="username">
    </div>
    <div class="input-group">
        <label>Password</label>
        <input type="text" name="password" class="test-pass">
    </div>
    <div class="input-group">
        <label>Confirm password</label>
        <input type="text" name="confirm_password" class="test-pass2">
    </div>
    <div class="button-section">
        <button type="submit">Submit</button>
    </div>
</form>
<script>

/**
 * Callback function is usually a form validator.
 *
 * @return bool
 */
function checkForm() {
    form = document.getElementById('login-form');
    if (form.password.value == '' || form.confirm_password.value == '') {
        alert('Cannot leave Password field blank.');
        form.password.focus();
        return false;
    }
    if (form.username.value == '') {
        alert('Cannot leave User Id field blank.');
        form.username.focus();
        return false;
    }
    return true;
}
</script>
```

### JS

```javascript
new Disableautofill('#testForm', {
  'fields': [
    '.test-pass',  // password
    '.test-pass2'  // confirm password
  ],
  'callback': function() {
    return checkForm();
  }
});

```

## License

MIT

## Authors

disableautofill.js is brought to you by <a href="https://terryl.in">Terry Lin</a> from Taiwan.
