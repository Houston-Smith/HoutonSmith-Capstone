import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const DetailsCronyCard = ({crony, callFireCrony }) => {


//----------------------------------------DEFINE navigate AS useNavigate FOR FUTURE USE--------------------------------------------------//  

const navigate = useNavigate()



  return (
    <div className="card-crews-crony">
      <div className="card-content-crews-crony">
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
        <button type="button" className="btn btn-primary" onClick={() => callFireCrony(crony)}>Fire Crony</button>
        <button type="button" className="btn btn-primary" onClick={() => {navigate(`/cronies/${crony.id}/crewEdit`)}}>Edit</button>
      </div>
    </div>
  )
}