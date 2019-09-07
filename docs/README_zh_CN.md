# jquery.disableAutoFill

针对 Google Chrome 浏览器的自动填入、自动完成功能，此 jQuery plugin 应该是最简单禁用的解决方案。

Document Transations: [English](../README.md) | [繁體中文](./README_zh_TW.md) | [简体中文](./README_zh_CN.md)

----

曾花了数小时在线上找寻能够禁用 Google Chrome 会自动填写及自动完成表单，例如下面的截图。

![Image](https://i.imgur.com/j5Mw1ly.png)

在试了几乎所有可能在 Stackoverflow 能找到的方法，相关的讨论串都看遍了，提到的几乎已经过时，没有作用。但后来发现了只要是表单中存在 `type="password"` 栏位，Google Chrome 就会强迫丢出提交的历史记录，因此这个 plugin 采取以下步骤以避免这种情况发生:

- 把 `type="password"` 取代为 `type="text"` 然后把输入的文字取代为万用字元 `*`，也就是原本保护密码不可看的机制。
- 在表单加入 `autocomplete="off"` 属性，针对较旧版本有效。
- 把文字输入的 `name` 属性的值以随机字母取代，避免 Chrome 和其它第三方套件储存用户曾输入过的资讯。

### 安装

#### Npm
```
npm install disableautofill
```

#### Bower
```
bower install jquery.disableAutoFill
```

#### CDN
```
<script src="https://cdn.jsdelivr.net/npm/disableautofill/src/jquery.disableAutoFill.min.js"></script>
```

### 线上范例

https://terrylinooo.github.io/jquery.disableAutoFill/

您可以查看此网址看看如何运作。

### 用法

HTML
```html
<form id="login-form">
```

JS
```javascript
$('#login-form').disableAutoFill();
```

### 选项

option | default | note
---- | --- | ---
passwordField | - | DOM 元素用 ID 或使用 ClassName 指定, 如果没有设定, disableAutoFill 会自动找寻 [**type=password**] 的栏位。
submitButton | - | DOM 元素用 ID 或使用 ClassName 指定, 如果没有设定, disableAutoFill 会自动找寻 [**type=submit**] 按纽。
hidingChar | ● | 隐藏密码的替代字元。
debugMode | false | 设为 true 的话会在 console.log 印讯息。
randomizeInputName | true | 会自动把 <i><strong>input name attribute</strong></i> 以随机的字串取代。然后在提交表单时复原至原始的栏位名称，这么做是避免 Google Chrome 和其它第三方拓展及其它浏览器会记住曾输入的讯息。
设这个选项为“true”来启用 HTML 5 原生的表单验证功能 (`required`，`pattern`及其它相关属性...)
callback | - | 送出表单时的回呼，可以用来执行验证栏位等等。

### 例子

```javascript
$('#login-form').disableAutoFill({
    passwordField: '.password',
    callback: function() {
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

### 建议

此插件在用户浏览器执行速度较慢的情况下可能会失效，那是因为 Chrome 在插件把 `type="password"` 换成 `text` 之前就已经找到此栏位并启用自动填入功能。

您可以直接把 input `type="password"` 改为 `"text"`, 并加入一个 class (例如: ".password")，这样插件就会自动把文字输入的字母改为 `*`

```html
<input type="text" name="password" class="password">
```
```javascript
$(function() {
    $('.login-form').disableAutoFill({
        passwordField: '.password'
    });
});
```
https://jsfiddle.net/terrylinooo/hhgzbsvy/

### 授权

MIT

### 作者

* <a href="https://en.dictpedia.org">Terry Lin</a> (terrylinooo)




