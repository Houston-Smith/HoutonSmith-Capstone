import React from "react";
import { useState, useEffect } from "react";

export const DetailsHeistCard = ({heist}) => {



  return (
    <div className="card-crews-heist">
      <div className="card-content-crews-heist">
      <h2>{heist.name}</h2>
        <p>{heist.description}</p>
        <p>Location: {heist.location}</p>
        <p>Time: {heist.date}</p>
      </div>
    </div>
  )
}