import { useEffect, useState } from "react";
import jwtDecode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/CreatePet.css";

function CreatePet({userData, handleDataChange, getUserData}) {
  const navigate = useNavigate();
  const [quote, setQuote] = useState("");
  const [userHasPet, setUserHasPet] = useState(false)
  const [tempQuote, setTempQuote] = useState("");
  const [petName, setPetName] = useState("");
  const [petPersonality, setPetPersonality] = useState("calm");
  const [petImage, setPetImage] = useState("");
  const accessToken = localStorage.getItem("token");
  let decodedToken;

  console.log(userData, 'user data from create pet')

  useEffect(() => {
    if (userData && userData.pet === null) {
      setUserHasPet(false)
    } else {
      navigate('/view-pet')
    }
    return () => {}
  }, [])

  useEffect(() => {
    if (accessToken) {
      decodedToken = jwtDecode(accessToken, 'token')
      console.log(decodedToken)
      if (decodedToken.exp * 1000 < Date.now()) {
        console.log('token is expired')
        localStorage.removeItem('token')
        navigate('/login')
      }
    } else {
      navigate('/login')
    }
  }, [])

  useEffect(() => {
    console.log('checking if user already has a pet')
  })

  axios.interceptors.request.use((config) => {
    config.headers.authorization = `Bearer ${accessToken}`;
    return config;
  });

  const authAxios = axios.create({
    baseURL: "https://tamagotchi-clone-api.onrender.com/",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const user = jwtDecode(token);
      if (!user) {
        localStorage.removeItem("token");
        navigate.replace("/login");
      } else {
        
      }
    }
  }, []);

  useEffect(() => {
    console.log(petPersonality, 'pet personality')
  }, [])

  function setValue(event) {
    setTempQuote(event.target.value);
    console.log(event);
    console.log(tempQuote);
  }

  function handlePetNameChange(event) {
    setPetName(event.target.value);
    console.log(event.target.value);
  }

  function handlePetPersonalityChange(event) {
    setPetPersonality(event.target.value);
    console.log(event.target.value, 'pet personality');
  }

  function handlePetImageChange(event) {
    setPetImage(event.target.value);
    console.log(event.target.value);
    console.log(petImage);
  }

  function adopt() {
    const confirmation = window.confirm('are you sure you wanna adopt?')

    if (confirmation) {
      console.log("adopted pet!");
      authAxios
        .post("/api/pet", {
          name: petName,
          personality: petPersonality,
          imageSrc: petImage,
        })
        .then((res) => {
          handleDataChange('data changed from create-pet')
          getUserData()
          navigateToPet()
          console.log(res);
        });
      
    } 
  }

  function navigateToPet() {
    navigate('/view-pet')
  }

  function confirmAdoption() {
    return (
      <div>
        hello my dear!
      </div>
    )
  }


  return (
    <div className="dashboard-container">
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
      <h2>Create a pet!</h2>
      <h3>Name</h3>
      <input
        type="text"
        placeholder="Name"
        name="name"
        value={petName}
        onChange={handlePetNameChange} className="dashboard-container-name"
      ></input>
      <br />
      <h3>Personality</h3>
      <select onChange={handlePetPersonalityChange} value={petPersonality}>
        <option defaultValue="calm">Calm</option>
        <option value="brave">Brave</option>
        <option value="intelligent">Intelligent</option>
        <option value="mischevious">Mischevious</option>
      </select>
      <br />
      <div>
        <h3>Select a pet </h3>
        <div>
          <input
            type="radio"
            value="images/fish.jpg"
            name="petBody"
            onChange={handlePetImageChange}
          ></input>
          <label>
            <img src="images/fish.jpg"></img>
          </label>
        </div>
        <div>
          <input
            type="radio"
            value="images/cat2.jpg"
            name="petBody"
            onChange={handlePetImageChange}
          ></input>
          <label>
            <img src="images/cat2.jpg"></img>
          </label>
        </div>
        <div>
          <input
            type="radio"
            value="images/dog2.jpg"
            name="petBody"
            onChange={handlePetImageChange}
          ></input>
          <label>
            <img src="images/dog2.jpg"></img>
          </label>
        </div>
      </div>
      <button onClick={() => {adopt()}}>Adopt!</button>
    </div>
  );
}

export default CreatePet;
