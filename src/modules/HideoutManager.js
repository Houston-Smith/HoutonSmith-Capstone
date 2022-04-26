
//----------------------------------------------BROUGHT TO YOU BY HOUSTON SMITH---------------------------------------------------------//



//----------------------------------------------DEFINES URL AS LOCAL HOST STRING---------------------------------------------------------//

const URL = "http://localhost:8088"


//-----------------------------------------RETRIEVES A LIST OF ALL HIDEOUTS FROM THE API--------------------------------------------------//

export const getAllHideouts = () => {
  return fetch (`${URL}/hideouts`)
    .then(response => response.json())
}

//-----------------------------------------RETRIEVES A LIST OF HIDEOUTS OF THE ACTIVE USER FROM THE API-----------------------------------//

export const getHideoutsOfActiveUser = (userId) => {
  return fetch (`${URL}/hideouts?managerId=${userId}`)
    .then(response => response.json())
}


//------------------------------------------------RETRIEVES A HIDEOUT BY THEIR ID----------------------------------------------------------//

export const getHideoutById = (hideoutId) => {
  return fetch(`${URL}/hideouts/${hideoutId}`)
  .then(res => res.json())
}


//--------------------------------------ADDS AN OBJECT TO THE HIDEOUT ARRAY THROUGH THE API-----------------------------------------------//

export const addHideout = (newHideout) => {
  return fetch (`${URL}/hideouts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(newHideout)
  }).then(response => response.json())
}


//--------------------------------------TARGETS AN OBJECT IN THE HIDEOUTS ARRAY AND DELETES IT----------------------------------------------//

export const deleteHideout = (id) => {
  return fetch(`${URL}/hideouts/${id}`, {
    method: "DELETE"
  }).then(result => result.json())
}


//--------------------------------------TARGETS AN OBJECT IN THE HIDEOUTS ARRAY AND UPDATES IT----------------------------------------------//


export const updateHideout = (hideoutObj) => {
  return fetch(`${URL}/hideouts/${hideoutObj.id}`, {
      method: "PATCH",
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify(hideoutObj)
  })
      .then(response => response.json())
}