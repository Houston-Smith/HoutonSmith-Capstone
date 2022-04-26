//----------------------------------------------BROUGHT TO YOU BY HOUSTON SMITH---------------------------------------------------------//



//----------------------------------------------DEFINES URL AS LOCAL HOST STRING---------------------------------------------------------//

const URL = "http://localhost:8088"


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