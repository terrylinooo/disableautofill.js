# disableautofill.js

![Disable auto-fill, auto-complete functions](https://i.imgur.com/MvWi2Sr.png)


![Test](https://github.com/terrylinooo/disableautofill.js/actions/workflows/testing.yml/badge.svg) [![codecov](https://codecov.io/gh/terrylinooo/disableautofill.js/branch/master/graph/badge.svg?token=lIP1cwSQjC)](https://codecov.io/gh/terrylinooo/disableautofill.js) [![DeepScan grade](https://deepscan.io/api/teams/19398/projects/23075/branches/688836/badge/grade.svg)](https://deepscan.io/dashboard#view=project&tid=19398&pid=23075&bid=688836)

The easiest solution for disabling Google Chrome auto-fill, auto-complete functions.

## Concept

This library does the following steps:

* Replace `type="password"` with `type="text"`.
* Replace the text of password with **asterisk** symbols.
* Add an attribute `autocomplete="off"` on form.
* Randomize the attribute `name` in order to prevent Google Chrome to remember what you fill.

The library will restore the original password value when you submit the form and then replace the password value with asterisk symbols again.

The flowchart below shows the process of the library:

![](https://i.imgur.com/hAIIt2R.png)

- `Main`: Acts as the entry point of the process, responsible for initializing other components.
- `EventAdapter`: Manages the addition and removal of DOM events.
- `listen`: Sets up listeners for specific form events, like keyboard inputs and form submissions.
- `handle`: Processes DOM elements (like password fields) based on triggered events.
- `Randomizer`: Performs randomization and restoration operations on form fields to manage password display.
- `State`: Maintains and updates form state, such as temporary and original password values.
- DOM Elements: Refers to the HTML elements (like input fields) that are directly manipulated.

## Install

#### NPM
```bash
npm install disableautofill
```

or download the latest release.

## Usage

```javascript
new Disableautofill(form, options);
```

- `form` CSS selector or DOM element.
- `options` The options.

### Options

option | default | type | note 
---- | --- | --- | ---
fields | [] | array | The id or class of the fields (the `input` elements for filling password in the form). For example: `['.newpass', 'newpass2']`
asterisk | ● | string | Character use to hide the real password value.
callback | null | function | To validate form fields or something you can do.

### Public Methods

#### `destroy()`

Removes all event listeners and restores the original form element. Please note that all events will be removed after calling this method.

#### `init()`

This method is called by default when you initialize the script. You can call this method to re-initialize the script after calling the `destroy()` method.



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
<script src="./dist/disableautofill.js"></script>
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
### Node Environment

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

### Intergate with React

```javascript
import React, { useEffect, useRef } from 'react';
import Disableautofill from 'disableautofill';

const LoginFormComponent = () => {
  const formRef = useRef(null);
  let mainInstance = null;

  useEffect(() => {
    if (formRef.current) {
      mainInstance = new Disableautofill(
        formRef.current,
        {
          fields: [
              '.test-pass',
              '.test-pass2',
          ],
          callback: () => {
            return true;
          }
        }
      );
    }

    return () => {
      if (mainInstance) {
        mainInstance.destroy();
      }
    };
  }, []);

  return (
    <form ref={formRef}>
      <div class="input-group">
        <label>Username</label>
        <input type="text" name="username" />
      </div>
      <div class="input-group">
        <label>Password</label>
        <input type="password" name="password" class="test-pass" />
      </div>
      <div class="input-group">
        <label>Confirm password</label>
        <input type="password" name="confirm_password" class="test-pass2" />
      </div>
      <div class="button-section">
        <button type="submit">Submit</button>
      </div>
    </form>
  );
};

export default LoginFormComponent;
```

This is the simple example of React. You may modify the code to fit your needs. See this example run in [CodePen](https://codepen.io/terrylinooo/pen/bGzQBxR).

### Intergrate with Vue

```javascript
import { onMounted, onUnmounted, ref, createApp } from 'vue';
import Disableautofill from 'disableautofill';

const App = {
  setup() {
    const formRef = ref(null);
    let mainInstance = null;

    onMounted(() => {
      if (formRef.value) {
        mainInstance = new Disableautofill(formRef.value, {
          fields: ['.test-pass', '.test-pass2'],
          callback: () => true
        });
      }
    });

    onUnmounted(() => {
      if (mainInstance) {
        mainInstance.destroy();
      }
    });

    return { formRef };
  },
  template: `
    <form ref="formRef">
      <div class="input-group">
        <label for="username">Username</label>
        <input id="username" type="text" name="username" />
      </div>
      <div class="input-group">
        <label for="password">Password</label>
        <input id="password" type="password" name="password" class="test-pass" />
      </div>
      <div class="input-group">
        <label for="confirmPassword">Confirm Password</label>
        <input id="confirmPassword" type="password" name="confirm_password" class="test-pass2" />
      </div>
      <div class="button-section">
        <button type="submit">Submit</button>
      </div>
    </form>
  `
};
```

This is the simple example of Vue 3. You may modify the code to fit your needs. See this example run in [CodePen](https://codepen.io/terrylinooo/pen/BaMGpEq).

---

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

- Please create a branch off of the 4.x branch and submit your pull requests back to the 4.x branch.
- Run the commands `npm run test` and `npm run lint` before submitting your pull request. Ensure that all tests pass and there are no linting errors.

## About

disableautofill.js is developed by [Terry Lin](https://terryl.in). Thanks to [CoLocal](https://colocal.com) for sponsoring the development of this script. It is released under the **MIT license**, allowing for free and open use.
