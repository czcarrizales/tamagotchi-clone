import { useEffect, useState } from "react";
import axios from "axios";
import jwtDecode from "jwt-decode";
import "../styles/ViewPet.css";
import { useNavigate } from "react-router-dom";

function ViewPet({userData, getUserData, handleDataChange}) {
  const token = localStorage.getItem("token");
  let decodedToken;
  const [petData, setPetData] = useState();
  const [happiness, setHappiness] = useState()
  const [hunger, setHunger] = useState()
  const [personality, setPersonality] = useState()
  const navigate = useNavigate();


  useEffect(() => {
    if (token) {
      decodedToken = jwtDecode(token, 'token')
      if (decodedToken.exp * 1000 < Date.now()) {
        localStorage.removeItem('token')
        navigate('/login')
      }
    } else {
      navigate('/login')
    }
  }, [])

  const authAxios = axios.create({
    baseUrl: "https://tamagotchi-clone-api.onrender.com/",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  useEffect(() => {
    authAxios.get(`https://tamagotchi-clone-api.onrender.com/api/pet`).then((req, res) => {
      if (req.data.pet === null) {
        navigate('/create-pet')
      } else {
        setPetData(req.data.pet);
        setHappiness(req.data.pet.happiness)
        setHunger(req.data.pet.hunger)
        setPersonality(req.data.pet.personality)
      }
      console.log(req)
      
    });
  }, []);

  function putUpForAdoption() {
    const confirmation = window.confirm(`Are you sure you want to put ${petData.name} up for adoption?`)

    if (confirmation) {
      authAxios.put("https://tamagotchi-clone-api.onrender.com/api/pet").then((req, res) => {
        console.log(req);
        console.log("put up your pet for adoption!");
      handleDataChange('data changed from view-pet')
      getUserData()
      navigateToAdoptPage()
      });
      
    }

    
  }

  function raiseHunger() {
    authAxios
      .put("https://tamagotchi-clone-api.onrender.com/raise-hunger", { _id: petData._id })
      .then((req, res) => {
        setHunger(req.data.hunger)
      });
  }

  function raiseHappiness() {
    authAxios
      .put("https://tamagotchi-clone-api.onrender.com/raise-happiness", { _id: petData._id })
      .then((req, res) => {
        setHappiness(req.data.happiness)
      })
  }

  function navigateToAdoptPage() {
    navigate('/adopt')
  }

  return (
    <div className="view-pet-container">
      {petData && (
        <div className="view-pet-inner-container">
          <div className="pet-details">
          <h1>{petData.name}</h1>
          <img src={petData.imageSrc}></img>
          <div className="pet-stats-container">
            <div className="pet-stat">
              <span className="pet-stat-heart">❤</span>
              {happiness}
            </div>
            <div className="pet-stat">
              <span>🍭</span>
              {hunger}
            </div>
          </div>
          </div>
          <br />
          <span>{petData.name} is feeling {personality}.</span>
          <br></br>
          {happiness <= 100 && happiness >= 80 && <span>{petData.name} is happy!</span>}
          {happiness < 80 && happiness >= 50 && <span>{petData.name} is okay.</span> }
          {happiness >= 25 && happiness < 50 && <span>{petData.name} is lonely!</span>}
          {happiness >= 0 && happiness < 25 && <span>{petData.name} is neglected!!!</span>}
          <br></br>
          {hunger === 100 && <span>{petData.name} is full!</span>}
          {hunger > 75 && hunger < 100 && <span>{petData.name} could eat, but they are okay! </span>}
          {hunger <= 75 && hunger >= 50 && <span>{petData.name} is a bit hungry.</span> }
          {hunger >= 25 && hunger < 50 && <span>{petData.name} is very hungry!</span>}
          {hunger >= 0 && hunger < 25 && <span>{petData.name} is starving!!!</span>}
          <div className="view-pet-buttons-container">
            <button onClick={raiseHappiness}>play!</button>
            <button onClick={raiseHunger}>feed</button>
            <button onClick={putUpForAdoption}>put up for adoption</button>
          </div>
        </div>
      )}
      {petData == undefined && <p>Loading...</p>}
    </div>
  );
}

export default ViewPet;
