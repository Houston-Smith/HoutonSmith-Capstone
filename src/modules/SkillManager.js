
//----------------------------------------------BROUGHT TO YOU BY HOUSTON SMITH---------------------------------------------------------//


//----------------------------------------------DEFINES URL AS LOCAL HOST STRING---------------------------------------------------------//

const URL = "http://localhost:8088"


//-----------------------------------------RETRIEVES A LIST OF ALL HIDEOUTS FROM THE API--------------------------------------------------//

export const getAllSkills = () => {
  return fetch (`${URL}/skills`)
    .then(response => response.json())
}
