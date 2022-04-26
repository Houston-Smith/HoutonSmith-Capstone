import React from "react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { getCrewById } from "../../modules/CrewManager";

export const HeistCard = ({heist, callDeleteHeist}) => {

  const navigate = useNavigate()

  const [crew, setCrew] = useState([])

  useEffect(() => {
    getCrewById(heist.crewId)
      .then(crew => {
        setCrew(crew);
      });
  }, []);

  return (
    <div className="card">
      <div className="card-content">
        <h2>{heist.name}</h2>
        <p>{heist.description}</p>
        <p>Location: {heist.location}</p>
        <p>Time: {heist.date}</p>
        <p>Assigned Crew: {crew.name}</p>
       
        <button type="button" className="btn btn-primary" onClick={() => callDeleteHeist(heist.id)}>Abort Heist</button>
        <button type="button" className="btn btn-primary" onClick={() => {navigate(`/heists/${heist.id}/edit`)}}>Edit</button>
      </div>
    </div>
  )
}