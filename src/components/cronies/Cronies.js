import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Cronies.css";
import { CronyCard } from "./CronyCard";
import { deleteCrony, getCroniesOfActiveUser, getCroniesByCrew } from "../../modules/CronyManager";
import { getCrewsOfActiveUser } from "../../modules/CrewManager";

//----------------------------------------------BROUGHT TO YOU BY HOUSTON SMITH---------------------------------------------------------//

export const Cronies = () => {


//----------------------------------------PULLS THE CURRENT USER ID FROM SESSION STORAGE-------------------------------------------------//

  let userObj = JSON.parse(sessionStorage.getItem("nutshell_user"));
  let currentUser = userObj.id;


//----------------------------------------DEFINE navigate AS useNavigate FOR FUTURE USE--------------------------------------------------//  

  const navigate = useNavigate()


//---------------------------------------------------SET EMPTY CRONIES AND CREWS ARRAYS----------------------------------------------------//

  const [cronies, setCronies] = useState([])
  const [crews, setCrews] = useState([])
  

//-----------------------------POPULATE EMPTY CRONIES AND CREWS ARRAYS WITH OBJECTS FROM THE API----------------------------------------------//

  const getCronies = () => {
    //Pull Cronies array for the active user from API...
    return getCroniesOfActiveUser(currentUser).then(cronies => {
      //...then populate empty cronies array with what comes back.
      setCronies(cronies)
    })
  }

  const getCrews = () => {
    //Pull Crews array for the active user from API...
    return getCrewsOfActiveUser(currentUser).then(crews => {
      //...then populate empty crews array with what comes back.
      setCrews(crews)
    })
  }


//----------------------------------------RUN getCronies AND getCrews FUNCTIONS AFTER FIRST RENDER------------------------------------------//

useEffect(() => {
  getCronies()
}, [])

useEffect(() => {
  getCrews()
}, [])

//--------------------------------------------CALLS THE deleteCrony FUNCTION-------------------------------------------------------------//

const callDeleteCrony = (id) => {
  deleteCrony(id)
  .then(() => getCronies())
};


//--------------------------------------------FILTERS CRONIES BY THEIR crewId-------------------------------------------------------------//

const cronyFilter = (crewId) => {
  
  return getCroniesOfActiveUser(currentUser)
    .then(cronies =>
      cronies.filter(crony => crony.crewId === crewId))
  
}


//-------------------------------FILTERS CRONIES BY CREW ID UNLESS NONE IS PROVIDED-------------------------------------------------------------//

const filterCronies = (event) => {

  // save the input as a variable
  let selectedVal = event.target.value
  // forms always provide values as strings. But we want to save the ids as numbers.
  if (event.target.id.includes("Id")) {
    selectedVal = parseInt(selectedVal)
  }
  //if selected value is not an empy string: Filter by the crew Id
  if (selectedVal != "") {
  cronyFilter(selectedVal)
    .then(cronies =>
    setCronies(cronies))

  //otherwise display all cronies
  } else {
    getCronies()
  } 
}


 //--------------------------------GENERATE HTML FOR HIDEOUTS PAGE AND GENERATE HIDEOUT CARDS------------------------------------------------// 

  return (
    <main>
      <section className="crony-box">
        <section className="crony-header">

        <fieldset>
          <div className="form-group-crony">
            <label htmlFor="crew">Filter Cronies:</label>
            <select name="crewFilter" id="crewFilter" onChange={filterCronies} className="form-control" >
              <option value="">All Cronies</option>
              <option value="1">Crewless Cronies</option>
              {crews.map(c => (
              <option key={c.id} value={c.id}>
                  {c.name}
              </option>
              ))}
            </select>
          </div>
        </fieldset>

          <h1>Crony List</h1>

          <button type="button" className="btn btn-primary" onClick={() => {navigate("/cronies/add")}}>Crony Applications</button>
        </section>

        <section className="card-container-crony">
          {cronies.map(crony =>
            <CronyCard key={crony.id} crony={crony} callDeleteCrony={callDeleteCrony}/>
          )}
        </section>

      </section>
    </main>
  );
}