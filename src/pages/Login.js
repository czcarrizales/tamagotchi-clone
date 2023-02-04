import { Navigate } from "react-router-dom";
import { useState } from "react";
import jwtDecode from "jwt-decode";

import "../styles/Login.css";

function Login() {
  const token = localStorage.getItem("token");

  const [registerState, setRegisterState] = useState({
    email: "",
    password: "",
  });

  if (token) {
    if (jwtDecode(token).exp * 1000 > Date.now()) {
      return <Navigate to="/view-pet" />;
      console.log("you are already logged in my dude");
    } else {
      console.log("they are not logged in");
    }
  }

  async function loginUser(event) {
    event.preventDefault();
    const response = await fetch("http://localhost:5000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: registerState.email,
        password: registerState.password,
      }),
    });

    const data = await response.json();

    if (data.user) {
      localStorage.setItem("token", data.user);
      alert("login success!");
      window.location.href = "/view-pet";
    } else {
      alert("yo man, check yo email and password, ya hear?");
    }
    console.log(data);
  }

  function handleChange(event) {
    const value = event.target.value;
    setRegisterState({ ...registerState, [event.target.name]: value });
    console.log(registerState);
  }

  return (
    <div className="login-container">
      <h1>Login</h1>
      <form onSubmit={loginUser}>
        <input
          type="email"
          name="email"
          placeholder="email"
          value={registerState.email}
          onChange={handleChange}
        ></input>
        <input
          type="password"
          name="password"
          placeholder="password"
          value={registerState.password}
          onChange={handleChange}
        ></input>
        <input type="submit" value="login"></input>
      </form>
    </div>
  );
}

export default Login;
