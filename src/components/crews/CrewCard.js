import React from "react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { getHideoutById } from "../../modules/HideoutManager";
import { getCroniesByCrew } from "../../modules/CronyManager";

export const CrewCard = ({crew, callDeleteCrew}) => {

  const navigate = useNavigate()

  const [hideout, setHideout] = useState({ name: "", location: "" });
  const [cronies, setCronies] = useState([])

  useEffect(() => {
    getCroniesByCrew(crew.id)
      .then(cronyList => {
        setCronies(cronyList);
      });
  }, []);

  useEffect(() => {
    getHideoutById(crew.hideoutId)
      .then(hideout => {
        setHideout(hideout);
      });
  }, []);

  return (
    <div className="card-crews">
      <div className="card-content-crews">
        <h2>{crew.name}</h2>
        <p>Hideout: {hideout.name}</p>
        <p>{crew.description}</p>
        {cronies.map(c => (
						<p key={c.id}>
								{c.name}
						</p>
						))}  
        <button type="button" className="btn btn-primary" onClick={() => callDeleteCrew(crew.id)}>Disband</button>
        <button type="button" className="btn btn-primary" onClick={() => {navigate(`/crews/${crew.id}/edit`)}}>Edit</button>
        <button type="button" className="btn btn-primary" onClick={() => {navigate(`/crews/${crew.id}/details`)}}>Details</button>
      </div>
    </div>
  )
}