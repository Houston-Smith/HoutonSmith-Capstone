import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { addHeist, getHeistsOfActiveUser } from "../../modules/HeistManager";
import { getCrewsOfActiveUser } from "../../modules/CrewManager";

import "./HeistForm.css";


//----------------------------------------------BROUGHT TO YOU BY HOUSTON SMITH---------------------------------------------------------//

export const HeistForm = () => {


	//-------------------------------------SAVE THE CURRENT USER'S ID AND OBJECT AS VARIABLES------------------------------------------------//	

	let userObj = JSON.parse(sessionStorage.getItem("nutshell_user"))
	let currentUser = userObj.id;

	//----------------------------------------DEFINE navigate AS useNavigate FOR FUTURE USE--------------------------------------------------//

	const navigate = useNavigate()


	//---------------------------------------SET HEISTS ARRAY WITH EMPTY KEYS-----------------------====------------------//

	const [heist, setHeist] = useState({
		userId: currentUser,
		name: "",
		description: "",
		location: "",
		date: "",
		crewId: 0,
	})


	//---------------------------------------------------SET EMPTY HIDEOUTS ARRAY-------------------------------------------------------------//

  const [crews, setCrews] = useState([])


//-----------------------------------POPULATE EMPTY CREWS ARRAY WITH OBJECTS FROM THE API----------------------------------------------//

const getCrews = () => {
	//Pull Crews array for the active user from API...
	return getCrewsOfActiveUser(currentUser).then(crews => {
		//...then populate empty crews array with what comes back.
		setCrews(crews)
	})
}


//------------------------------------------RUN getCrews FUNCTION AFTER FIRST RENDER---------------------------------------------------//

useEffect(() => {
	getCrews()
}, [])


	//-----------------------------------------RE-RENDER AND DISPLAY VALUES WHEN A FIELD CHANGES-----------------------------------------------//

	const handleControlledInputChange = (event) => {
		//Create a copy of the friend array
		const newHeist = { ...heist }
		//target the value of the input field
		let selectedVal = event.target.value
		// forms always provide values as strings. But we want to save the ids as numbers.
		if (event.target.id.includes("Id")) {
			selectedVal = parseInt(selectedVal)
		}
		//Change the property of the input field to a new value
		newHeist[event.target.id] = selectedVal
		// update state
		setHeist(newHeist)
	}


	//---------------------------------CALL addCREW FUNCTION AND NAVIGATE BACK TO CREW PAGE ON BUTTON CLICK----------------------------//

	const ClickAddHeist = (event) => {
		//Prevents the browser from submitting the form
		event.preventDefault()
		//Saves crew name and description in variables
		const heistName = heist.name
    const heistDescription = heist.description
		const heistLocation = heist.location
		const heistDate = heist.date
		const crewId = heist.crewId
		let newHeist = { ...heist }

			//Display error message if name input field is empty
		if (heistName === "") {
			window.alert("Please input a name for your heist")

			//Display error message if description field is empty
		} else if (heistDescription === "") {
			window.alert("Please input a description for your heist")
			
				//Display error message if description field is empty
		} else if (heistLocation === "") {
			window.alert("Please input a location for your heist")
			
				//Display error message if description field is empty
		} else if (heistDate === "") {
			window.alert("Please input a time for your heist")
			
			//Display error message if description input field is empty
		} else if (crewId === 0) {
			window.alert("You need to assign a crew to your heist")	
				
		} else {
			//Invoke addHeist passing heist as an argument
			//Navigate back to crews page
			addHeist(newHeist)
				.then(() => navigate("/heists"))
		} 
	}


	//----------------------------------------CANCELS FORM AND NAVIGATES BACK TO CREW PAGE------------------------------------------------//

	const ClickCancel = (event) => {
		navigate("/heists")
	}


	//----------------------------------------------GENERATE HTML FOR NEW CREW FORM-------------------------------------------------------//

	return (
		<form className="friendForm">
			<h2>Plan a Heist</h2>

			<fieldset>
				<div className="form-group">
					<label htmlFor="name">Name:</label>
					<input type="text" id="name" onChange={handleControlledInputChange} required autoFocus className="form-control" placeholder="Heist name" value={heist.name} />
				</div>
			</fieldset>

			<fieldset>
				<div className="form-group">
					<label htmlFor="description">Description:</label>
					<input type="text" id="description" onChange={handleControlledInputChange} required className="form-control" placeholder="Heist description" value={heist.description} />
				</div>
			</fieldset>

			<fieldset>
				<div className="form-group">
					<label htmlFor="location">Location:</label>
					<input type="text" id="location" onChange={handleControlledInputChange} required className="form-control" placeholder="Heist location" value={heist.location} />
				</div>
			</fieldset>

			<fieldset>
				<div className="form-group">
					<label htmlFor="date">Date:</label>
					<input type="date" id="date" onChange={handleControlledInputChange} required className="form-control" placeholder="Heist date" value={heist.date} />
				</div>
			</fieldset>

			<fieldset>
				<div className="form-group">
					<label htmlFor="hideout">Assign Hideout:</label>
					<select value={heist.crewId} name="crewId" id="crewId" onChange={handleControlledInputChange} className="form-control" >
						<option disabled hidden value="0">Assign a Crew</option>
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
					onClick={ClickAddHeist}>
					Plan Heist
				</button>
				<button type="button" className="btn btn-primary"
					onClick={ClickCancel}>
					Cancel
				</button>
			</div>
		</form>
	)
}