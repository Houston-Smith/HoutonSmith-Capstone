import React, { useRef, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Cronies.css";
import { CronyCard } from "./CronyCard";
import { deleteCrony, getCroniesOfActiveUser } from "../../modules/CronyManager";

//----------------------------------------------BROUGHT TO YOU BY HOUSTON SMITH---------------------------------------------------------//

export const Cronies = () => {


//----------------------------------------PULLS THE CURRENT USER ID FROM SESSION STORAGE-------------------------------------------------//

  let userObj = JSON.parse(sessionStorage.getItem("nutshell_user"));
  let currentUser = userObj.id;


//----------------------------------------DEFINE navigate AS useNavigate FOR FUTURE USE--------------------------------------------------//  

  const navigate = useNavigate()


//---------------------------------------------------SET EMPTY CRONIES ARRAY-------------------------------------------------------------//

  const [cronies, setCronies] = useState([])

  

//-----------------------------------POPULATE EMPTY CRONIES ARRAY WITH OBJECTS FROM THE API----------------------------------------------//

  const getCronies = () => {
    //Pull Cronies array for the active user from API...
    return getCroniesOfActiveUser(currentUser).then(cronies => {
      //...then populate empty cronies array with what comes back.
      setCronies(cronies)
    })
  }


//------------------------------------------RUN getCronies FUNCTION AFTER FIRST RENDER---------------------------------------------------//

useEffect(() => {
  getCronies()
}, [])

//--------------------------------------------CALLS THE deleteCrony FUNCTION-------------------------------------------------------------//

const callDeleteCrony = (id) => {
  deleteCrony(id)
  .then(() => getHideouts())
};


 //--------------------------------GENERATE HTML FOR HIDEOUTS PAGE AND GENERATE HIDEOUT CARDS------------------------------------------------// 

  return (
    <main>
      <section className="friend-header">
        <h1>Crony List</h1>
        <button type="button" className="btn btn-primary" onClick={() => {navigate("/hideouts/add")}}>Create Hideouts</button>
      </section>
      <section className="card-container">
        {cronies.map(crony =>
          <CronyCard key={crony.id} crony={crony} callDeleteCrony={callDeleteCrony}/>
        )}
      </section>
    </main>
  );
}