import { useEffect, useState } from "react";
import jwtDecode from "jwt-decode";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();
  const [quote, setQuote] = useState("");
  const [tempQuote, setTempQuote] = useState("");

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

  return (
    <div>
      <h1>Your quote: {quote || "YOU DO NOT HAVE A GOT DANG QUOTE!!!"}</h1>
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
    </div>
  );
}

export default Dashboard;
