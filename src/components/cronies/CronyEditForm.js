import React, { useState, useEffect } from "react";
import {useNavigate, useParams} from "react-router-dom";
import { getCronyById, updateCrony } from "../../modules/CronyManager";
import { getCrewsOfActiveUser } from "../../modules/CrewManager";
import { getAllSkills } from "../../modules/SkillManager";
import "./CronyForm.css";

export const CronyEditForm = () => {
  const [crony, setCrony] = useState({ name: "", species: "", skills: "", pay: 0 });
  const [isLoading, setIsLoading] = useState(false);

  const {cronyId} = useParams();
  const navigate = useNavigate();

//-------------------------------------SAVE THE CURRENT USER'S ID AND OBJECT AS VARIABLES------------------------------------------------//	

	let userObj = JSON.parse(sessionStorage.getItem("nutshell_user"))
	let currentUser = userObj.id;


//---------------------------------------------------SET EMPTY CREWS ARRAY-------------------------------------------------------------//

  const [crews, setCrews] = useState([])
  const [skills, setSkills] = useState([])


//-----------------------------------POPULATE EMPTY CREWS ARRAY WITH OBJECTS FROM THE API----------------------------------------------//

const getCrews = () => {
	//Pull Crews array for the active user from API...
	return getCrewsOfActiveUser(currentUser).then(crews => {
		//...then populate empty crews array with what comes back.
		setCrews(crews)
	})
}

const getSkills = () => {
	//Pull Crews array for the active user from API...
	return getAllSkills().then(skills => {
		//...then populate empty crews array with what comes back.
		setSkills(skills)
	})
}

//------------------------------------------RUN getCrews FUNCTION AFTER FIRST RENDER---------------------------------------------------//

useEffect(() => {
getCrews()
}, [])

useEffect(() => {
  getSkills()
    }, [])


  const handleFieldChange = evt => {
    const stateToChange = { ...crony };
    if (evt.target.id.includes("Id")) {
			evt.target.value = parseInt(evt.target.value)
		}
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
      skill1: crony.skill1,
      skill2: crony.skill2,
      additionalSkills: crony.additionalSkills,
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
					<select type="text" id="species" onChange={handleFieldChange} required className="form-control" placeholder="Crony Description" value={crony.species} >
						<option disabled hidden value="">Select a Description</option>
						<option value="Goblin">Goblin</option>
						<option value="Kenku">Kenku</option>
						<option value="Kobold">Kobold</option>
					</select>
				</div>
			</fieldset>

			<fieldset>
				<div className="form-group">
					<label htmlFor="skills">Special Skills:</label>
					<select value={crony.skill1} name="skill1" id="skill1" onChange={handleFieldChange} className="form-control" >
						<option disabled hidden value="">Select a skill</option>
						<option value="">None</option>
						{skills.map(s => (
						<option key={s.id} value={s.name}>
								{s.name}
						</option>
						))}
					</select>
				</div>
			</fieldset>

			<fieldset>
				<div className="form-group">
					<label htmlFor="skills">Special Skills:</label>
					<select value={crony.skill2} name="skill2" id="skill2" onChange={handleFieldChange} className="form-control" >
						<option disabled hidden value="">Select a skill</option>
						<option value="">None</option>
						{skills.map(s => (
						<option key={s.id} value={s.name}>
								{s.name}
						</option>
						))}
					</select>
				</div>
			</fieldset>

			<fieldset>
				<div className="form-group">
					<label htmlFor="additionalSkills">Additional Skills:</label>
					<input type="text" id="additionalSkills" onChange={handleFieldChange} required className="form-control" placeholder="Additional Skills" value={crony.additionalSkills} />
				</div>
			</fieldset>

			<fieldset>
				<div className="form-group">
					<label htmlFor="name">Crony Pay:</label>
					<input type="number" id="pay" onChange={handleFieldChange} required className="form-control" placeholder="Crony Pay" value={crony.pay} />
				</div>
			</fieldset>

      <fieldset>
				<div className="form-group">
					<label htmlFor="crew">Assign to crew:</label>
					<select value={crony.crewId} name="crewId" id="crewId" onChange={handleFieldChange} className="form-control" >
						<option disabled hidden value="0">Select a crew</option>
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