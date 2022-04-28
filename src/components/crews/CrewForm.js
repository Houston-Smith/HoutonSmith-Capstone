import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { addCrew, getCrewsOfActiveUser } from "../../modules/CrewManager";
import { getHideoutsOfActiveUser } from "../../modules/HideoutManager";
import "./CrewForm.css";


//----------------------------------------------BROUGHT TO YOU BY HOUSTON SMITH---------------------------------------------------------//

export const CrewForm = () => {


	//-------------------------------------SAVE THE CURRENT USER'S ID AND OBJECT AS VARIABLES------------------------------------------------//	

	let userObj = JSON.parse(sessionStorage.getItem("nutshell_user"))
	let currentUser = userObj.id;

	//----------------------------------------DEFINE navigate AS useNavigate FOR FUTURE USE--------------------------------------------------//

	const navigate = useNavigate()


	//---------------------------------------SET CREWS, AND CURRENT CREWS ARRAYS WITH EMPTY KEYS-----------------------====------------------//

	const [crew, setCrew] = useState({
		userId: currentUser,
		name: "",
		hideoutId: 0,
		description: "",
	})

	const [currentCrew, setCurrentCrews] = useState({})

	//---------------------------------------------------SET EMPTY HIDEOUTS ARRAY-------------------------------------------------------------//

  const [hideouts, setHideouts] = useState([])


//-----------------------------------POPULATE EMPTY CREWS ARRAY WITH OBJECTS FROM THE API----------------------------------------------//

const getHideouts = () => {
	//Pull Crews array for the active user from API...
	return getHideoutsOfActiveUser(currentUser).then(hideouts => {
		//...then populate empty crews array with what comes back.
		setHideouts(hideouts)
	})
}


//------------------------------------------RUN getCrews FUNCTION AFTER FIRST RENDER---------------------------------------------------//

useEffect(() => {
getHideouts()
}, [])


	//-----------------------------------------POPULATE THE CURRENT CREWS ARRAY WITH CREWS FROM THE API---------------------------------------//	


  const getUsersCrews = () => {
    //Pull Crews array for the active user from API...
    return getCrewsOfActiveUser().then(crews => {
      //...then populate empty crews array with what comes back.
      setCurrentCrews(crews)
    })
  }

	useEffect(() => {
		getUsersCrews()
	}, []);

	//-----------------------------------------RE-RENDER AND DISPLAY VALUES WHEN A FIELD CHANGES-----------------------------------------------//

	const handleControlledInputChange = (event) => {
		//Create a copy of the friend array
		const newCrew = { ...crew }
		//target the value of the input field
		let selectedVal = event.target.value
		// forms always provide values as strings. But we want to save the ids as numbers.
		if (event.target.id.includes("Id")) {
			selectedVal = parseInt(selectedVal)
		}
		//Change the property of the input field to a new value
		newCrew[event.target.id] = selectedVal
		// update state
		setCrew(newCrew)
	}


	//---------------------------------CALL addCREW FUNCTION AND NAVIGATE BACK TO CREW PAGE ON BUTTON CLICK----------------------------//

	const ClickAddCrew = (event) => {
		//Prevents the browser from submitting the form
		event.preventDefault()
		//Saves crew name and description in variables
		const crewName = crew.name
    const crewDescription = crew.description
		const hideoutId = crew.hideoutId
		let newCrew = { ...crew }
		//Checks the crews array for the current entry and saves it as a variable
		const isCrew = (currentCrew.find(crew => crew.name === crewName))

			//Display error message if name input field is empty
		if (crewName === "") {
			window.alert("Please input a name for your crew")

			//Display error message if hideout input field is empty
		} else if (hideoutId === 0) {
			window.alert("You need to assign your crew to a hideout")	

			//Display error message if description field is empty
		} else if (crewDescription === "") {
			window.alert("Please input a description for your crew")

			//Display error message if you have a crew using that name already
		} 
     else if (isCrew != undefined) {
			if (crewName === isCrew.name) {
				window.alert("You already have a crew by this name")
			}
			
			else {
				window.alert("Please input a name and description")
			}

				
		} else {
			//Invoke addCrew passing crew as an argument
			//Navigate back to crews page
			addCrew(newCrew)
				.then(() => navigate("/crews"))
		} 
	}


	//----------------------------------------CANCELS FORM AND NAVIGATES BACK TO CREW PAGE------------------------------------------------//

	const ClickCancel = (event) => {
		navigate("/crews")
	}


	//----------------------------------------------GENERATE HTML FOR NEW CREW FORM-------------------------------------------------------//

	return (
		<form className="friendForm">
			<h2>Assemble Crew</h2>

			<fieldset>
				<div className="form-group">
					<label htmlFor="name">Crew Name:</label>
					<input type="text" id="name" onChange={handleControlledInputChange} required autoFocus className="form-control" placeholder="Crew name" value={crew.name} />
				</div>
			</fieldset>

			<fieldset>
				<div className="form-group">
					<label htmlFor="email">Crew Description:</label>
					<input type="text" id="description" onChange={handleControlledInputChange} required className="form-control" placeholder="Crew Description" value={crew.description} />
				</div>
			</fieldset>

			<fieldset>
				<div className="form-group">
					<label htmlFor="hideout">Assign Hideout:</label>
					<select value={crew.hideoutId} name="hideoutId" id="hideoutId" onChange={handleControlledInputChange} className="form-control" >
						<option disabled hidden value="0">Select a Hideout</option>
						{hideouts.map(h => (
						<option key={h.id} value={h.id}>
								{h.name}
						</option>
						))}
					</select>
				</div>
			</fieldset>

			<div className="buttons">
				<button type="button" className="btn btn-primary"
					onClick={ClickAddCrew}>
					Assemble Crew
				</button>
				<button type="button" className="btn btn-primary"
					onClick={ClickCancel}>
					Cancel
				</button>
			</div>
		</form>
	)
}