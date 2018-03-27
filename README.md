# jquery.disableAutoFill
The easiest solution for disabling Google Chrome auto-fill, auto-complete functions.

----

### Why

I've spent serveral hours surfing online to look for solutions in order to disable Google Chrome auto-fill, auto-complate functions such as the screenshot below. 

![Image](https://i.imgur.com/j5Mw1ly.png)

After having tried all possible solutions I can find on Stackoverflow, howerver, they are outdated and not working. Finally I figured out that Google Chrome forces dropping the submission history while a form contains "type=password" field, so I spent 30 minutes to create this plugin to solve my problem, and yours.

### Demo

https://terrylinooo.github.io/jquery.disableAutoFill/

Checkout the demo page to see how it works.

### Usage

HTML
```html
<form id="login-form">
```

JS
```javascript
$('#login-form').disableAutoFill();
```

### Options

option | default | note 
---- | --- | ---
passwordFiled | - | Dom Element by ID or by ClassName, if not set, disableAutoFill automaticlly pick up the [**type=passoword**] field.
submitButton | - | Dom Element by ID or by ClassName, if not set, disableAutoFill automaticlly pick up the [**type=submit**] button.
debugMode | false | If true, printing form serialized data in console log instead of submitting.
callback | - | To validate form fields or something you can do.



### Example
```javascript
$('#login-form').disableAutoFill({
    'passwordFiled': '.password',
    'callback': function() {
        return checkForm();
    }
});

function checkForm() {
    form = document.getElementById('login-form');
    if (form.password.value == '') {
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
```

### License

MIT

### Authors

* <a href="https://en.dictpedia.org">Terry Lin</a> (terrylinooo)