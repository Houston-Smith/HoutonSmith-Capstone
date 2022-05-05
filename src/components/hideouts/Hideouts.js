import React, { useRef, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Hideouts.css";
import { HideoutCard } from "./HideoutCard";
import { deleteHideout, getHideoutsOfActiveUser } from "../../modules/HideoutManager";

//----------------------------------------------BROUGHT TO YOU BY HOUSTON SMITH---------------------------------------------------------//

export const Hideouts = () => {


//----------------------------------------PULLS THE CURRENT USER ID FROM SESSION STORAGE-------------------------------------------------//

  let userObj = JSON.parse(sessionStorage.getItem("nutshell_user"));
  let currentUser = userObj.id;


//----------------------------------------DEFINE navigate AS useNavigate FOR FUTURE USE--------------------------------------------------//  

  const navigate = useNavigate()


//---------------------------------------------------SET EMPTY HIDEOUTS ARRAY-------------------------------------------------------------//

  const [hideouts, setHideouts] = useState([])

  

//-----------------------------------POPULATE EMPTY HIDEOUTS ARRAY WITH OBJECTS FROM THE API----------------------------------------------//

  const getHideouts = () => {
    //Pull Hideouts array for the active user from API...
    return getHideoutsOfActiveUser(currentUser).then(hideouts => {
      //...then populate empty hideouts array with what comes back.
      setHideouts(hideouts)
    })
  }


//------------------------------------------RUN getHideouts FUNCTION AFTER FIRST RENDER---------------------------------------------------//

useEffect(() => {
  getHideouts()
}, [])

//--------------------------------------------CALLS THE deleteHideout FUNCTION-------------------------------------------------------------//

const callDeleteHideout = (id) => {
  deleteHideout(id)
  .then(() => getHideouts())
};


 //--------------------------------GENERATE HTML FOR HIDEOUTS PAGE AND GENERATE HIDEOUT CARDS------------------------------------------------// 

  return (
    <main>
      <section className="hideout-box">
        <section className="hideout-header">
          <h1>Hideout List</h1>
          <button type="button" className="btn btn-primary" onClick={() => {navigate("/hideouts/add")}}>Create Hideouts</button>
        </section>
        <section className="card-container-hideout">
          {hideouts.map(hideout =>
            <HideoutCard key={hideout.id} hideout={hideout} callDeleteHideout={callDeleteHideout}/>
          )}
        </section>
      </section>
    </main>
  );
}