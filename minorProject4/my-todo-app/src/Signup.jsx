import { useState } from "react";

function Signup({ signup, goToLogin }) {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");


  function handleSignup() {

  // Check empty fields first
  if ( name === "" || email === "" || password === "" || confirmPassword === "") {
    
    alert("Please fill all fields");
    return;
  }

  // Check password
  if (password !== confirmPassword) {
    alert("Password doesn't match!");
    return;
  }

  // Signup
  signup(name, email, password);
}


  return (
    <div className="auth-container">

      <div className="auth-box">

        <h1>✨ Create Account</h1>

        <p className="subtitle">
          Start organizing your day
        </p>


        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          
        />


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

        <input
        type="password"
        placeholder="Confirm Password"
        value={confirmPassword}
        onChange={(e) =>
        setConfirmPassword(e.target.value)
        }
        />


        <button
          className="main-btn"
          onClick={handleSignup}
        >
          Create Account
        </button>


        <p className="switch-text">
          Already have an account?
        </p>


        <button
          className="secondary-btn"
          onClick={goToLogin}
        >
          Login
        </button>

      </div>

    </div>

  );
}

export default Signup;