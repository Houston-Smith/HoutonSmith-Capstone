import React, { useRef, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./CrewForm";
import { getCroniesByCrew } from "../../modules/CronyManager";
import { getCrewById } from "../../modules/CrewManager";
import { getHideoutById } from "../../modules/HideoutManager";
import { getHeistsByCrew } from "../../modules/HeistManager";
import { DetailsCronyCard } from "./DetailsCronyCard";
import { DetailsHeistCard } from "./DetailsHeistCard";

//----------------------------------------------BROUGHT TO YOU BY HOUSTON SMITH---------------------------------------------------------//

export const CrewDetails = () => {


//----------------------------------------PULLS THE CURRENT USER ID FROM SESSION STORAGE-------------------------------------------------//

  let userObj = JSON.parse(sessionStorage.getItem("nutshell_user"));
  let currentUser = userObj.id;


//----------------------------------------OBTAINS THE CURRENT CREW ID BY USING USE PARAMS-------------------------------------------------//

  const {crewId} = useParams();



//----------------------------------------DEFINE navigate AS useNavigate FOR FUTURE USE--------------------------------------------------//  

  const navigate = useNavigate()

//-------------------------------------SET EMPTY CRONIES, CREW, HEISTS, AND HIDEOUTS ARRAYS-----------------------------------------------//

  const [cronies, setCronies] = useState([])
  const [crew, setCrew] = useState({ name: "", });
  const [heists, setHeists] = useState([])

//-----------------------------------POPULATE EMPTY ARRAYS WITH OBJECTS FROM THE API------------------------------------------------------//

  const getCronies = () => {
    //Pull Cronies array for the active user from API...
    return getCroniesByCrew(crewId).then(cronies => {
      //...then populate empty cronies array with what comes back.
      setCronies(cronies)
    })
  }

  const getCrew = () => {
    //Pull Cronies array for the active user from API...
    return getCrewById(crewId).then(crew => {
      console.log(crew.hideout.name)
      console.log(crew.name)
      //...then populate empty cronies array with what comes back.
      setCrew(crew)
    })
  }

  const getHeists = () => {
    //Pull Cronies array for the active user from API...
    return getHeistsByCrew(crewId).then(heists => {
      //...then populate empty cronies array with what comes back.
      setHeists(heists)
    })
  }


//--------------------------RUN getCronies, getCrew, and getHideout FUNCTIONS AFTER FIRST RENDER-----------------------------------------------//

useEffect(() => {
  getCronies()
}, [])

useEffect(() => {
  getCrew()
}, [])


useEffect(() => {
  getHeists()
}, [])


 //--------------------------------GENERATE HTML FOR HIDEOUTS PAGE AND GENERATE HIDEOUT CARDS------------------------------------------------// 

  return (
    <main>
      <section className="friend-header">
        <button type="button" className="btn btn-primary" onClick={() => {navigate("/crews")}}>Return to Crews</button>
        <h1>{crew.name} Details</h1>
        <section className="card-container">
      </section>
        {/* <p>{crew.hideout.name}</p> */}
        <p>{crew.description}</p>
        <h2>Crew Members:</h2>
      </section>
      <section className="card-container">
        {cronies.map(crony =>
          <DetailsCronyCard key={crony.id} crony={crony}/>
        )}
      </section>
      <h2>Assigned Heists:</h2>
      <section className="card-container">
        {heists.map(heist =>
          <DetailsHeistCard key={heist.id} heist={heist}/>
        )}
      </section>
    </main>
  );
}