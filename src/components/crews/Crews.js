import React, { useRef, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Crews.css";
import { CrewCard } from "./CrewCard";
import { getAllCrews, deleteCrew, getCrewsOfActiveUser } from "../../modules/CrewManager";

//----------------------------------------------BROUGHT TO YOU BY HOUSTON SMITH---------------------------------------------------------//

export const Crews = () => {


//----------------------------------------PULLS THE CURRENT USER ID FROM SESSION STORAGE-------------------------------------------------//

  let userObj = JSON.parse(sessionStorage.getItem("nutshell_user"));
  let currentUser = userObj.id;


//----------------------------------------DEFINE navigate AS useNavigate FOR FUTURE USE--------------------------------------------------//  

  const navigate = useNavigate()


//---------------------------------------------------SET EMPTY CREWS ARRAY-------------------------------------------------------------//

  const [crews, setCrews] = useState([])

  

//-----------------------------------POPULATE EMPTY CREWS ARRAY WITH OBJECTS FROM THE API----------------------------------------------//

  const getCrews = () => {
    //Pull Crews array for the active user from API...
    return getCrewsOfActiveUser().then(crews => {
      //...then populate empty crews array with what comes back.
      setCrews(crews)
    })
  }


//------------------------------------------RUN getCrews FUNCTION AFTER FIRST RENDER---------------------------------------------------//

useEffect(() => {
  getCrews()
}, [])

//--------------------------------------------CALLS THE deleteCrew FUNCTION-------------------------------------------------------------//

const callDeleteCrew = (id) => {
  deleteCrew(id)
  .then(() => getCrews())
};


 //--------------------------------GENERATE HTML FOR CREWS PAGE AND GENERATE FRIEND CARDS------------------------------------------------// 

  return (
    <main>
      <section className="friend-header">
        <h1>Crew List</h1>
        <button type="button" className="btn btn-primary" onClick={() => {navigate("/crews/add")}}>Create Crew</button>
      </section>
      <section className="card-container">
        {crews.map(crew =>
          <CrewCard key={crew.id} crew={crew} callDeleteCrew={callDeleteCrew}/>
        )}
      </section>
    </main>
  );
}