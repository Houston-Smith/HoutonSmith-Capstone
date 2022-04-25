import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./Login.css";

export const Register = () => {
	const [registerUser, setRegisterUser] = useState({
		name: "",
		password: "",
	});
	const [conflictDialog, setConflictDialog] = useState(false);

	const navigate = useNavigate();

	const handleInputChange = (event) => {
		const newUser = { ...registerUser };
		newUser[event.target.id] = event.target.value;
		setRegisterUser(newUser);
	};

	const existingUserCheck = () => {
		// If your json-server URL is different, please change it below!
		return fetch(`http://localhost:8088/managers?password=${registerUser.password}`)
			.then((res) => res.json())
			.then((user) => !!user.length);
	};

	const handleRegister = (e) => {
		e.preventDefault();

		existingUserCheck().then((userExists) => {
			if (!userExists) {
				// If your json-server URL is different, please change it below!
				fetch("http://localhost:8088/managers", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						name: registerUser.name,
						password: registerUser.password,
					}),
				})
					.then((res) => res.json())
					.then((createdUser) => {
						if (createdUser.hasOwnProperty("id")) {
							// The user id is saved under the key nutshell_user in session Storage. Change below if needed!
							sessionStorage.setItem("nutshell_user", createdUser.id);
							navigate("/");
						}
					});
			} else {
				setConflictDialog(true);
			}
		});
	};

	return (
		<main style={{ textAlign: "center" }}>
			<dialog className="dialog dialog--password" open={conflictDialog}>
				<div>Account with that password already exists</div>
				<button
					className="button--close"
					onClick={(e) => setConflictDialog(false)}
				>
					Close
				</button>
			</dialog>

			<form className="form--login" onSubmit={handleRegister}>
				<h1 className="h3 mb-3 font-weight-normal">
					Please Register for Application Name
				</h1>
				<fieldset>
					<label htmlFor="name"> Name </label>
					<input
						type="text"
						name="name"
						id="name"
						className="form-control"
						placeholder="Name"
						required
						autoFocus
						value={registerUser.name}
						onChange={handleInputChange}
					/>
				</fieldset>
		
				<fieldset>
					<label htmlFor="inputPassword"> Create a Password </label>
					<input
						type="password"
						name="password"
						id="password"
						className="form-control"
						placeholder="Password"
						required
						value={registerUser.password}
						onChange={handleInputChange}
					/>
				</fieldset>
				<fieldset>
					<button type="submit"> Sign Up </button>
				</fieldset>
			</form>
		</main>
	);
};