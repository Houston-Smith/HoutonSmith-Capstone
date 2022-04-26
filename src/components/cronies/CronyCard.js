import React from "react";
import { useNavigate } from "react-router-dom";

export const CronyCard = ({crony, callDeleteCrony}) => {

  const navigate = useNavigate()

  return (
    <div className="card">
      <div className="card-content">
        <h2>{crony.name}</h2>
        <p>{crony.species}</p>
        <p><b>Skills</b>: {crony.skills}</p>
        <p><b>Pay</b>: {crony.pay} gold</p>
        <button type="button" className="btn btn-primary" onClick={() => callDeleteCrony(crony.id)}>Fire Crony</button>
        <button type="button" className="btn btn-primary" onClick={() => {navigate(`/cronies/${crony.id}/edit`)}}>Edit</button>
      </div>
    </div>
  )
}