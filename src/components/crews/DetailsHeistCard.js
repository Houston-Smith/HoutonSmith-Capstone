import React from "react";
import { useState, useEffect } from "react";

export const DetailsHeistCard = ({heist}) => {



  return (
    <div className="card">
      <div className="card-content">
      <h2>{heist.name}</h2>
        <p>{heist.description}</p>
        <p>Location: {heist.location}</p>
        <p>Time: {heist.date}</p>
      </div>
    </div>
  )
}