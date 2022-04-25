
//----------------------------------------------BROUGHT TO YOU BY HOUSTON SMITH---------------------------------------------------------//



//----------------------------------------------DEFINES URL AS LOCAL HOST STRING---------------------------------------------------------//

const URL = "http://localhost:8088"


//-----------------------------------------RETRIEVES A LIST OF ALL CREWS FROM THE API--------------------------------------------------//

export const getAllCrews = () => {
  return fetch (`${URL}/crews`)
    .then(response => response.json())
}

//-----------------------------------------RETRIEVES A LIST OF CREWS OF THE ACTIVE USER FROM THE API-----------------------------------//

export const getCrewsOfActiveUser = (userId) => {
  return fetch (`${URL}/crews?userId=${userId}`)
    .then(response => response.json())
}


//------------------------------------------------RETRIEVES A CREW BY THEIR ID----------------------------------------------------------//

export const getCrewById = (crewId) => {
  return fetch(`${URL}/crews/${crewId}`)
  .then(res => res.json())
}


//-----------------------------------------RETRIEVES A LIST OF ALL USERS FROM THE API--------------------------------------------------//

export const getAllUsers = () => {
  return fetch (`${URL}/users`)
    .then(response => response.json())
}


//------------------------------------------------RETRIEVES A USER BY THEIR ID----------------------------------------------------------//

export const getUserById = (userId) => {
  return fetch(`${URL}/users/${userId}`)
  .then(res => res.json())
}

//--------------------------------------ADDS AN OBJECT TO THE CREWS ARRAY THROUGH THE API-----------------------------------------------//

export const addCrew = (newCrew) => {
  return fetch (`${URL}/crews`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(newCrew)
  }).then(response => response.json())
}


//--------------------------------------TARGETS AN OBJECT IN THE CREWS ARRAY AND DELETES IT----------------------------------------------//

export const deleteCrew = (id) => {
  return fetch(`${URL}/crews/${id}`, {
    method: "DELETE"
  }).then(result => result.json())
}


//--------------------------------------TARGETS AN OBJECT IN THE CREWS ARRAY AND UPDATES IT----------------------------------------------//


export const updateCrew = (crewObj) => {
  return fetch(`${URL}/crews/${crewObj.id}`, {
      method: "PATCH",
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify(crewObj)
  })
      .then(response => response.json())
}