import { useEffect, useState } from "react";
import axios from "axios";
import jwtDecode from "jwt-decode";
import "../styles/ViewPet.css";
import { useNavigate } from "react-router-dom";

function ViewPet() {
  const token = localStorage.getItem("token");
  const decodedToken = jwtDecode(token);
  const [petData, setPetData] = useState();
  const navigate = useNavigate();

  const authAxios = axios.create({
    baseUrl: "http://localhost:5000",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  useEffect(() => {
    authAxios.get(`http://localhost:5000/api/pet`).then((req, res) => {
      setPetData(req.data.pet);
    });
  }, []);

  function putUpForAdoption() {
    const confirmation = window.confirm(`Are you sure you want to put ${petData.name} up for adoption?`)

    if (confirmation) {
      authAxios.put("http://localhost:5000/api/pet").then((req, res) => {
        console.log(req);
      });
      console.log("put up your pet for adoption!");
      navigateToAdoptPage()
    }

    
  }

  function raiseHunger() {
    authAxios
      .put("http://localhost:5000/raise-hunger", { _id: petData._id })
      .then((req, res) => {
        console.log(res);
        console.log("hunger raised!");
      });
    console.log("hunger raised!");
  }

  function raiseHappiness() {
    authAxios
      .put("http://localhost:5000/raise-happiness", { _id: petData._id })
      .then((req, res) => {
        console.log(req)
        console.log(res)
        console.log('raised happiness')
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
              {petData.happiness}
            </div>
            <div className="pet-stat">
              <span>🍭</span>
              {petData.hunger}
            </div>
          </div>
          </div>
          <br />
          <div className="view-pet-buttons-container">
            <button onClick={raiseHappiness}>play!</button>
            <button onClick={raiseHunger}>feed</button>
            <button onClick={putUpForAdoption}>put up for adoption</button>
          </div>
        </div>
      )}
      {petData == undefined && <div>You have no pets! Go adopt one!</div>}
    </div>
  );
}

export default ViewPet;
