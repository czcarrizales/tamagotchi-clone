import {useState} from 'react'

function Login() {

  const [registerState, setRegisterState] = useState({
    email: '',
    password: ''
  })

  async function loginUser(event) {
    event.preventDefault()
    const response = await fetch('http://localhost:5000/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: registerState.email,
        password: registerState.password
      })
    })

    const data = await response.json()

    if (data.user) {
      localStorage.setItem('token', data.user)
      alert('login success!')
      window.location.href = '/dashboard'
    } else {
      alert('yo man, check yo email and password, ya hear?')
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
      <h1>Login</h1>
      <form onSubmit={loginUser}>
        <input type="email" name="email" placeholder="email" value={registerState.email} onChange={handleChange}></input>
        <input type="password" name="password" placeholder="password" value={registerState.password} onChange={handleChange}></input>
        <input type="submit" value="login"></input>
      </form>
    </div>
  );
}

export default Login;
