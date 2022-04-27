import React from "react";
import { useNavigate } from "react-router-dom";
import { getCrewById } from "../../modules/CrewManager";
import { useState, useEffect } from "react";

export const CronyCard = ({crony, callDeleteCrony}) => {

  const navigate = useNavigate()

  //---------------------------------------------------SET EMPTY CREWS ARRAY-------------------------------------------------------------//

  const [crew, setCrew] = useState([])

  

//-----------------------------------POPULATE EMPTY CREWS ARRAY WITH OBJECTS FROM THE API----------------------------------------------//

  const getCrew = () => {
    //Pull Crews array for the active user from API...
    return getCrewById(crony.crewId).then(crew => {
      //...then populate empty crews array with what comes back.
      console.log(crew)
      setCrew(crew)
    })
  }


//------------------------------------------RUN getCrews FUNCTION AFTER FIRST RENDER---------------------------------------------------//

useEffect(() => {
  getCrew()
}, [])


  return (
    <div className="card">
      <div className="card-content">
        <h2>{crony.name}</h2>
        <p>{crony.species}</p>
        <p><b>Skill Sets</b>:</p>
          {crony.skill1 === ""
              ? <p>{crony.skill2}</p>
              : <p></p>
            } 
          {crony.skill2 === ""
              ? <p>{crony.skill1}</p>
              : <p></p>
            } 
          {crony.skill1 === "" && crony.skill2 === ""
              ? <p>None</p>
              : <p></p>
            }
          {crony.skill1 != "" && crony.skill2 != ""
              ? <p>{crony.skill1}, {crony.skill2}</p>
              : <p></p>
            }          
        {crony.additionalSkills === ""
              ? <p></p>
              : <p><b>Additional Skills</b>: {crony.additionalSkills}</p>
            } 
        <p><b>Pay</b>: {crony.pay} gold</p>
        {crony.crewId === "1"
              ? <p><b>Currently Unnasigned</b></p>
              : <p><b>Assigned</b>: {crew.name}</p>
            } 
        <button type="button" className="btn btn-primary" onClick={() => callDeleteCrony(crony.id)}>Fire Crony</button>
        <button type="button" className="btn btn-primary" onClick={() => {navigate(`/cronies/${crony.id}/edit`)}}>Edit</button>
      </div>
    </div>
  )
}