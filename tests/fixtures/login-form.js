export default function loginForm() {
  return `
    <form class="login-form" action="" method="post">
      <div class="login-form__row">
        <label for="username">Username</label>
        <input id="username" type="text" name="username" value="terry_lin" />
      </div>
      <div class="login-form__row">
        <label for="password">Password</label>
        <input id="password" type="password" name="password" value="12345678" />
      </div>
      <div class="login-form__row">
        <label for="password">Password</label>
        <button type="sumbit">Submit</button>
      </div>
    </form>
  `;
}
