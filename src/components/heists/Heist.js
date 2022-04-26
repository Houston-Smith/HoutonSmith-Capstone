import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Heist.css";
import { HeistCard } from "./HeistCard";
import { deleteHeist, getHeistsOfActiveUser } from "../../modules/HeistManager";

//----------------------------------------------BROUGHT TO YOU BY HOUSTON SMITH---------------------------------------------------------//

export const Heist = () => {


//----------------------------------------PULLS THE CURRENT USER ID FROM SESSION STORAGE-------------------------------------------------//

  let userObj = JSON.parse(sessionStorage.getItem("nutshell_user"));
  let currentUser = userObj.id;


//----------------------------------------DEFINE navigate AS useNavigate FOR FUTURE USE--------------------------------------------------//  

  const navigate = useNavigate()


//---------------------------------------------------SET EMPTY HEISTS ARRAY-------------------------------------------------------------//

  const [heists, setHeists] = useState([])

  

//-----------------------------------POPULATE EMPTY HEISTS ARRAY WITH OBJECTS FROM THE API----------------------------------------------//

  const getHeists = () => {
    //Pull Crews array for the active user from API...
    return getHeistsOfActiveUser(currentUser).then(heists => {
      //...then populate empty crews array with what comes back.
      setHeists(heists)
    })
  }


//------------------------------------------RUN getHeists FUNCTION AFTER FIRST RENDER---------------------------------------------------//

useEffect(() => {
  getHeists()
}, [])


//--------------------------------------------CALLS THE deleteHeist FUNCTION-------------------------------------------------------------//

const callDeleteHeist = (id) => {
  deleteHeist(id)
  .then(() => getHeists())
};


 //--------------------------------GENERATE HTML FOR HEISTS PAGE AND GENERATE HEIST CARDS------------------------------------------------// 

  return (
    <main>
      <section className="friend-header">
        <h1>Upcoming Heists</h1>
        <button type="button" className="btn btn-primary" onClick={() => {navigate("/heists/add")}}>Plan a Heist</button>
      </section>
      <section className="card-container">
        {heists.map(heist =>
          <HeistCard key={heist.id} heist={heist} callDeleteHeist={callDeleteHeist}/>
        )}
      </section>
    </main>
  );
}