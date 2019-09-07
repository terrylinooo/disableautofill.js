# jquery.disableAutoFill

針對 Google Chrome 瀏覽器的自動填入、自動完成功能，此 jQuery plugin 應該是最簡單禁用的解決方案。

Document Transations: [English](../README.md) | [繁體中文](./README_zh_TW.md) | [简体中文](./README_zh_CN.md)

----

曾花了數小時在線上找尋能夠禁用 Google Chrome 會自動填寫及自動完成表單，例如下面的截圖。

![Image](https://i.imgur.com/j5Mw1ly.png)

在試了幾乎所有可能在 Stackoverflow 能找到的方法，相關的討論串都看遍了，提到的幾乎已經過時，沒有作用。但後來發現了只要是表單中存在 `type="password"` 欄位，Google Chrome 就會強迫丟出提交的歷史記錄，所以這個 plugin 進行了以下步驟來避免這種情況發生:

- 把 `type="password"` 取代為 `type="text"` 然後把輸入的文字取代為萬用字元 `*`，也就是原本保護密碼不可看的機制。
- 在表單加入 `autocomplete="off"` 屬性，針對較舊版本有效。
- 把文字輸入的 `name` 屬性的值以隨機字母取代，避免 Chrome 和其它第三方套件儲存用戶曾輸入過的資訊。 

### 安裝

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


### 線上範例

- [登入表單](https://terrylinooo.github.io/jquery.disableAutoFill/)
- [登入表單 & jQuery Validate 插件](https://terrylinooo.github.io/jquery.disableAutoFill/jquery-validate.html)
- [登入表單 & HTML 5 原生表單驗證功能](https://terrylinooo.github.io/jquery.disableAutoFill/html5-form-validate.html)

您可以查看此網址看看如何運作。

### 用法

HTML
```html
<form id="login-form">
```

JS
```javascript
$('#login-form').disableAutoFill();
```

### 選項

option | default | note 
---- | --- | ---
passwordField | - | DOM 元素用 ID 或使用 ClassName 指定, 如果沒有設定, disableAutoFill 會自動找尋 [**type=password**] 的欄位。
submitButton | - | DOM 元素用 ID 或使用 ClassName 指定, 如果沒有設定, disableAutoFill 會自動找尋 [**type=submit**] 按紐。
hidingChar | ● | 隱藏密碼的替代字元。
debugMode | false | 設為 true 的話會在 console.log 印訊息。
randomizeInputName | true | 會自動把 <i><strong>input name attribute</strong></i> 以隨機的字串取代。然後在提交表單時復原至原始的欄位名稱，這麼做是避免 Google Chrome 和其它第三方拓展及其它瀏覽器會記住曾輸入的訊息。
html5FormValidate | false | 設這個選項為 "true" 來啟用 HTML 5 原生的表單驗證功能 ( `required`,`pattern` 及其它相關屬性...)
callback | - | 送出表單時的回呼，可以用來執行驗證欄位等等。

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

### 建議

此插件在用戶瀏覽器執行速度較慢的情況下可能會失效，那是因為 Chrome 在插件把 `type="password"` 換成 `text` 之前就已經找到此欄位並啟用自動填入功能。

您可以直接把 input `type="password"` 改為 `"text"`, 並加入一個 class (例如: ".password")，這樣插件就會自動把文字輸入的字母改為 `*` 

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

### 授權

MIT

### 作者

* <a href="https://en.dictpedia.org">Terry Lin</a> (terrylinooo)
