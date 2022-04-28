import React, { useState, useEffect } from "react";
import {useNavigate, useParams} from "react-router-dom";
import { getHideoutById, updateHideout } from "../../modules/HideoutManager";
import "./HideoutForm.css";

export const HideoutEditForm = () => {
  const [hideout, setHideout] = useState({ name: "", location: "", description: "" });
  const [isLoading, setIsLoading] = useState(false);

  const {hideoutId} = useParams();
  const navigate = useNavigate();

  const handleFieldChange = evt => {
    const stateToChange = { ...hideout };
    stateToChange[evt.target.id] = evt.target.value;
    setHideout(stateToChange);
  };

  const updateExistingHideout = evt => {
    evt.preventDefault()
    setIsLoading(true);


    const editedHideout = {
      id: hideoutId,
	    userId: hideout.userId,
      name: hideout.name,
      location: hideout.location,
      description: hideout.description,
    };


  updateHideout(editedHideout)
    .then(() => navigate("/hideouts")
    )
  }

  useEffect(() => {
    getHideoutById(hideoutId)
      .then(hideout => {
        setHideout(hideout);
        setIsLoading(false);
      });
  }, []);

  const ClickCancel = (event) => {
    navigate("/hideouts")
  }
  
  return (
    <>
      <form className="taskForm">

      <h2>Update A Hideout</h2>

			<fieldset>
				<div className="form-group">
					<label htmlFor="name">Name:</label>
					<input type="text" id="name" onChange={handleFieldChange} required autoFocus className="form-control" placeholder="Hideout name" value={hideout.name} />
				</div>
			</fieldset>

      <fieldset>
				<div className="form-group">
					<label htmlFor="name">Location:</label>
					<input type="text" id="location" onChange={handleFieldChange} required className="form-control" placeholder="Hideout location" value={hideout.location} />
				</div>
			</fieldset>

      <fieldset>
				<div className="form-group">
					<label htmlFor="date">Description:</label>
					<input type="text" id="description" onChange={handleFieldChange} required className="form-control" placeholder="Hideout Description" value={hideout.description} />
				</div>
			</fieldset>

      <div className="buttons">
        <button type="button" disabled={isLoading} className="btn btn-primary"
          onClick={updateExistingHideout}>
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