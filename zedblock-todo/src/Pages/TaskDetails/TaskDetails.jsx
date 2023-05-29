import axios from 'axios'
import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { api } from '../../Helper/Data'

export default function TaskDetails() {
  const location = useLocation()
  const [taskDetails, settaskDetails] = useState(location.state)
  const navigate = useNavigate()
  const deleteTask = (e) => {
    axios
      .post(api.url + "/delete-task", { id: taskDetails._id })
      .then(function (response) {
        // console.log(response);
        if (response.data.success) {
          navigate("/")
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  return (
    <div class="card mx-auto" style={{ width: "35rem" }}>
      <div class="card-body">
        <h5 class="card-title mb-3">{taskDetails.title}</h5>
        <p class="card-text">
          <strong>Description :</strong> {taskDetails.desc}
        </p>
        <Link to={"/edit-task"} state={taskDetails} class="btn btn-primary btn-sm px-5">Edit</Link>
        <button className='btn btn-secondary btn-sm px-5 mx-2' onClick={(e) => deleteTask(e)}>Delete</button>
      </div>
    </div>
  )
}
