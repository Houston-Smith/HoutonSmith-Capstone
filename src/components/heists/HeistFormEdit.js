import React, { useState, useEffect } from "react";
import {useNavigate, useParams} from "react-router-dom";
import { getHeistById, updateHeist } from "../../modules/HeistManager";
import { getCrewsOfActiveUser } from "../../modules/CrewManager";
import "./HeistForm.css";

export const HeistEditForm = () => {

//-------------------------------------SAVE THE CURRENT USER'S ID AND OBJECT AS VARIABLES------------------------------------------------//	

	let userObj = JSON.parse(sessionStorage.getItem("nutshell_user"))
	let currentUser = userObj.id;

//-----------------------------------------------SET ISLOADING----------------------------------------------------------------------------//	
  
  const [isLoading, setIsLoading] = useState(false);


//-------------------------------------SAVE heistID AS A VARIABLE USING useParams---------------------------------------------------------//

  const {heistId} = useParams();


//----------------------------------------DEFINE navigate AS useNavigate FOR FUTURE USE--------------------------------------------------//

  const navigate = useNavigate();


//---------------------------------------------------SET EMPTY CREWS AND HEISTS ARRAYS-------------------------------------------------------//

  const [crews, setCrews] = useState([])
	const [heist, setHeist] = useState({ name: "", description: "" });


//-----------------------------POPULATE EMPTY CREWS AND HEISTS ARRAY WITH OBJECTS FROM THE API----------------------------------------------//

const getCrews = () => {
	//Pull Crews array for the active user from API...
	return getCrewsOfActiveUser(currentUser).then(crews => {
		//...then populate empty crews array with what comes back.
		setCrews(crews)
	})
}

useEffect(() => {
	getHeistById(heistId)
		.then(heist => {
			setHeist(heist);
			setIsLoading(false);
		});
}, []);

//------------------------------------------RUN getCrews FUNCTION AFTER FIRST RENDER---------------------------------------------------//

useEffect(() => {
  getCrews()
}, [])


//-----------------------------------------RE-RENDER AND DISPLAY VALUES WHEN A FIELD CHANGES-----------------------------------------------//

  const handleFieldChange = evt => {
		//create a copy of the heist object
    const stateToChange = { ...heist };
		// forms always provide values as strings. But we want to save the ids as numbers.
    if (evt.target.id.includes("Id")) {
			evt.target.value = parseInt(evt.target.value)
		}
		//Change the property of the input field to a new value
    stateToChange[evt.target.id] = evt.target.value;
		//Update state
    setHeist(stateToChange);
  };


//-------------UPDATES THE HEIST WITH A DUPLICATE THAT HAS THE SAME PROPERTIES OTHER THAN ONES THAT WERE CHANGED---------------------------//

  const updateExistingHeist = evt => {
    evt.preventDefault()
    setIsLoading(true);

		//Create a new object identical to crew with updated properties 
    const editedHeist = {
      id: heistId,
	    userId: heist.userId,
	    name: heist.name,
		  description: heist.description,
		  location: heist.location,
		  date: heist.date,
		  crewId: heist.crewId,
    };

	//Invoke updateHeist passing editdCrony as an argument
	//Navigate back to heists page
  updateHeist(editedHeist)
    .then(() => navigate("/heists")
    )
  }


//----------------------------------------CANCELS FORM AND NAVIGATES BACK TO CRONY PAGE------------------------------------------------//

  const ClickCancel = (event) => {
    navigate("/heists")
  }

	
//------------------------------------------GENERATES HTML FOR THE HEIST EDIT FORM------------------------------------------------------//

  return (
    <>
      <form className="taskForm">

      <h2>Change a Heist</h2>

			<fieldset>
				<div className="form-group">
					<label htmlFor="name">Name:</label>
					<input type="text" id="name" onChange={handleFieldChange} required autoFocus className="form-control" placeholder="Heist name" value={heist.name} />
				</div>
			</fieldset>

			<fieldset>
				<div className="form-group">
					<label htmlFor="description">Description:</label>
					<input type="text" id="description" onChange={handleFieldChange} required className="form-control" placeholder="Heist description" value={heist.description} />
				</div>
			</fieldset>

			<fieldset>
				<div className="form-group">
					<label htmlFor="location">Location:</label>
					<input type="text" id="location" onChange={handleFieldChange} required className="form-control" placeholder="Heist location" value={heist.location} />
				</div>
			</fieldset>

			<fieldset>
				<div className="form-group">
					<label htmlFor="date">Date:</label>
					<input type="date" id="date" onChange={handleFieldChange} required className="form-control" placeholder="Heist date" value={heist.date} />
				</div>
			</fieldset>

			<fieldset>
				<div className="form-group">
					<label htmlFor="hideout">Assign Hideout:</label>
					<select value={heist.crewId} name="crewId" id="crewId" onChange={handleFieldChange} className="form-control" >
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
        <button type="button" disabled={isLoading} className="btn btn-primary"
          onClick={updateExistingHeist}>
          Update
            </button>

            <button type="button" disabled={isLoading} className="btn btn-primary"
          onClick={ClickCancel}>
          Cancel
            </button>   
      </div>
    </form>
  </>
  );
}