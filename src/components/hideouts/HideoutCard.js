import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";


export const HideoutCard = ({hideout, callDeleteHideout}) => {

  const navigate = useNavigate()

  return (
    <div className="card">
      <div className="card-content">
        <h2>{hideout.name}</h2>
        <p>{hideout.description}</p>
        <p>{hideout.location}</p>
        <button type="button" className="btn btn-primary" onClick={() => callDeleteHideout(hideout.id)}>Close Location</button>
        <button type="button" className="btn btn-primary" onClick={() => {navigate(`/hideouts/${hideout.id}/edit`)}}>Edit</button>
      </div>
    </div>
  )
}