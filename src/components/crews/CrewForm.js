import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { addCrew, getCrewsOfActiveUser } from "../../modules/CrewManager";
import { getHideoutsOfActiveUser, getHideoutById, updateHideout} from "../../modules/HideoutManager";
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

	//-------------------------------------SET EMPTY HIDEOUTS AND SELECTED HIDEOUT ARRAYS------------------------------------------------------//

  const [hideouts, setHideouts] = useState([])
	const [selectedHideout, setSelectedHideout] = useState([])



//--------------------------------------------FILTERS CRONIES BY THEIR crewId-------------------------------------------------------------//

const hideoutFilter = () => {
  
  return getHideoutsOfActiveUser(currentUser)
    .then(hideout =>
      hideout.filter(hideout => hideout.isOcupied === false))
  
}


//-----------------------------------POPULATE EMPTY CREWS ARRAY WITH OBJECTS FROM THE API----------------------------------------------//


const getHideouts = () => {
	//Pull Crews array for the active user from API...
	return hideoutFilter(currentUser).then(hideouts => {
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
		//if the hideout is changed, update the selectedHideout for boolean change later(SetHideoutOccupied)
		if (event.target.id.includes("hideoutId")) {
			selectedVal = parseInt(selectedVal)
			getHideoutById(selectedVal)
			.then((hideout) => setSelectedHideout(hideout))
		}
		//Change the property of the input field to a new value
		newCrew[event.target.id] = selectedVal
		// update state
		setCrew(newCrew)
	}

//-----------------------------------------SETS THE HIDEOUT CHOSEN AS OCCUPIED IN THE DATA-----------------------------------------------//

	const SetHideoutOccupied = (selectedHideout) => {	

			const OccupiedHidout = {
				id: selectedHideout.id,
				userId: selectedHideout.userId,
				name: selectedHideout.name,
				description: selectedHideout.description,
				location: selectedHideout.location,
				isOcupied: true
			};
		
		updateHideout(OccupiedHidout)
			
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
			SetHideoutOccupied(selectedHideout)
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
	<main>
		<section className="crews-form-box">
			<form className="crews-form-new">
				<h2>Assemble Crew</h2>

				<fieldset>
					<div className="form-group-crews">
						<label htmlFor="name">Crew Name:</label>
						<input type="text" id="name" onChange={handleControlledInputChange} required autoFocus className="form-control" placeholder="Crew name" value={crew.name} />
					</div>
				</fieldset>

				<fieldset>
					<div className="form-group-crews">
						<label htmlFor="email">Crew Description:</label>
						<input type="text" id="description" onChange={handleControlledInputChange} required className="form-control" placeholder="Crew Description" value={crew.description} />
					</div>
				</fieldset>

				<fieldset>
					<div className="form-group-crews">
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
					<button type="button"
						onClick={ClickAddCrew}>
						Assemble Crew
					</button>
					<button type="button"
						onClick={ClickCancel}>
						Cancel
					</button>
				</div>
			</form>
		</section>
	</main>			
	)
}