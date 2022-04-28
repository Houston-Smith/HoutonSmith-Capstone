import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { addHideout, getHideoutsOfActiveUser } from "../../modules/HideoutManager";
import "./HideoutForm.css";


//----------------------------------------------BROUGHT TO YOU BY HOUSTON SMITH---------------------------------------------------------//

export const HideoutForm = () => {


	//-------------------------------------SAVE THE CURRENT USER'S ID AND OBJECT AS VARIABLES------------------------------------------------//	

	let userObj = JSON.parse(sessionStorage.getItem("nutshell_user"))
	let currentUser = userObj.id;

	//----------------------------------------DEFINE navigate AS useNavigate FOR FUTURE USE--------------------------------------------------//

	const navigate = useNavigate()


	//----------------------------------SET HIDEOUTS AND CURRENT CURRENT HIDEOUT ARRAYS WITH EMPTY KEYS---------------------------------------//

	const [hideout, setHideout] = useState({
		userId: currentUser,
		name: "",
		description: "",
		location: "",
		isOcupied: false,
	})

	const [currentHideouts, setCurrentHideouts] = useState({})


	//------------------------------------POPULATE THE CURRENT HIDEOUTS ARRAY WITH HIDEOUTS FROM THE API---------------------------------------//	


  const getUsersHideouts = () => {
    //Pull Crews array for the active user from API...
    return getHideoutsOfActiveUser().then(hideouts => {
      //...then populate empty crews array with what comes back.
      setCurrentHideouts(hideouts)
    })
  }

	useEffect(() => {
		getUsersHideouts()
	}, []);

	//-----------------------------------------RE-RENDER AND DISPLAY VALUES WHEN A FIELD CHANGES-----------------------------------------------//

	const handleControlledInputChange = (event) => {
		//Create a copy of the hideout array
		const newHideout = { ...hideout }
		//target the value of the input field
		let selectedVal = event.target.value
		//Change the property of the input field to a new value
		newHideout[event.target.id] = selectedVal
		// update state
		setHideout(newHideout)
	}


	//---------------------------------CALL addHideout FUNCTION AND NAVIGATE BACK TO HIDEOUT PAGE ON BUTTON CLICK----------------------------//

	const ClickAddHideout = (event) => {
		//Prevents the browser from submitting the form
		event.preventDefault()
		//Saves hideout name description, and location in variables
		const hideoutName = hideout.name
    const hideoutDescription = hideout.description
		const hideoutLocation = hideout.location
		let newHideout = { ...hideout }
		//Checks the hideouts array for the current entry and saves it as a variable
		const isHideout = (currentHideouts.find(hideout => hideout.name === hideoutName))

			//Display error message if name input field is left empty
		if (hideoutName === "") {
			window.alert("Please input a name for your hideout")

			//Display error message if description input field is left empty
		} else if (hideoutDescription === "") {
			window.alert("Please input a description for your hideout")

			//Display error message if location input field is left empty
		} else if (hideoutLocation === "") {
			window.alert("Please input a location for your hideout")

			//Display error message if there is a hideout with that existing name or location
		} else if (isHideout != undefined) {
			
			if (hideoutName === isHideout.name) {
				window.alert("You already have a Hideout by this name")

			} else if (hideoutLocation === isHideout.location) {
				window.alert("You already have a Hideout in this location")

			} else {
				window.alert("Please input a name and description")
			}
				
		} else {
			//Invoke addHideout passing hideout as an argument
			//Navigate back to crews page
			addHideout(newHideout)
				.then(() => navigate("/hideouts"))
		} 
	}


	//----------------------------------------CANCELS FORM AND NAVIGATES BACK TO HIDEOUT PAGE------------------------------------------------//

	const ClickCancel = (event) => {
		navigate("/hideouts")
	}


	//----------------------------------------------GENERATE HTML FOR NEW HIDEOUT FORM-------------------------------------------------------//

	return (
		<form className="friendForm">
			<h2>Open Hideout</h2>
			<fieldset>
				<div className="form-group">
					<label htmlFor="name">Hideout Name:</label>
					<input type="text" id="name" onChange={handleControlledInputChange} required autoFocus className="form-control" placeholder="Hideout name" value={hideout.name} />
				</div>
			</fieldset>
			<fieldset>
				<div className="form-group">
					<label htmlFor="email">Hideout Location:</label>
					<input type="text" id="location" onChange={handleControlledInputChange} required className="form-control" placeholder="Hideout location" value={hideout.location} />
				</div>
			</fieldset>
			<fieldset>
				<div className="form-group">
					<label htmlFor="name">Hideout Description:</label>
					<input type="text" id="description" onChange={handleControlledInputChange} required autoFocus className="form-control" placeholder="Hideout description" value={hideout.description} />
				</div>
			</fieldset>
			<div className="buttons">
				<button type="button" className="btn btn-primary"
					onClick={ClickAddHideout}>
					Open Hideout
				</button>
				<button type="button" className="btn btn-primary"
					onClick={ClickCancel}>
					Cancel
				</button>
			</div>
		</form>
	)
}