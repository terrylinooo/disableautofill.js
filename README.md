# disableautofill.js

I'm working on version 4.x right now. Fixing some old bugs, switching the code over to TypeScript, and making sure everything's thoroughly tested. Please hold off on using it until the `rc` tag is dropped from the version number.

![Disable auto-fill, auto-complete functions](https://i.imgur.com/MvWi2Sr.png)

![Test](https://github.com/terrylinooo/disableautofill.js/actions/workflows/testing.yml/badge.svg) [![codecov](https://codecov.io/gh/terrylinooo/disableautofill.js/branch/master/graph/badge.svg?token=lIP1cwSQjC)](https://codecov.io/gh/terrylinooo/disableautofill.js) [![DeepScan grade](https://deepscan.io/api/teams/19398/projects/23075/branches/688836/badge/grade.svg)](https://deepscan.io/dashboard#view=project&tid=19398&pid=23075&bid=688836)

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

or download the latest release.

## Options

option | default | type | note 
---- | --- | --- | ---
fields | [] | array | The id or class of the fields (the `input` elements for filling password in the form). For example: `['.newpass', 'newpass2']`
asterisk | ● | string | Character use to hide the real password value.
callback | null | function | To validate form fields or something you can do.

## Examples

Assume that you have a form like this:

```html
<form id="testForm" method="get" action="/">
  <div class="input-group">
    <label>Username</label>
    <input type="text" name="username" />
  </div>
  <div class="input-group">
    <label>Password</label>
    <input type="text" name="password" class="test-pass" />
  </div>
  <div class="input-group">
    <label>Confirm password</label>
    <input type="text" name="confirm_password" class="test-pass2" />
  </div>
  <div class="button-section">
    <button type="submit">Submit</button>
  </div>
</form>
```

### In the Browser

#### UMD

Include the UMD package's JavaScript file in your HTML document using a `<script>` tag.

```html
<script src="./dist/disableautofill.umd.js"></script>
```

And then, initialize the script in the next `<script>` section.

```javascript
const checkForm = () => {
  form = document.getElementById('login-form');
  if (
    form.password.value === '' ||
    form.confirm_password.value === ''
  ) {
    alert('Cannot leave Password field blank.');
    form.password.focus();
    return false;
  }
  if (form.username.value === '') {
    alert('Cannot leave User Id field blank.');
    form.username.focus();
    return false;
  }
  return true;
};

new Disableautofill('#testForm', {
  'fields': [
    '.test-pass',
    '.test-pass2'
  ],
  'callback': function() {
    return checkForm();
  }
});
```

#### ES module

Or, you can use ES module.


```html
<script type="module" src="./dist/disableautofill.es.js"></script>
```

Then, initialize the script in the subsequent `<script>` section. Since the module is asynchronous, it's necessary to wait for the DOM to fully load before initializing the script. If you don't, you might encounter a *Disableautofill is undefined* error.

```javascript
const initializeDisableautofill = async () => {
  const checkForm = () => {
    form = document.getElementById('login-form');
    if (
      form.password.value === '' ||
      form.confirm_password.value === ''
    ) {
      alert('Cannot leave Password field blank.');
      form.password.focus();
      return false;
    }
    if (form.username.value === '') {
      alert('Cannot leave User Id field blank.');
      form.username.focus();
      return false;
    }
    return true;
  };

  new Disableautofill('#testForm', {
    'fields': [
      '.test-pass',
      '.test-pass2'
    ],
    'callback': function() {
      return checkForm();
    }
  });
};

window.addEventListener(
  'DOMContentLoaded',
  initializeDisableautofill
);
```
### In Node.js

```javascript
import Disableautofill from 'disableautofill';

const checkForm = () => {
  form = document.getElementById('login-form');
  if (
    form.password.value === '' ||
    form.confirm_password.value === ''
  ) {
    alert('Cannot leave Password field blank.');
    form.password.focus();
    return false;
  }
  if (form.username.value === '') {
    alert('Cannot leave User Id field blank.');
    form.username.focus();
    return false;
  }
  return true;
};

new Disableautofill('#testForm', {
  'fields': [
    '.test-pass',
    '.test-pass2'
  ],
  'callback': function() {
    return checkForm();
  }
});
```

## Development

#### `npm run dev`

Starts a Vite server with hot reload.

![](https://i.imgur.com/OeZhi6a.png)

This page is the entry point of the development server. You can find it at `http://localhost:9527/`.

#### `npm run lint`

Executes linting by ESLint.

#### `npm run test`

Runs tests by Vitest.

#### `npm run coverage`

Runs coverage analysis by Vitest. Once you run this command, you can find the coverage report in the `coverage` directory.
```
http://localhost:9527/coverage/
```

You will see the coverage report like this:

![](https://i.imgur.com/4vQxiB0.png)



### Using Docker

If Docker is your preferred choice, here's what you need to know.

| Command | Description |
|---|---|
| `npm run docker:image-build` | Builds the Docker image. |
| `npm run docker:image-remove` | Removes the Docker image. |
| `npm run docker:run` | Runs the Docker image. |
| `npm run docker:stop` | Stops the Docker container. |
| `npm run docker:remove` | Stops and removes the Docker container. |
| `npm run docker:test` | Runs tests in the Docker container.  |
| `npm run docker:lint` | Executes linting in the Docker container.  |
| `npm run docker:coverage` | Runs coverage analysis in the Docker container. |

## Contributing

- Create a branch from `4.x` and submit a pull request.
- Please make sure your code passes the tests and linting.

## About

disableautofill.js is developed by [Terry Lin](https://terryl.in). Thanks to [CoLocal](https://colocal.com) for sponsoring the development of this script. It is released under the **MIT license**, allowing for free and open use.
