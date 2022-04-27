
//----------------------------------------------BROUGHT TO YOU BY HOUSTON SMITH---------------------------------------------------------//



//----------------------------------------------DEFINES URL AS LOCAL HOST STRING---------------------------------------------------------//

const URL = "http://localhost:8088"


//-----------------------------------------RETRIEVES A LIST OF ALL HEISTS FROM THE API--------------------------------------------------//

export const getAllHeists = () => {
  return fetch (`${URL}/heists`)
    .then(response => response.json())
}

//-----------------------------------------RETRIEVES A LIST OF HEISTS OF THE ACTIVE USER FROM THE API-----------------------------------//

export const getHeistsOfActiveUser = (userId) => {
  return fetch (`${URL}/heists?managerId=${userId}`)
    .then(response => response.json())
}



//------------------------------------------------RETRIEVES A HEIST BY ITS ID----------------------------------------------------------//

export const getHeistById = (heistId) => {
  return fetch(`${URL}/heists/${heistId}`)
  .then(res => res.json())
}

//-----------------------------------------RETRIEVES A LIST OF HEISTS OF THE ACTIVE CREW FROM THE API-----------------------------------//

export const getHeistsByCrew = (crewId) => {
  return fetch (`${URL}/heists?crewId=${crewId}`)
    .then(response => response.json())
}

//--------------------------------------ADDS AN OBJECT TO THE HEIST ARRAY THROUGH THE API-----------------------------------------------//

export const addHeist = (newHeist) => {
  return fetch (`${URL}/heists`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(newHeist)
  }).then(response => response.json())
}


//--------------------------------------TARGETS AN OBJECT IN THE HEISTS ARRAY AND DELETES IT----------------------------------------------//

export const deleteHeist = (id) => {
  return fetch(`${URL}/heists/${id}`, {
    method: "DELETE"
  }).then(result => result.json())
}


//--------------------------------------TARGETS AN OBJECT IN THE HEISTS ARRAY AND UPDATES IT----------------------------------------------//


export const updateHeist = (heistObj) => {
  return fetch(`${URL}/heists/${heistObj.id}`, {
      method: "PATCH",
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify(heistObj)
  })
      .then(response => response.json())
}