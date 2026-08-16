import { useState } from "react";
import "./App.css";

import Signup from "./Signup";
import Login from "./Login";
import Todo from "./Todo";


function App() {

  const [page, setPage] = useState("signup");

  const [user, setUser] = useState(null);


  // SIGN-UP 

  function signup(name, email, password) {

    if (name === "" || email === "" || password === "") {
      alert("Please fill all fields");
      return;
    }


    // Get existing users

    const savedUsers = localStorage.getItem("users");


    // Convert saved data into array

    const users = savedUsers
      ? JSON.parse(savedUsers)
      : [];


    // Check if email already exists

    const emailExists = users.some(
      (user) => user.email === email
    );


    if (emailExists) {
      alert("Email already registered!");
      return;
    }


    // Create new user

    const newUser = {
      name: name,
      email: email,
      password: password
    };


    // Add user

    users.push(newUser);


    // Save all users

    localStorage.setItem(
      "users",
      JSON.stringify(users)
    );


    alert("Signup successful!");


    // Go to login

    setPage("login");

  }


  // LOG_IN 

  function login(email, password) {

    const savedUsers = localStorage.getItem("users");


    if (!savedUsers) {
      alert("Please signup first");
      return;
    }


    const users = JSON.parse(savedUsers);


    // Search for matching user

    const foundUser = users.find(
      (user) =>
        user.email === email &&
        user.password === password
    );


    if (foundUser) {

      setUser(foundUser);

      setPage("todo");

    } else {

      alert("Wrong email or password");

    }

  }


  // LOGOUT 

  function logout() {

    setUser(null);

    setPage("login");

  }


  // SIGN_UP PAGE 

  if (page === "signup") {

    return (
      <Signup
        signup={signup}
        goToLogin={() => setPage("login")}
      />
    );

  }

//  LOGIN PAGE 

  if (page === "login") {

    return (
      <Login
        login={login}
        goToSignup={() => setPage("signup")}
      />
    );

  }


// TODO PAGE 

  return (
    <Todo
      user={user}
      logout={logout}
    />
  );

}


export default App;