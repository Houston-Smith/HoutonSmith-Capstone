import React from "react";

export const CronyAddCard = ({crony, addCrony}) => {

  return (
    <div className="card-crews">
      <div className="card-content-crews">
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
        <button type="button" className="btn btn-primary" onClick={() => addCrony(crony)}>Add Crony</button>
      </div>
    </div>
  )
}