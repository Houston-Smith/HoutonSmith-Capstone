import React, { useState, useEffect } from "react";
import {useNavigate, useParams} from "react-router-dom";
import { getCrewWithHideoutById, updateCrew } from "../../modules/CrewManager";
import { getHideoutsOfActiveUser, getHideoutById, updateHideout } from "../../modules/HideoutManager";
import "./CrewForm.css";

export const CrewEditForm = () => {

//-------------------------------------SAVE THE CURRENT USER'S ID AND OBJECT AS VARIABLES------------------------------------------------//	

	let userObj = JSON.parse(sessionStorage.getItem("nutshell_user"))
	let currentUser = userObj.id;


//-------------------------------------CREATE AN EMPTY CREWS AND HIDEOUTS ARRAYS TO BE POPULATED LATER-----------------------------------//	


  const [crew, setCrew] = useState({ name: "", description: "" });
  const [hideouts, setHideouts] = useState([])
  const [isLoading, setIsLoading] = useState(false);
  const [selectedHideout, setSelectedHideout] = useState([])
  const [currentHideout, setCurrentHideout] = useState([])


//--------------------------------------------SAVE crewID AS A VARIABLE USING useParams--------------------------------------------------//	


  const {crewId} = useParams();


//--------------------------------------------SAVE navigate AS useNavigate FOR FUTURE USE------------------------------------------------//	

  const navigate = useNavigate();


//--------------------------------------------FILTERS CRONIES BY THEIR crewId-------------------------------------------------------------//

const hideoutFilter = (id) => {
  
  const currentId = parseInt(id)

  return getHideoutsOfActiveUser(currentUser)
    .then(hideout =>
      hideout.filter(hideout => hideout.id === currentId || hideout.isOcupied === false))
  
}
  
//-----------------------------------POPULATE EMPTY HIDEOUTS ARRAY WITH OBJECTS FROM THE API----------------------------------------------//

const getHideouts = (currentHidoutId) => {
	//Pull Hideouts array for the active user from API...
	return hideoutFilter(currentHidoutId).then(hideouts => {
		//...then populate empty hideouts array with what comes back.
		setHideouts(hideouts)
	})
}

const getCurrentHideout = (Id) => {
	//Pull Hideouts array for the active user from API...
	return getHideoutById(Id).then(hideout => {
		//...then populate empty hideouts array with what comes back.
		setCurrentHideout(hideout)
    setSelectedHideout(hideout)
	})
}


//------------------------------------------RUN getHideouts FUNCTION AFTER FIRST RENDER---------------------------------------------------//

// useEffect(() => {
//   getHideouts()
// }, [])

//-----------POPULATES EMPTY CREW ARRAY WITH CREWS THAT POSESS A HIDEOUT ID MATCHING THIS HIDEOUTS ID-----------------------------------------//

useEffect(() => {
  getCrewWithHideoutById(crewId)
    .then(crew => {
      setCrew(crew);
      getCurrentHideout(crew.hideoutId)
      setIsLoading(false);
      getHideouts(crew.hideoutId)
    });
}, []);


//-----------------------------------------RE-RENDER AND DISPLAY VALUES WHEN A FIELD CHANGES-----------------------------------------------//

  const handleFieldChange = evt => {
    //create a copy of the crew array
    const stateToChange = { ...crew };

    let selectedVal = evt.target.value
    // forms always provide values as strings. But we want to save the ids as numbers.
    if (evt.target.id.includes("Id")) {
			evt.target.value = parseInt(evt.target.value)
		}

    //if the hideout is changed, update the selectedHideout for boolean change later(SetHideoutOccupied)
		if (evt.target.id.includes("hideoutId")) {
			selectedVal = parseInt(selectedVal)
			getHideoutById(selectedVal)
			.then((hideout) => 
      setSelectedHideout(hideout))
		}

    //Change the property of the input field to a new value
    stateToChange[evt.target.id] = evt.target.value;
    //Update state
    setCrew(stateToChange);
  };

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

//-----------------------------------------SETS THE OLD HIDEOUT AS OPSN IN THE DATA-----------------------------------------------//

const setHideoutOpen = (previousHideout) => {	

  const previous = {
    id: previousHideout.id,
    userId: previousHideout.userId,
    name: previousHideout.name,
    description: previousHideout.description,
    location: previousHideout.location,
    isOcupied: false
  };

updateHideout(previous) 
}


//-------------UPDATES THE CREW WITH A DUPLICATE THAT HAS THE SAME PROPERTIES OTHER THAN ONES THAT WERE CHANGED---------------------------//

  const updateExistingCrew = evt => {
    evt.preventDefault()
    setIsLoading(true);

    //Create a new object identical to crew with updated properties  
    const editedCrew = {
      id: crewId,
	    userId: crew.userId,
	    hideoutId: crew.hideoutId,
      name: crew.name,
      description: crew.description,
    };

    //Changes the crew Object in the API and returns to the crews page
  setHideoutOpen(currentHideout)
  SetHideoutOccupied(selectedHideout)
  updateCrew(editedCrew)
    .then(() => navigate("/crews")
    )
  }


 //-----------------------------------------------SENDS USER BACK TO CREWS PAGE----------------------------------------------------------------//

  const ClickCancel = (event) => {
    navigate("/crews")
  }
  
  //----------------------------------------------GENERATES HTML FOR THE CREW EDIT FORM--------------------------------------------------------//


  return (
    <>
      <main>
        <section className="crews-form-box">   
          <form className="crews-form-edit">

          <h2>Update A Crew</h2>

          <fieldset>
            <div className="form-group-crews">
              <label htmlFor="name">Crew:</label>
              <input type="text" id="name" onChange={handleFieldChange} required autoFocus className="form-control" placeholder="Crew name" value={crew.name} />
            </div>
          </fieldset>

          <fieldset>
            <div className="form-group-crews">
              <label htmlFor="date">Description:</label>
              <input type="text" id="description" onChange={handleFieldChange} required className="form-control" placeholder="Crew Description" value={crew.description} />
            </div>
          </fieldset>

          <fieldset>
            <div className="form-group-crews">
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
      </section> 
    </main>
  </>
  );
}