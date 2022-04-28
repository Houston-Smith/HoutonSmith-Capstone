import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { getCrewByHideout } from "../../modules/CrewManager";



export const HideoutCard = ({hideout, callDeleteHideout}) => {

  const navigate = useNavigate()

  //---------------------------------------------------SET EMPTY CREWS ARRAY-------------------------------------------------------------//

  const [crew, setCrew] = useState([])

//-----------------------------------POPULATE EMPTY CREWS ARRAY WITH OBJECTS FROM THE API----------------------------------------------//

  const getCrew = () => {
    //Pull Crews array for the active user from API...
    return getCrewByHideout(hideout.id).then(crew => {
      //...then populate empty crews array with what comes back.\
      setCrew(crew)
    })
  }


//------------------------------------------RUN getCrews FUNCTION AFTER FIRST RENDER---------------------------------------------------//

useEffect(() => {
  getCrew()
}, [])


//-----------------------------------------------GENERATE HTML FOR HIDEOUT CARD-------------------------------------------------------//

  return (
    <div className="card">
      <div className="card-content">
        <h2>{hideout.name}</h2>
        <p>{hideout.description}</p>
        <p>{hideout.location}</p>
        {crew.length < 1
              ? <p><b>Currently Unnasigned</b></p>
              : <h3>{crew.map(c => (
                <p key={c.id}>
                    <b>{c.name}</b>
                </p>
                ))}</h3>
            } 

        <button type="button" className="btn btn-primary" onClick={() => callDeleteHideout(hideout.id)}>Close Location</button>
        <button type="button" className="btn btn-primary" onClick={() => {navigate(`/hideouts/${hideout.id}/edit`)}}>Edit</button>
      </div>
    </div>
  )
}