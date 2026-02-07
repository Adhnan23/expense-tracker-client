const Register = () => {
  return (
    <div>
      <h1>Register Page</h1>
      <label>
        Name <input type="text" />
      </label>
      <br />
      <br />
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
      <button>Register</button>
      <p>
        If you already have an account <a href="/login">sign-in</a>
      </p>
    </div>
  );
};

export default Register;
