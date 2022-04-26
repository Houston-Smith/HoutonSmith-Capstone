import React from "react"
import { Routes, Route, Outlet, Navigate } from "react-router-dom"
import { Home } from "./home/Home"
import { Login } from "./auth/Login"
import { Register } from "./auth/Register"
import { Crews } from "./crews/Crews"
import { CrewForm } from "./crews/CrewForm"
import { CrewEditForm } from "./crews/CrewEditForm"
import { Hideouts } from "./hideouts/Hideouts"
import { HideoutForm } from "./hideouts/HideoutForm"
import { HideoutEditForm } from "./hideouts/HideoutEditForm"

export const ApplicationViews = ({setAuthUser, isAuthenticated, setIsAuthenticated}) => {
  const PrivateOutlet = () => {
		return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
	}
  
  // const setAuthUser = (user) => {
	// 	sessionStorage.setItem("nutshell_user", JSON.stringify(user))
	// 	setIsAuthenticated(sessionStorage.getItem("nutshell_user") !== null)
	// }
  
  return (
    <>
    <Routes>
      <Route path="/" element={<PrivateOutlet/>} >
      <Route path="/home" element={<Home/>}/>

      <Route path="/crews" element={<Crews/>}/>
      <Route path="/crews/add" element={<CrewForm/>}/>
      <Route path="/crews/:crewId/edit" element={<CrewEditForm/>}/>

      <Route path="/hideouts" element={<Hideouts/>}/>
      <Route path="/hideouts/add" element={<HideoutForm/>}/>
      <Route path="/hideouts/:hideoutId/edit" element={<HideoutEditForm/>}/>

      </Route>
      <Route path="/login" element={<Login setAuthUser={setAuthUser}/> }/>
      <Route path="/register" element={<Register/> }/>
    </Routes>
    </>
  )
}