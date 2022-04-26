import React from "react"
import { Link } from "react-router-dom"
import "./NavBar.css"


export const NavBar = (props) => {
  let tmp = JSON.parse(sessionStorage.getItem("nutshell_user"));
  let currentUserName = null
  if (tmp) {
    currentUserName = tmp.name;
  }
    
  return (
    <nav className="navbar">
      <ul className="nav">
        <div>
          {currentUserName
            ? <p>Hello, {currentUserName}</p>
            : ''
          }
        </div>
        <li className="nav-item">
          <Link className="nav-link" to="/home">Home</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/crews">Crews</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/hideouts">Hideouts</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/cronies">Cronies</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/heists">Heists</Link>
        </li>
        {props.isAuthenticated && <li className="nav-item">
          <Link className="nav-link" onClick={props.clearUser} to="/">Logout</Link>
        </li>}
        </ul>
    </nav>
  )
}
