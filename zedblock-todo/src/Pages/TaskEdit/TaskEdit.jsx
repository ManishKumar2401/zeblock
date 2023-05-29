import React from 'react'
import Grid from '@mui/material/Grid';
import { Button, TextField } from '@mui/material'
import { useLocation } from 'react-router-dom';

export default function TaskEdit() {
  const location = useLocation()
  const [formData, setFormData] = React.useState(location.state)

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const submitHandler = () => {
    if(formData.title && formData.desc){
      alert("Submit")
    }else{
      alert("All Fields are required")
    }
  }
  return (
    <div class="card mx-auto" style={{ width: "35rem" }}>
      <div class="card-body">
        <h5 class="card-title text-center mb-3">Edit Task</h5>
        <Grid container spacing={2}>
          <Grid item sm={12}>
            <TextField fullWidth label="Title" name='title' variant="outlined" value={formData.title} onChange={(e) => changeHandler(e)} />
          </Grid>
          <Grid item sm={12}>
            <TextField fullWidth label="Description" name='desc' value={formData.desc} multiline rows={8} variant="outlined" onChange={(e) => changeHandler(e)} />
          </Grid>
          <Grid item>
            <Button onClick={(e) => { submitHandler(e) }} variant="contained">Add</Button>
          </Grid>
        </Grid>
      </div>
    </div>
  )
}
