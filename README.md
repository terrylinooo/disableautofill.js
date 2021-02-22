# disableautofill.js

The easiest solution for disabling Google Chrome auto-fill, auto-complete functions.

This library does the following steps:

* Replace `type="password"` with `type="text"`. [1]
* Replace the text of password with asterisk symbols.
* Add an attribute `autocomplete="off"` on form.
* Randomize the attribute `name` in order to prevent Google Chrome to remember what you filled.

Note:

[1] *It is recommended to use `type="text"` directly, or it might not work depends on browser's version and page rendering speed.*

## Install

### NPM
```bash
npm install disableautofill
```

#### Bower
```bash
bower install terrylinooo/disableautofill.js
```

#### CDN

```bash
# Pure JS, without jQuery
https://cdn.jsdelivr.net/npm/disableautofill@2.0.0/dist/disableautofill.min.js

# jQuery plugin.
https://cdn.jsdelivr.net/npm/disableautofill@2.0.0/dist/jquery.disableautofill.min.js
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
var daf = new disableautofill({
    'form': '#login-form',
    // settings...
});

daf.init();
```

Or, if you like to use jQuery plugin.
```javascript
$('#login-form').disableAutoFill({
    // settings...
});
```

## Options

option | default | type | note 
---- | --- | --- | ---
form | null | string | The id or class of the form. For example: `#my-form`, `.custom-form`. This option is ignored if using jQuery plugin..
fields | [] | array | The id or class of the form. For example: `['.newpass', 'newpass2']`
asterisk | ● | string | Character use to hide the real password value.
debug | false | bool | Print colorful message in browser's development console.
callback | null | function | To validate form fields or something you can do.

## Examples

This example form presents the main functionality of disableautofill.js
A HTML form and a JavaScript function that is a form validator.

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
 var daf = new disableautofill({
    'form': '#testForm',
    'fields': [
        '.test-pass',  // password
        '.test-pass2'  // confirm password
    ],
    'debug': true,
    'callback': function() {
        return checkForm();
    }
});

daf.init();
```

### jQuery


```javascript
$('#test-form').disableAutoFill({
    'fields': [
        '.test-pass', // password
        '.test-pass2' // confirm password
    ],
    'debug': true
    'callback': function() {
        return checkForm();
    }
});
```

## Development

If you would like to contribute code to this project.

```bash
# Clone project.
git clone git@github.com:terrylinooo/jquery.disableAutoFill.git your-branch-name

# Get into the `your-branch-name` directory, run:
npm install

# Run a develpment web server, listen to port: `8000`
npm run start
```

### Test pages

```bash
http://127.0.0.1:8000

# This page is for jQuery plugin.
http://127.0.0.1:8000/jquery
```

![](https://i.imgur.com/3xxfL3b.png)

A test page will be showed and you can modify the code and see the results in real time.

![](https://i.imgur.com/CAgyQf6.png)

The Debugging messages will be showed in the development console.

## License

MIT

## Authors

disableautofill.js is brought to you by <a href="https://terryl.in">Terry Lin</a> from Taiwan.
