
//----------------------------------------------BROUGHT TO YOU BY HOUSTON SMITH---------------------------------------------------------//



//----------------------------------------------DEFINES URL AS LOCAL HOST STRING---------------------------------------------------------//

const URL = "http://localhost:8088"


//-----------------------------------------RETRIEVES A LIST OF ALL CRONIES FROM THE API--------------------------------------------------//

export const getAllCronies = () => {
  return fetch (`${URL}/cronies`)
    .then(response => response.json())
}

//-----------------------------------------RETRIEVES A LIST OF CRONIES OF THE ACTIVE USER FROM THE API-----------------------------------//

export const getCroniesOfActiveUser = (userId) => {
  return fetch (`${URL}/cronies?userId=${userId}`)
    .then(response => response.json())
}

//-----------------------------------------RETRIEVES A LIST OF CRONIES OF THE ACTIVE CREW FROM THE API-----------------------------------//

export const getCroniesByCrew = (crewId) => {
  return fetch (`${URL}/cronies?crewId=${crewId}`)
    .then(response => response.json())
}


//------------------------------------------------RETRIEVES A CRONY BY THEIR ID----------------------------------------------------------//

export const getCronyById = (cronyId) => {
  return fetch(`${URL}/cronies/${cronyId}`)
  .then(res => res.json())
}


//--------------------------------------ADDS AN OBJECT TO THE CRONY ARRAY THROUGH THE API-----------------------------------------------//

export const addCrony = (newCrony) => {
  return fetch (`${URL}/cronies`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(newCrony)
  }).then(response => response.json())
}


//--------------------------------------TARGETS AN OBJECT IN THE CRONIES ARRAY AND DELETES IT----------------------------------------------//

export const deleteCrony = (id) => {
  return fetch(`${URL}/cronies/${id}`, {
    method: "DELETE"
  }).then(result => result.json())
}


//--------------------------------------TARGETS AN OBJECT IN THE CRONIES ARRAY AND UPDATES IT----------------------------------------------//


export const updateCrony = (cronyObj) => {
  return fetch(`${URL}/cronies/${cronyObj.id}`, {
      method: "PATCH",
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify(cronyObj)
  })
      .then(response => response.json())
}