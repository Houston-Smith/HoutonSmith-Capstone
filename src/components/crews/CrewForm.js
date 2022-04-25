import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { addCrew, getAllUsers, getAllCrews, getUserById, getCrewsOfActiveUser } from "../../modules/CrewManager";
import "./CrewForm.css";


//----------------------------------------------BROUGHT TO YOU BY HOUSTON SMITH---------------------------------------------------------//

export const CrewForm = () => {


	//-------------------------------------SAVE THE CURRENT USER'S ID AND OBJECT AS VARIABLES------------------------------------------------//	

	let userObj = JSON.parse(sessionStorage.getItem("nutshell_user"))
	let currentUser = userObj.id;

	//----------------------------------------DEFINE navigate AS useNavigate FOR FUTURE USE--------------------------------------------------//

	const navigate = useNavigate()


	//------------------------SET FRIENDS, USERS, CURRENT FRIENDS, AND CURRENT USER ARRAYS WITH EMPTY KEYS------------------------------------//

	const [crew, setCrew] = useState({
		ManagerId: currentUser,
		name: "",
		hideoutId: 1,
		description: "",
	})

	const [currentUserObj, setCurrentUserObj] = useState({})

	const [users, setUsers] = useState({})

	const [currentCrew, setCurrentCrews] = useState({})


	//-----------------------------------------POPULATE THE USERS ARRAY WITH USERS FROM THE API------------------------------------------------//

	useEffect(() => {
		getAllUsers()
			.then(users => {
				setUsers(users)
			});
	}, []);


	//------------------------------------POPULATE THE CURRENT USER OBJ ARRAY WITH THE CURRENT USER---------------------------------------------//

	useEffect(() => {
		getUserById(currentUser)
			.then(user => {
				setCurrentUserObj(user)
			});
	}, []);

	//-----------------------------------------POPULATE THE CURRENT FRIENDS ARRAY WITH FRIENDS FROM THE API---------------------------------------//	


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
		//Change the property of the input field to a new value
		newCrew[event.target.id] = selectedVal
		// update state
		setCrew(newCrew)
	}


	//---------------------------------CALL addFriend FUNCTION AND NAVIGATE BACK TO FRIEND PAGE ON BUTTON CLICK----------------------------//

	const ClickAddFriend = (event) => {
		//Prevents the browser from submitting the form
		event.preventDefault()
		//Saves friend name and email in variables
		const crewName = crew.name
    const crewDescription = crew.description
		let newCrew = { ...crew }
		//Checks the users array for the current entry and saves it as a variable
		const isCrew = (currentCrew.find(crew => crew.name === crewName))

		//Display error message if input fields are left empty
		if (crewName === "") {
			window.alert("Please input a name for your crew")

			//Display error message if new friend is already on your friends list
		}else if (crewDescription === "") {
			window.alert("Please input a description for your crew")

			//Display error message if new friend is already on your friends list
		} 
     else if (isCrew != undefined) {
			if (crewName === isCrew.name) {
				window.alert("You already have a crew by this name")
			}
			//...or if they do not exist
			else {
				window.alert("Please input a name and description")
			}

				
		} else {
			//Invoke addFriend passing friend as an argument
			//Navigate back to friends page
			addCrew(newCrew)
				.then(() => navigate("/crews"))

			//Display error message if new friend does not exist
		} 
	}


	//----------------------------------------CANCELS FORM AND NAVIGATES BACK TO FRIEND PAGE------------------------------------------------//

	const ClickCancel = (event) => {
		navigate("/crews")
	}


	//----------------------------------------------GENERATE HTML FOR NEW FRIEND FORM-------------------------------------------------------//

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
			<div className="buttons">
				<button type="button" className="btn btn-primary"
					onClick={ClickAddFriend}>
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