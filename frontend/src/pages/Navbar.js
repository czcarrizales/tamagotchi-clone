import { useEffect, useState } from "react";
import jwtDecode from "jwt-decode";
import "../styles/Navbar.css";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Navbar({userData}) {
  const token = localStorage.getItem("token");
  const navigate = useNavigate()
  const [userHasPet, setUserHasPet] = useState(false)

  let decodedToken;
  if (token) {
    decodedToken = jwtDecode(token);
    axios.interceptors.request.use((config) => {
      config.headers.authorization = `Bearer ${token}`;
      return config;
    });
  }

  useEffect(() => {
    async function fetchUserData() {
      console.log('navbar checking if user has pet')
        if (userData && userData.pet === null) {
          setUserHasPet(false)
        } else {
          setUserHasPet(true)
        }
    }
    fetchUserData();
    return () => {};
  }, [userData]);

  useEffect(() => {
    console.log('navbar component rerender')
    console.log(userData)
  }, [userData])

  function logout() {
    localStorage.clear()
    axios.get('http://localhost:5000/logout')
      .then(
        console.log('logged out from front end')
        )
        .then(navigate('/login'))
  }

  function isLoggedIn() {
    if (token == null) {
      return (<div className="login-register">
        <li>
              <a href="/login">Login</a>
            </li>
            <li>
              <a href="/register">Register</a>
            </li>
      </div>)
    } else if (token) {
      return (
        <div>
          <li>
            <a href="#" onClick={logout}>Logout</a>
          </li>
        </div>
      )
    }
  }

  function hasPet() {
    if (token && userData) {
      if (!userHasPet) {
        return (
          <div>
            <li>
              <Link to="/create-pet">Create</Link>
            </li>
            <li>
          <Link to="/adopt">Adopt</Link>
        </li>
          </div>
        );
      } else {
        return (
          <div>
            <li>
              <a href="/view-pet">Pet</a>
            </li>
          </div>
        )
      }
    }
  }

  const getDataFromParent = () => {
    
  }

  return (
    <div className="navbar-container">
      <ul className="navbar-ul-container">
        {hasPet()}
        {isLoggedIn()}
      </ul>
    </div>
  );
}

export default Navbar;
