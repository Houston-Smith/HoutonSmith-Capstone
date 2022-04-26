import React, { useState, useEffect } from "react";
import {useNavigate, useParams} from "react-router-dom";
import { getCronyById, updateCrony } from "../../modules/CronyManager";
import "./CronyForm.css";

export const CronyEditForm = () => {
  const [crony, setCrony] = useState({ name: "", species: "", skills: "", pay: 0 });
  const [isLoading, setIsLoading] = useState(false);

  const {cronyId} = useParams();
  const navigate = useNavigate();

  const handleFieldChange = evt => {
    const stateToChange = { ...crony };
    stateToChange[evt.target.id] = evt.target.value;
    setCrony(stateToChange);
  };

  const updateExistingCrony = evt => {
    evt.preventDefault()
    setIsLoading(true);


    const editedCrony = {
      id: cronyId,
	    managerId: crony.managerId,
      crewId: crony.crewId,
      name: crony.name,
      species: crony.species,
      skills: crony.skills,
      pay: crony.pay
    };


  updateCrony(editedCrony)
    .then(() => navigate("/cronies")
    )
  }

  useEffect(() => {
    getCronyById(cronyId)
      .then(crony => {
        setCrony(crony);
        setIsLoading(false);
      });
  }, []);

  const ClickCancel = (event) => {
    navigate("/cronies")
  }
  
  return (
    <>
      <form className="taskForm">

      <h2>Edit a Crony</h2>

      <fieldset>
				<div className="form-group">
					<label htmlFor="name">Crony Name:</label>
					<input type="text" id="name" onChange={handleFieldChange} required autoFocus className="form-control" placeholder="Crony name" value={crony.name} />
				</div>
			</fieldset>

			<fieldset>
				<div className="form-group">
					<label htmlFor="species">Crony Description:</label>
					<input type="text" id="species" onChange={handleFieldChange} required className="form-control" placeholder="Crony Description" value={crony.species} />
				</div>
			</fieldset>

			<fieldset>
				<div className="form-group">
					<label htmlFor="skills">Crony Skillsets:</label>
					<input type="text" id="skills" onChange={handleFieldChange} required className="form-control" placeholder="Crony skills" value={crony.skills} />
				</div>
			</fieldset>

			<fieldset>
				<div className="form-group">
					<label htmlFor="name">Crony Pay:</label>
					<input type="number" id="pay" onChange={handleFieldChange} required className="form-control" placeholder="Crony Pay" value={crony.pay} />
				</div>
			</fieldset>

      <div className="buttons">
        <button type="button" disabled={isLoading} className="btn btn-primary"
          onClick={updateExistingCrony}>
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