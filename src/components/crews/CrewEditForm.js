import React, { useState, useEffect } from "react";
import {useNavigate, useParams} from "react-router-dom";
import { getCrewById, updateCrew } from "../../modules/CrewManager";

export const CrewEditForm = () => {
  const [crew, setCrew] = useState({ name: "", description: "" });
  const [isLoading, setIsLoading] = useState(false);

  const {crewId} = useParams();
  const navigate = useNavigate();

  const handleFieldChange = evt => {
    const stateToChange = { ...crew };
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