import React, { useRef, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./CrewForm.css";
import { getCroniesByCrew, updateCrony } from "../../modules/CronyManager";
import { getCrewWithHideoutById } from "../../modules/CrewManager";
import { getHideoutById } from "../../modules/HideoutManager";
import { getHeistsByCrew } from "../../modules/HeistManager";
import { DetailsCronyCard } from "./DetailsCronyCard";
import { DetailsHeistCard } from "./DetailsHeistCard";

//----------------------------------------------BROUGHT TO YOU BY HOUSTON SMITH---------------------------------------------------------//

export const CrewDetails = () => {


//----------------------------------------PULLS THE CURRENT USER ID FROM SESSION STORAGE-------------------------------------------------//

  let userObj = JSON.parse(sessionStorage.getItem("nutshell_user"));
  let currentUser = userObj.id;


//----------------------------------------OBTAINS THE CURRENT CREW ID WITH USE PARAMS-------------------------------------------------//

  const {crewId} = useParams();


//----------------------------------------DEFINE navigate AS useNavigate FOR FUTURE USE--------------------------------------------------//  

  const navigate = useNavigate()


//-------------------------------------SET EMPTY CRONIES, CREW, AND HEISTS ARRAYS---------------------------------------------------------//

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
    //Pull Crew array for the active user from API...
    return getCrewWithHideoutById(crewId).then(crew => {
      //...then populate empty crew array with what comes back.
      setCrew(crew)
    })
  }

  const getHeists = () => {
    //Pull Heists array for the active user from API...
    return getHeistsByCrew(crewId).then(heists => {
      //...then populate empty heists array with what comes back.
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


//--------------CHANGES A CRONIES crewID TO 1 TO REMOVE THEM FROM THE CREW AND CHANGE THEM TO CREWLESS-----------------------------------------------//

const callFireCrony = (crony) => {

  const editedCrony = {
    id: crony.id,
    userId: crony.userId,
    crewId: "1",
    name: crony.name,
    species: crony.species,
    skill1: crony.skill1,
    skill2: crony.skill2,
    additionalSkills: crony.additionalSkills,
    pay: crony.pay
  };

updateCrony(editedCrony)
  .then(() => getCronies()
  )
}


 //--------------------------------GENERATE HTML FOR HIDEOUTS PAGE AND GENERATE HIDEOUT CARDS------------------------------------------------// 

  return (
    <main>
      <section className="crews-details-box">

        <section className="crews-details-header">
          <button type="button" className="btn btn-primary" onClick={() => {navigate("/crews")}}>Return to Crews</button>
          <h1>{crew.name} Details</h1>
        </section>

        <section className="crews-details-text">
          <p>{crew.hideout?.name}</p>
          <p>{crew.description}</p>
          <section className="crews-details-members">
            <h2>Crew Members:</h2>
            <button type="button" className="btn btn-primary" onClick={() => {navigate(`/crews/${crew.id}/addcronies`)}}>Add Members</button>
          </section>
        </section>

        <section className="crews-crony-card-container">
          {cronies.map(crony =>
            <DetailsCronyCard key={crony.id} crony={crony} callFireCrony={callFireCrony}/>
          )}
        </section>
        
        <section className="crews-heist-text">
          <h2>Assigned Heists:</h2>
        </section>
        <section className="crews-heist-card-container">
          {heists.map(heist =>
            <DetailsHeistCard key={heist.id} heist={heist}/>
          )}
        </section>
      </section>
    </main>
  );
}