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
  const names = ['Abigail', 'Adam', 'Angel', 'Aires', 'Ben', 'Bandit', 'Bryce', 'Belle', 'Bambi', 'Chelle', 'Cam', 'Cal', 'Darius', 'Daisy', 'Elle', 'Eddie', 'Faye', 'Fredrick', 'Greg', 'Gladys', 'Henry', 'Hazel', 'Indy', 'Izzy', 'Ivory', 'Jackie', 'Jackson', 'Jerry', 'Kari', 'Kendell', 'Lindsey', 'Liam', 'Lucky', 'Max', 'Molly', 'Natasha', 'Namor', 'Oskar', 'Olly', 'Peanut', 'Penny', 'Pearl', 'Quincy', 'Quinn', 'Riri', 'Ray', 'Sara', 'Shelly', 'Sky', 'Simon', 'Trent', 'Trinity', 'Uly', 'Varys', 'Vivian', 'Wendy', 'Wes', 'Wrinkles', 'Xavier', 'Xeon', 'Yin', 'Yang', 'Yelp', 'Zeke', 'Zeus', 'Zell']
  let decodedToken;


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
      if (decodedToken.exp * 1000 < Date.now()) {
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
    const confirmation = window.confirm('Are you sure you want to create?')

    if (confirmation) {
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
        });
      
    } 
  }

  function navigateToPet() {
    navigate('/view-pet')
  }

  function getNames() {
    return names.map((name) => {
      return <option value={name}>{name}</option>
    })
  }

  return (
    <div className="dashboard-container">
      <h2>Create a pet!</h2>
      <h3>Name</h3>
      <select onChange={handlePetNameChange} value={petName} className='dashboard-container-name'>
      {getNames()}
      </select>
      <br />
      <h3>Personality</h3>
      <select onChange={handlePetPersonalityChange} value={petPersonality}>
        <option defaultValue="calm">Calm</option>
        <option value="brave">Brave</option>
        <option value="intelligent">Intelligent</option>
        <option value="mischevious">Mischevious</option>
      </select>
      <br />
      <div className="pet-image-select">
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
