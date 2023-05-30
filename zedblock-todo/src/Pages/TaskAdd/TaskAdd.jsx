import React, { useState } from 'react'
import Grid from '@mui/material/Grid';
import { Button, TextField } from '@mui/material'
import axios from 'axios';
import { api } from '../../Helper/Data';
import { useNavigate } from 'react-router-dom';
import { getCookie } from '../../Helper/Cokkies';

export default function TaskAdd() {
  const [formData, setFormData] = React.useState({ title: "", desc: "", isComplete: false })
  const navigate = useNavigate()
  const token = getCookie('token')

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const formValidate = () => {
    if ((formData.title.length && formData.title.length < 50) && (formData.desc.length && formData.desc.length < 120)) {
      return false
    } else {
      return true
    }
  }


  const submitHandler = () => {
    if (formData.title && formData.desc) {
      axios
        .post(api.url + "/add-task", formData, { headers: { authorization: "Bearer " + token } })
        .then(function (response) {
          // console.log(response);
          if (response.data.success) {
            navigate("/")
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
      alert("All Fields are required")
    }
  }

  return (
    <div className="card mx-auto" style={{ width: "35rem" }}>
      <div className="card-body">
        <h5 className="card-title text-center mb-3">Add Task</h5>
        <Grid container spacing={2}>
          <Grid item sm={12}>
            <TextField fullWidth label="Title" name='title' helperText={"Max 50 Characters are allow"} variant="outlined" onChange={(e) => changeHandler(e)} />
          </Grid>
          <Grid item sm={12}>
            <TextField fullWidth label="Description" helperText={"Max 256 Characters are allow"} name='desc' multiline rows={6} variant="outlined" onChange={(e) => changeHandler(e)} />
          </Grid>
          <Grid item>
            <Button disabled={formValidate()} onClick={(e) => { submitHandler(e) }} variant="contained">Add</Button>
          </Grid>
        </Grid>
      </div>
    </div>
  )
}
