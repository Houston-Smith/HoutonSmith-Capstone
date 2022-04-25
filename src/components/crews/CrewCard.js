import React from "react";
import { Link } from "react-router-dom";

export const CrewCard = ({crew, callDeleteCrew}) => {
  return (
    <div className="card">
      <div className="card-content">
        <h2>{crew.name}</h2>
        <p>{crew.hideoutId}</p>
        <p>{crew.description}</p>
        <button type="button" className="btn btn-primary" onClick={() => callDeleteCrew(crew.id)}>Disband</button>
      </div>
    </div>
  )
}