import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { addCrony } from "../../modules/CronyManager";
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
		crewId: 0,
		name: "",
		species: "",
		skills: "",
		pay: 0,
	})


	//-----------------------------------------RE-RENDER AND DISPLAY VALUES WHEN A FIELD CHANGES-----------------------------------------------//

	const handleControlledInputChange = (event) => {
		//Create a copy of the friend array
		const newCrony = { ...crony }
		//target the value of the input field
		let selectedVal = event.target.value
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
		const cronySkills = crony.skills
		const cronyPay = crony.pay
		let newCrony = { ...crony }
	

			//Display error message if name input field is left empty
		if (cronyName === "") {
			window.alert("Please input a name for your Crony")

			//Display error message if species input field is left empty
		} else if (cronySpecies === "") {
			window.alert("Please input a description for your Crony")

			//Display error message if skills input field is left empty
		} else if (cronySkills === "") {
			window.alert("Please input the skills of your Crony")
				
		} else if (cronyPay === 0 && cronyPay < 0) {
			window.alert("You need to pay your cronies, cheapskate")
				
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
					<input type="text" id="species" onChange={handleControlledInputChange} required className="form-control" placeholder="Crony Description" value={crony.species} />
				</div>
			</fieldset>

			<fieldset>
				<div className="form-group">
					<label htmlFor="skills">Crony Skillsets:</label>
					<input type="text" id="skills" onChange={handleControlledInputChange} required className="form-control" placeholder="Crony skills" value={crony.skills} />
				</div>
			</fieldset>

			<fieldset>
				<div className="form-group">
					<label htmlFor="name">Crony Pay:</label>
					<input type="number" id="pay" onChange={handleControlledInputChange} required className="form-control" placeholder="Crony Pay" value={crony.pay} />
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