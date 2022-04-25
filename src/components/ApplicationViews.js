import React from "react"
import { Routes, Route, Outlet, Navigate } from "react-router-dom"
import { Home } from "./home/Home"
import { Login } from "./auth/Login"

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
      </Route>
      <Route path="/login" element={<Login setAuthUser={setAuthUser}/> }/>
    </Routes>
    </>
  )
}