import React, { useRef, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./Crews.css";
import { getCroniesOfActiveUser, updateCrony } from "../../modules/CronyManager";
import { CronyAddCard } from "./CronyAddCard";

//----------------------------------------------BROUGHT TO YOU BY HOUSTON SMITH---------------------------------------------------------//

export const CronyQuickAdd = () => {


//----------------------------------------PULLS THE CURRENT USER ID FROM SESSION STORAGE-------------------------------------------------//

  let userObj = JSON.parse(sessionStorage.getItem("nutshell_user"));
  let currentUser = userObj.id;


//----------------------------------------DEFINE navigate AS useNavigate FOR FUTURE USE--------------------------------------------------//  

  const navigate = useNavigate()


//----------------------------------------OBTAINS THE CURRENT CREW ID WITH USE PARAMS-------------------------------------------------//

const {crewId} = useParams();


//---------------------------------------------------SET EMPTY CRONIES AND CREWS ARRAYS----------------------------------------------------//

  const [cronies, setCronies] = useState([])
  

//-----------------------------POPULATE EMPTY CRONIES AND CREWS ARRAYS WITH OBJECTS FROM THE API----------------------------------------------//

const getCrewlessCronies = (crewId) => {
  
  return getCroniesOfActiveUser(currentUser)
    .then(cronies =>
      cronies.filter(crony => crony.crewId === "1"))
  
}

  const getCronies = () => {
    //Pull Cronies array for the active user from API...
    return getCrewlessCronies(currentUser).then(cronies => {
      //...then populate empty cronies array with what comes back.
      setCronies(cronies)
    })
  }



//----------------------------------------RUN getCronies AND getCrews FUNCTIONS AFTER FIRST RENDER------------------------------------------//

useEffect(() => {
  getCronies()
}, [])


//-------------UPDATES THE CREW WITH A DUPLICATE THAT HAS THE SAME PROPERTIES OTHER THAN ONES THAT WERE CHANGED---------------------------//

const addCrony = (crony) => {

//Create a new object identical to crew with updated properties 
const editedCrony = {
	id: crony.id,
	userId: crony.userId,
	crewId: crewId,
	name: crony.name,
	species: crony.species,
	skill1: crony.skill1,
	skill2: crony.skill2,
	additionalSkills: crony.additionalSkills,
	pay: crony.pay
};
		updateCrony(editedCrony)
			.then(() => getCronies())
} 


 //--------------------------------GENERATE HTML FOR HIDEOUTS PAGE AND GENERATE HIDEOUT CARDS------------------------------------------------// 

  return (
    <main>
      <section className="friend-header">
      <fieldset>
				<div className="form-group">
					<label htmlFor="crew">Add Cronies:</label>
				</div>
			</fieldset>
        <h1>Crony List</h1>
        <button type="button" className="btn btn-primary" onClick={() => {navigate(`/crews/${crewId}/details`)}}>Back to Crew</button>
      </section>
      <section className="card-container">
        {cronies.map(crony =>
          <CronyAddCard key={crony.id} crony={crony} addCrony={addCrony}/>
        )}
      </section>
    </main>
  );
}