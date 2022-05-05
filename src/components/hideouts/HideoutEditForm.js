import React, { useState, useEffect } from "react";
import {useNavigate, useParams} from "react-router-dom";
import { getHideoutById, updateHideout } from "../../modules/HideoutManager";
import "./HideoutForm.css";

export const HideoutEditForm = () => {
  
//-----------------------------------------------SET ISLOADING----------------------------------------------------------------------------//	

  const [isLoading, setIsLoading] = useState(false);

//-------------------------------------SAVE hideoutID AS A VARIABLE USING useParams---------------------------------------------------------//

  const {hideoutId} = useParams();


//----------------------------------------DEFINE navigate AS useNavigate FOR FUTURE USE--------------------------------------------------//

  const navigate = useNavigate();


//---------------------------------------------------SET EMPTY HIDEOUT ARRAY-------------------------------------------------------------//

  const [hideout, setHideout] = useState({ name: "", location: "", description: "" });


//-------------------------------------POPULATE EMPTY HIDEOUTARRAY WITH OBJECTS FROM THE API----------------------------------------------//

  useEffect(() => {
    getHideoutById(hideoutId)
      .then(hideout => {
        setHideout(hideout);
        setIsLoading(false);
      });
  }, []);

//-----------------------------------------RE-RENDER AND DISPLAY VALUES WHEN A FIELD CHANGES-----------------------------------------------//

  const handleFieldChange = evt => {
    const stateToChange = { ...hideout };
    stateToChange[evt.target.id] = evt.target.value;
    setHideout(stateToChange);
  };


//-------------UPDATES THE HIDEOUT WITH A DUPLICATE THAT HAS THE SAME PROPERTIES OTHER THAN ONES THAT WERE CHANGED---------------------------//

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


//----------------------------------------CANCELS FORM AND NAVIGATES BACK TO CRONY PAGE------------------------------------------------//

  const ClickCancel = (event) => {
    navigate("/hideouts")
  }

  
//------------------------------------------GENERATES HTML FOR THE HEIST EDIT FORM------------------------------------------------------//

  return (
    <>
    <main>
      <section className="hideout-form-box">
        <form className="hideout-form-edit">

        <h2>Update A Hideout</h2>

        <fieldset>
          <div className="form-group-hideout">
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" onChange={handleFieldChange} required autoFocus className="form-control" placeholder="Hideout name" value={hideout.name} />
          </div>
        </fieldset>

        <fieldset>
          <div className="form-group-hideout">
            <label htmlFor="name">Location:</label>
            <input type="text" id="location" onChange={handleFieldChange} required className="form-control" placeholder="Hideout location" value={hideout.location} />
          </div>
        </fieldset>

        <fieldset>
          <div className="form-group-hideout">
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
      </section>
    </main>
  </>
  );
}