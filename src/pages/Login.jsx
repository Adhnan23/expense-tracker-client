const Login = () => {
  return (
    <div>
      <h1>Login Page</h1>
      <label>
        Email <input type="email" />
      </label>
      <br />
      <br />
      <label>
        Password <input type="password" />
      </label>
      <br />
      <br />
      <button>Login</button>
      <p>
        If you don't have an account <a href="/register">sign-up</a>
      </p>
    </div>
  );
};

export default Login;
