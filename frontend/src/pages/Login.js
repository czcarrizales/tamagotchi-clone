import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import jwtDecode from "jwt-decode";

import "../styles/Login.css";



function Login() {

  
  const token = localStorage.getItem("token");

  const [loginState, setLoginState] = useState({
    email: "",
    password: "",
  });
  const [validUsername, setValidUsername] = useState(false)
  const [validPassword, setValidPassword] = useState(false)

  useEffect(() => {
    if (loginState.password.length <= 5) {
      setValidPassword(false)
    } else {
      setValidPassword(true)
    }
    console.log(loginState)
  }, [loginState])

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
        email: loginState.email,
        password: loginState.password,
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
    console.log(value)
    setLoginState({ ...loginState, [event.target.name]: value });
    
    console.log(loginState);
    console.log(validPassword)
  }

  

  return (
    <div className="login-container">
      <h1>Login</h1>
      <form onSubmit={loginUser}>
        <input
          type="email"
          name="email"
          placeholder="email"
          value={loginState.email}
          onChange={handleChange}
        ></input>
        {validUsername && <p>Invalid username!</p>}
        <input
          type="password"
          name="password"
          placeholder="password"
          value={loginState.password}
          onChange={handleChange}
        ></input>
        {!validPassword && <p>Invalid password! Must be at least 6 characters long!</p>}
        <input type="submit" value="login"></input>
      </form>
    </div>
  );
}

export default Login;
