import {useState} from 'react'
import { useNavigate } from 'react-router-dom'

function Register() {

    const navigate = useNavigate()

  const [registerState, setRegisterState] = useState({
    name: '',
    email: '',
    password: ''
  })

  async function registerUser(event) {
    event.preventDefault()
    const response = await fetch('http://localhost:5000/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: registerState.name,
        email: registerState.email,
        password: registerState.password
      })
    })

    const data = await response.json()

    if (data.status === 'ok') {
        navigate('/login')
    }
    console.log(data)
  }

  function handleChange(event) {
    const value = event.target.value
    setRegisterState({...registerState, [event.target.name]: value})
    console.log(registerState)
  }

  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={registerUser}>
        <input type="text" name="name" placeholder="name" value={registerState.name} onChange={handleChange}></input>
        <input type="email" name="email" placeholder="email" value={registerState.email} onChange={handleChange}></input>
        <input type="password" name="password" placeholder="password" value={registerState.password} onChange={handleChange}></input>
        <input type="submit" value="register"></input>
      </form>
    </div>
  );
}

export default Register;
