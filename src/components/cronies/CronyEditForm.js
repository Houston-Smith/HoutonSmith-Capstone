import React, { useState, useEffect } from "react";
import {useNavigate, useParams} from "react-router-dom";
import { getCronyById, updateCrony } from "../../modules/CronyManager";
import { getCrewsOfActiveUser } from "../../modules/CrewManager";
import { getAllSkills } from "../../modules/SkillManager";
import "./CronyForm.css";

export const CronyEditForm = () => {

//-----------------------------------------------SET ISLOADING----------------------------------------------------------------------------//	

  const [isLoading, setIsLoading] = useState(false);


//-------------------------------------SAVE cronyID AS A VARIABLE USING useParams---------------------------------------------------------//
		
  const {cronyId} = useParams();


//----------------------------------------DEFINE navigate AS useNavigate FOR FUTURE USE--------------------------------------------------//

  const navigate = useNavigate();


//-------------------------------------SAVE THE CURRENT USER'S ID AND OBJECT AS VARIABLES------------------------------------------------//	

	let userObj = JSON.parse(sessionStorage.getItem("nutshell_user"))
	let currentUser = userObj.id;


//-----------------------------------------SET EMPTY CREWS, SKILLS, AND CRONY ARRAYS-----------------------------------------------------//

  const [crews, setCrews] = useState([])
  const [skills, setSkills] = useState([])
	const [crony, setCrony] = useState({ name: "", species: "", skills: "", pay: 0 });


//-----------------------------------POPULATE EMPTY CREWS ARRAY WITH OBJECTS FROM THE API----------------------------------------------//

const getCrews = () => {
	//Pull Crews array for the active user from API...
	return getCrewsOfActiveUser(currentUser).then(crews => {
		//...then populate empty crews array with what comes back.
		setCrews(crews)
	})
}

const getSkills = () => {
	//Pull Skills array for the active user from API...
	return getAllSkills().then(skills => {
		//...then populate empty skills array with what comes back.
		setSkills(skills)
	})
}


//----------------------------------RUN getCrews and getSkills getCronyById FUNCTIONs AFTER FIRST RENDER--------------------------------------//

useEffect(() => {
getCrews()
}, [])

useEffect(() => {
  getSkills()
    }, [])

useEffect(() => {
	getCronyById(cronyId)
		.then(crony => {
			setCrony(crony);
			setIsLoading(false);
		});
}, []);
		

//-----------------------------------------RE-RENDER AND DISPLAY VALUES WHEN A FIELD CHANGES-----------------------------------------------//

const handleFieldChange = evt => {
	//create a copy of the crony object
	const stateToChange = { ...crony };
	// forms always provide values as strings. But we want to save the ids as numbers.
	if (evt.target.id.includes("Id")) {
		evt.target.value = parseInt(evt.target.value)
	}
	//Change the property of the input field to a new value
	stateToChange[evt.target.id] = evt.target.value;
	//Update state
	setCrony(stateToChange);
};


//-------------UPDATES THE CREW WITH A DUPLICATE THAT HAS THE SAME PROPERTIES OTHER THAN ONES THAT WERE CHANGED---------------------------//

const updateExistingCrony = evt => {
	evt.preventDefault()
	setIsLoading(true);

//Create a new object identical to crew with updated properties 
const editedCrony = {
	id: cronyId,
	userId: crony.userId,
	crewId: crony.crewId,
	name: crony.name,
	species: crony.species,
	skill1: crony.skill1,
	skill2: crony.skill2,
	additionalSkills: crony.additionalSkills,
	pay: crony.pay
};

	//Display error message if name input field is left empty
	if (editedCrony.name === "") {
		window.alert("Please input a name for your Crony")

		//Display error message if species input field is left empty
	} else if (editedCrony.species === "") {
		window.alert("Please input a description for your Crony")

	}	else if (editedCrony.skill1 === editedCrony.skill2 && editedCrony.skill1 != "" && editedCrony.skill2 != "") {
			window.alert("Can't select the same skill twice")

	} else if (editedCrony.pay === 0) {
		window.alert("You need to pay your cronies, cheapskate")
	
	} else if (editedCrony.crewId === "") {
		crony.crewId = 1	
			
	} else {
		//Invoke updateCrony passing editdCrony as an argument
		//Navigate back to crews page
		updateCrony(editedCrony)
			.then(() => navigate("/cronies"))
	} 
}


//-----------------------------------------------SENDS USER BACK TO CREWS PAGE----------------------------------------------------------------//

const ClickCancel = (event) => {
	navigate("/cronies")
}


//---------------------------------------------GENERATES HTML FOR CRONY EDIT FORM----------------------------------------------------------------//

  return (
    <>
		<main>
			<section className="crony-form-box">
					<form className="crony-form-edit">

					<h2>Edit a Crony</h2>

					<fieldset>
						<div className="form-group-crony">
							<label htmlFor="name">Crony Name:</label>
							<input type="text" id="name" onChange={handleFieldChange} required autoFocus className="form-control" placeholder="Crony name" value={crony.name} />
						</div>
					</fieldset>

					<fieldset>
						<div className="form-group-crony">
							<label htmlFor="species">Crony Description:</label>
							<select type="text" id="species" onChange={handleFieldChange} required className="form-control" placeholder="Crony Description" value={crony.species} >
								<option disabled hidden value="">Select a Description</option>
								<option value="Goblin">Goblin</option>
								<option value="Kenku">Kenku</option>
								<option value="Kobold">Kobold</option>
							</select>
						</div>
					</fieldset>

					<fieldset>
						<div className="form-group-crony">
							<label htmlFor="skills">Special Skills:</label>
							<select value={crony.skill1} name="skill1" id="skill1" onChange={handleFieldChange} className="form-control" >
								<option disabled hidden value="">Select a skill</option>
								<option value="">None</option>
								{skills.map(s => (
								<option key={s.id} value={s.name}>
										{s.name}
								</option>
								))}
							</select>
						</div>
					</fieldset>

					<fieldset>
						<div className="form-group-crony">
							<label htmlFor="skills">Special Skills:</label>
							<select value={crony.skill2} name="skill2" id="skill2" onChange={handleFieldChange} className="form-control" >
								<option disabled hidden value="">Select a skill</option>
								<option value="">None</option>
								{skills.map(s => (
								<option key={s.id} value={s.name}>
										{s.name}
								</option>
								))}
							</select>
						</div>
					</fieldset>

					<fieldset>
						<div className="form-group-crony">
							<label htmlFor="additionalSkills">Additional Skills:</label>
							<input type="text" id="additionalSkills" onChange={handleFieldChange} required className="form-control" placeholder="Additional Skills" value={crony.additionalSkills} />
						</div>
					</fieldset>

					<fieldset>
						<div className="form-group-crony">
							<label htmlFor="name">Crony Pay:</label>
							<input type="number" id="pay" onChange={handleFieldChange} required className="form-control" placeholder="Crony Pay" value={crony.pay} />
						</div>
					</fieldset>

					<fieldset>
						<div className="form-group-crony">
							<label htmlFor="crew">Assign to crew:</label>
							<select value={crony.crewId} name="crewId" id="crewId" onChange={handleFieldChange} className="form-control" >
								<option disabled hidden value="">Select a crew</option>
								<option value="1">None</option>
								{crews.map(c => (
								<option key={c.id} value={c.id}>
										{c.name}
								</option>
								))}
							</select>
						</div>
					</fieldset>

					<div className="buttons">
						<button type="button" disabled={isLoading} className="btn btn-primary"
							onClick={updateExistingCrony}>
							Update
								</button>

								<button type="button" disabled={isLoading} className="btn btn-primary"
							onClick={ClickCancel}>
							Cancel
								</button>   
					</div>
				</form>
			</section>	
		</main>
  </>
  );
}