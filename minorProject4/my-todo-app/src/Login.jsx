import { useState } from "react";

function Login({ login, goToSignup }) {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  function handleLogin() {
     
    if( email === "" || password === ""){
        alert("Please fill all the deatils!");
        return;
    }
    
    login(email, password);

  }


  return (

    <div className="auth-container">

      <div className="auth-box">

        <h1>👋 Welcome Back</h1>

        <p className="subtitle">
          Login to manage your tasks
        </p>


        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />


        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />


        <button
          className="main-btn"
          onClick={handleLogin}
        >
          Login
        </button>


        <p className="switch-text">
          Don't have an account?
        </p>


        <button
          className="secondary-btn"
          onClick={goToSignup}
        >
          Create Account
        </button>

      </div>

    </div>

  );
}

export default Login;