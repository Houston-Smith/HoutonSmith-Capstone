import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { addCrony } from "../../modules/CronyManager";
import { getCrewsOfActiveUser } from "../../modules/CrewManager";
import { getAllSkills } from "../../modules/SkillManager";
import "./CronyForm.css";


//----------------------------------------------BROUGHT TO YOU BY HOUSTON SMITH---------------------------------------------------------//

export const CronyForm = () => {


	//-------------------------------------SAVE THE CURRENT USER'S ID AND OBJECT AS VARIABLES------------------------------------------------//	

	let userObj = JSON.parse(sessionStorage.getItem("nutshell_user"))
	let currentUser = userObj.id;

	//----------------------------------------DEFINE navigate AS useNavigate FOR FUTURE USE--------------------------------------------------//

	const navigate = useNavigate()


	//----------------------------------SET HIDEOUTS AND CURRENT CURRENT HIDEOUT ARRAYS WITH EMPTY KEYS---------------------------------------//

	const [crony, setCrony] = useState({
		managerId: currentUser,
		crewId: "0",
		name: "",
		species: "",
		skill1: "",
		skill2: "",
		additionalSkills: "",
		pay: 0,
	})


//---------------------------------------------------SET EMPTY CREWS ARRAY-------------------------------------------------------------//

  const [crews, setCrews] = useState([])
	const [skills, setSkills] = useState([])



//-----------------------------------POPULATE EMPTY CREWS ARRAY WITH OBJECTS FROM THE API----------------------------------------------//

const getCrews = () => {
	//Pull Crews array for the active user from API...
	return getCrewsOfActiveUser(currentUser).then(crews => {
		//...then populate empty crews array with what comes back.
		setCrews(crews)
	})
}

const getSkills = () => {
	//Pull Crews array for the active user from API...
	return getAllSkills().then(skills => {
		//...then populate empty crews array with what comes back.
		setSkills(skills)
	})
}

//------------------------------------------RUN getCrews FUNCTION AFTER FIRST RENDER---------------------------------------------------//

useEffect(() => {
getCrews()
}, [])

useEffect(() => {
	getSkills()
	}, [])

	//-----------------------------------------RE-RENDER AND DISPLAY VALUES WHEN A FIELD CHANGES-----------------------------------------------//

	const handleControlledInputChange = (event) => {
		//Create a copy of the friend array
		const newCrony = { ...crony }
		//target the value of the input field
		let selectedVal = event.target.value
		// forms always provide values as strings. But we want to save the ids as numbers.
		if (event.target.id.includes("Id")) {
			selectedVal = parseInt(selectedVal)
		}

		//Change the property of the input field to a new value
		newCrony[event.target.id] = selectedVal
		// update state
		setCrony(newCrony)
	}


	//---------------------------------CALL addFriend FUNCTION AND NAVIGATE BACK TO HIDEOUT PAGE ON BUTTON CLICK----------------------------//

	const ClickAddCrony = (event) => {
		//Prevents the browser from submitting the form
		event.preventDefault()
		//Saves crony name, species, and skills in variables
		const cronyName = crony.name
    const cronySpecies = crony.species
		const cronySkill1 = crony.skill1
		const cronySkill2 = crony.skill2
		const cronyPay = crony.pay
		const crewId = crony.crewId
		let newCrony = { ...crony }
	

			//Display error message if name input field is left empty
		if (cronyName === "") {
			window.alert("Please input a name for your Crony")

			//Display error message if species input field is left empty
		} else if (cronySpecies === "") {
			window.alert("Please input a description for your Crony")

		}	else if (cronySkill1 === cronySkill2) {
				window.alert("Can't select the same skill twice")
		
		}	else if (cronySkill1 === crony.additionalSkills) {
				window.alert("Can't select the same skill twice")
		
		}	else if (cronySkill2 === crony.additionalSkills) {
				window.alert("Can't select the same skill twice")		

		} else if (cronyPay === 0 && cronyPay < 0) {
			window.alert("You need to pay your cronies, cheapskate")
		
		} else if (crewId === "") {
			crewId.id = 0	
				
		} else {
			//Invoke addCrony passing hideout as an argument
			//Navigate back to crews page
			addCrony(newCrony)
				.then(() => navigate("/cronies"))
		} 
	}


	//----------------------------------------CANCELS FORM AND NAVIGATES BACK TO HIDEOUT PAGE------------------------------------------------//

	const ClickCancel = (event) => {
		navigate("/cronies")
	}


	//----------------------------------------------GENERATE HTML FOR NEW HIDEOUT FORM-------------------------------------------------------//

	return (
		<form className="friendForm">
			<h2>Hire Crony</h2>

			<fieldset>
				<div className="form-group">
					<label htmlFor="name">Crony Name:</label>
					<input type="text" id="name" onChange={handleControlledInputChange} required autoFocus className="form-control" placeholder="Crony name" value={crony.name} />
				</div>
			</fieldset>

			<fieldset>
				<div className="form-group">
					<label htmlFor="species">Crony Description:</label>
					<select type="text" id="species" onChange={handleControlledInputChange} required className="form-control" placeholder="Crony Description" value={crony.species} >
						<option disabled hidden value="">Select a Description</option>
						<option value="Goblin">Goblin</option>
						<option value="Kenku">Kenku</option>
						<option value="Kobold">Kobold</option>
					</select>
				</div>
			</fieldset>

			<fieldset>
				<div className="form-group">
					<label htmlFor="skills">Special Skills:</label>
					<select value={crony.skill1} name="skill1" id="skill1" onChange={handleControlledInputChange} className="form-control" >
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
				<div className="form-group">
					<label htmlFor="skills">Special Skills:</label>
					<select value={crony.skill2} name="skill2" id="skill2" onChange={handleControlledInputChange} className="form-control" >
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
				<div className="form-group">
					<label htmlFor="additionalSkills">Additional Skills:</label>
					<input type="text" id="additionalSkills" onChange={handleControlledInputChange} required className="form-control" placeholder="Additional Skills" value={crony.additionalSkills} />
				</div>
			</fieldset>

			<fieldset>
				<div className="form-group">
					<label htmlFor="name">Crony Pay:</label>
					<input type="number" id="pay" onChange={handleControlledInputChange} required className="form-control" placeholder="Crony Pay" value={crony.pay} />
				</div>
			</fieldset>

			<fieldset>
				<div className="form-group">
					<label htmlFor="crew">Assign to crew:</label>
					<select value={crony.crewId} name="crewId" id="crewId" onChange={handleControlledInputChange} className="form-control" >
						<option disabled hidden value="">Select a crew</option>
						<option value="0">None</option>
						{crews.map(c => (
						<option key={c.id} value={c.id}>
								{c.name}
						</option>
						))}
					</select>
				</div>
			</fieldset>

			<div className="buttons">
				<button type="button" className="btn btn-primary"
					onClick={ClickAddCrony}>
					Hire Crony
				</button>
				<button type="button" className="btn btn-primary"
					onClick={ClickCancel}>
					Cancel
				</button>
			</div>
		</form>
	)
}