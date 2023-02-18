import {useState, useEffect} from 'react'
import { useNavigate, Navigate } from 'react-router-dom'
import '../styles/Register.css'
import jwtDecode from 'jwt-decode'

function Register() {

    const navigate = useNavigate()

  const [registerState, setRegisterState] = useState({
    name: '',
    password: ''
  })
  const [validPassword, setValidPassword] = useState(false)
  const [validUsername, setValidUsername] = useState(false)
  const [duplicateUsername, setDuplicateUsername] = useState(false)

  const token = localStorage.getItem('token')

  useEffect(() => {
    if (registerState.password.length <= 5) {
      setValidPassword(false)
    } else {
      setValidPassword(true)
    }
    if (registerState.name.length <= 5) {
      setValidUsername(false)
    } else {
      setValidUsername(true)
    }
  }, [registerState])

  // if(jwtDecode(token).exp * 1000 > Date.now()) {
  //   return <Navigate to="/view-pet" />
  //   console.log('you are already logged in my dude')
  // } else {
  //   console.log('they are not logged in')
  // }

  async function registerUser(event) {
    event.preventDefault()
    if (isValid()) {
      const response = await fetch('http://localhost:5000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: registerState.name,
          password: registerState.password
        })
      })

      console.log(response)
  
      const data = await response.json()
      console.log(data.status)
  
      if (data.status === 'ok') {
          navigate('/login')
      } else if (data.status === 'duplicate username'){
        setDuplicateUsername(true)
      }
      console.log(data)
    }
    
  }

  function handleChange(event) {
    const value = event.target.value
    setRegisterState({...registerState, [event.target.name]: value})
    console.log(registerState)
  }

  function isValid() {
    if (registerState.password.length <= 5 || registerState.name.length <= 5) {
      return false
    }
    return true
  }

  return (
    <div className='register-container'>
      <h1>Register</h1>
      <form onSubmit={registerUser}>
        <input type="text" name="name" placeholder="username" value={registerState.name} onChange={handleChange}></input>
        {!validUsername && <span>Your username must be at least 6 characters.</span>}
        {duplicateUsername && <span>Username already taken.</span>}
        <input type="password" name="password" placeholder="password" value={registerState.password} onChange={handleChange}></input>
        {!validPassword && <span>Your password must be at least 6 characters.</span>}
        <input type="submit" value="register"></input>
      </form>
    </div>
  );
}

export default Register;
