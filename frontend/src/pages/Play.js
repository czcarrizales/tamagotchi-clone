import { useEffect, useState } from "react";
import axios from "axios";
import jwtDecode from "jwt-decode";

function Play() {
  const token = localStorage.getItem("token");
  const decodedToken = jwtDecode(token);
  const [petData, setPetData] = useState();

  const authAxios = axios.create({
    baseUrl: "https://tamagotchi-clone-api.onrender.com/",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  useEffect(() => {
    authAxios.get(`https://tamagotchi-clone-api.onrender.com/api/pet`).then((req, res) => {
      console.log("got pet!");
      console.log(req.data.pet, "request");
      setPetData(req.data.pet);
      console.log(res);
      console.log(petData, "pet data!");
    });
  }, []);

  async function raiseHappiness() {
    await authAxios
      .put("https://tamagotchi-clone-api.onrender.com/raise-happiness", { _id: petData._id })
      .then((req, res) => {
        try {
            console.log('raised!')
        } catch {
            console.log('something went wrong')
        }
      });
  }

  return (
    <div>
      <h1>Play with your pet here!</h1>
      {petData && (
        <div>Your pet's happiness is currently at {petData.happiness}</div>
      )}
      <button onClick={raiseHappiness}>Click to raise happiness!</button>
    </div>
  );
}

export default Play;
