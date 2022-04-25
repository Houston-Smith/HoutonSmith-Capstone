import React, { useState, useEffect } from "react";
import {useNavigate, useParams} from "react-router-dom";
import { getTaskById, updateTask } from "./TaskManager";
import { getCrewById } from "../../modules/CrewManager";

export const CrewEditForm = () => {
  const [crew, setCrew] = useState({ name: "", desription: "" });
  const [isLoading, setIsLoading] = useState(false);

  const {crewId} = useParams();
  const navigate = useNavigate();

  const handleFieldChange = evt => {
    const stateToChange = { ...task };
    stateToChange[evt.target.id] = evt.target.value;
    setTask(stateToChange);
  };

  const updateExistingTask = evt => {
    evt.preventDefault()
    setIsLoading(true);

    // default values for locationId and customerId
    // if you already have these components/modules in place, you will need to include the correct information
    const editedTask = {
      id: taskId,
      name: task.name,
      date: task.date,
	    isComplete: false,
	    userId: task.userId
    };

  //pass the editedAnimal object to the database
  updateTask(editedTask)
    .then(() => navigate("/tasks")
    )
  }

  useEffect(() => {
    getCrewById(crewId)
      .then(crew => {
        setCrew(crew);
        setIsLoading(false);
      });
  }, []);

  const ClickCancel = (event) => {
    navigate("/tasks")
  }
  
  return (
    <>
      <form className="taskForm">

      <h2>Update A Task</h2>

			<fieldset>
				<div className="form-group">
					<label htmlFor="name">Task:</label>
					<input type="text" id="name" onChange={handleFieldChange} required autoFocus className="form-control" placeholder="Task name" value={task.name} />
				</div>
			</fieldset>

      <fieldset>
				<div className="form-group">
					<label htmlFor="date">Complete By:</label>
					<input type="date" id="date" onChange={handleFieldChange} required className="form-control" placeholder="Event date" value={task.date} />
				</div>
			</fieldset>

      <div className="buttons">
        <button type="button" disabled={isLoading} className="btn btn-primary"
          onClick={updateExistingTask}>
          Update
            </button>

            <button type="button" disabled={isLoading} className="btn btn-primary"
          onClick={ClickCancel}>
          Cancel
            </button>   
      </div>
    </form>
  </>
  );
}