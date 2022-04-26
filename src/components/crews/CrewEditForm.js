import React, { useState, useEffect } from "react";
import {useNavigate, useParams} from "react-router-dom";
import { getCrewById, updateCrew } from "../../modules/CrewManager";
import { getHideoutsOfActiveUser } from "../../modules/HideoutManager";
import "./CrewForm.css";

export const CrewEditForm = () => {

	//-------------------------------------SAVE THE CURRENT USER'S ID AND OBJECT AS VARIABLES------------------------------------------------//	

	let userObj = JSON.parse(sessionStorage.getItem("nutshell_user"))
	let currentUser = userObj.id;


  const [crew, setCrew] = useState({ name: "", description: "" });
  const [isLoading, setIsLoading] = useState(false);

  const {crewId} = useParams();
  const navigate = useNavigate();

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


  const handleFieldChange = evt => {
    const stateToChange = { ...crew };
    if (evt.target.id.includes("Id")) {
			evt.target.value = parseInt(evt.target.value)
		}
    stateToChange[evt.target.id] = evt.target.value;
    setCrew(stateToChange);
  };

  const updateExistingCrew = evt => {
    evt.preventDefault()
    setIsLoading(true);


    const editedCrew = {
      id: crewId,
	    managerId: crew.managerId,
	    hideoutId: crew.hideoutId,
      name: crew.name,
      description: crew.description,
    };


  updateCrew(editedCrew)
    .then(() => navigate("/crews")
    )
  }

  useEffect(() => {
    getCrewById(crewId)
      .then(crew => {
        setCrew(crew);
        setIsLoading(false);
      });
  }, []);

  const ClickCancel = (event) => {
    navigate("/crews")
  }
  
  return (
    <>
      <form className="taskForm">

      <h2>Update A Crew</h2>

			<fieldset>
				<div className="form-group">
					<label htmlFor="name">Crew:</label>
					<input type="text" id="name" onChange={handleFieldChange} required autoFocus className="form-control" placeholder="Crew name" value={crew.name} />
				</div>
			</fieldset>

      <fieldset>
				<div className="form-group">
					<label htmlFor="date">Description:</label>
					<input type="text" id="description" onChange={handleFieldChange} required className="form-control" placeholder="Crew Description" value={crew.description} />
				</div>
			</fieldset>

      <fieldset>
				<div className="form-group">
					<label htmlFor="hideout">Assign Hideout:</label>
					<select value={crew.hideoutId} name="hideoutId" id="hideoutId" onChange={handleFieldChange} className="form-control" >
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
        <button type="button" disabled={isLoading} className="btn btn-primary"
          onClick={updateExistingCrew}>
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