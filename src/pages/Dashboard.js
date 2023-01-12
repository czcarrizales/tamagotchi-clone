import { useEffect, useState } from "react";
import jwtDecode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import axios from 'axios'

function Dashboard() {
  const navigate = useNavigate();
  const [quote, setQuote] = useState("");
  const [tempQuote, setTempQuote] = useState("");
  const [petName, setPetName] = useState('')
  const [petPersonality, setPetPersonality] = useState('')
  const accessToken = localStorage.getItem('token')

  axios.interceptors.request.use(
    config => {
        config.headers.authorization = `Bearer ${accessToken}`
        return config
    }
  )

  const authAxios = axios.create({
    baseURL: 'http://localhost:5000',
    headers: {
        Authorization: `Bearer ${accessToken}`
    }
  })

  async function populateQuote() {
    const req = await fetch("http://localhost:5000/api/quote", {
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    });

    const data = await req.json();
    if (data.status === "ok") {
      setQuote(data.quote);
    } else {
      alert(data.error);
    }
  }

  async function updateQuote(event) {
    event.preventDefault()
    const req = await fetch("http://localhost:5000/api/quote", {
        method: "POST",
      headers: {
        'Content-Type': 'application/json',
        "x-access-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({
        quote: tempQuote,
        name: 'testy'
      }),
    },
    );

    const data = await req.json();
    if (data.status === "ok") {
        setQuote(tempQuote);
        setTempQuote("");
        console.log(data)
        
    } else {
      alert(data.error);
    }
  }

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const user = jwtDecode(token);
      if (!user) {
        localStorage.removeItem("token");
        navigate.replace("/login");
      } else {
        populateQuote();
      }
    }
  }, []);

  function setValue(event) {
    setTempQuote(event.target.value);
    console.log(event)
    console.log(tempQuote)
  }

  function handlePetNameChange(event) {
    setPetName(event.target.value)
    console.log(event.target.value)
  }

  function handlePetPersonalityChange(event) {
    setPetPersonality(event.target.value)
    console.log(event.target.value)
  }

  function adopt() {
    console.log('adopted pet!')
    authAxios.post('/api/pet', {name: petName, personality: petPersonality})
        .then((res) => {
            console.log(res)
        })
    console.log(accessToken)
  }

  return (
    <div>
      {/* <h1>Your quote: {quote || "YOU DO NOT HAVE A GOT DANG QUOTE!!!"}</h1>
      <form onSubmit={updateQuote}>
        <input
          type="text"
          placeholder="quote"
          name="quote"
          value={tempQuote}
          onChange={setValue}
        ></input>
        <input type="submit" value="update quote"></input>
      </form>
      <br/> */}
      <h2>Generate a random pet and adopt it!</h2>
      <input type="text" placeholder="pet name" name="name" value={petName} onChange={handlePetNameChange}></input>
      <select onChange={handlePetPersonalityChange} value={petPersonality}>
        <option value="brave">Brave</option>
        <option value="intelligent">Intelligent</option>
        <option value="mischevious">Mischevious</option>
      </select>
      <button onClick={adopt}>Adopt!</button>
    </div>
  );
}

export default Dashboard;
