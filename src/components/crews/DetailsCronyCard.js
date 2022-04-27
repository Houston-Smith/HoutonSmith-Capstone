import React from "react";
import { useState, useEffect } from "react";

export const DetailsCronyCard = ({crony}) => {



  return (
    <div className="card">
      <div className="card-content">
        <h2>{crony.name}</h2>
        <p>{crony.species}</p>
        <p><b>Skills</b>: {crony.skills}</p>
        <p><b>Pay</b>: {crony.pay} gold</p>
      </div>
    </div>
  )
}