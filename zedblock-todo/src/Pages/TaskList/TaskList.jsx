import React, { useEffect } from 'react'
import style from './style.module.css'
import { Alert, Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { api } from '../../Helper/Data'
import axios from 'axios';

export default function TaskList() {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = React.useState(false)
  const [isDeleted, setIsDeleted] = React.useState(false)
  const [taskList, setTaskList] = React.useState([])
  const [backupList, setBackupList] = React.useState([])
  const [filterValue, setFilterValue] = React.useState("all")
  const [searchValue, setSearchValue] = React.useState("")

  useEffect(() => {
    axios
      .post(api.url + "/taskList", { filter: filterValue, search: searchValue })
      .then(function (response) {
        // console.log(response);
        if (response.data.success) {
          setTaskList(response.data.tasks)
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [filterValue, isLoading, searchValue, isDeleted])

  const searchTask = (e) => {
    setSearchValue(e.target.value)
  }

  const removeCompleted = (e) => {
    // let filtered = 
    setBackupList(taskList.filter((el) => el.isComplete === true))
    axios
      .post(api.url + "/delete-completed", { filter: "filterValue" })
      .then(function (response) {
        // console.log(response);
        if (response.data.success) {
          setTaskList(taskList.filter((el) => el.isComplete !== true))
          setIsDeleted(true)
        } else {
          alert("No completed tasks for delete.")
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  const undoDelete = (e) => {
    axios
      .post(api.url + "/undon-delete", { data: backupList })
      .then(function (response) {
        // console.log(response);
        if (response.data.success) {
          setIsDeleted(false)
        } else {
          alert("No completed tasks for delete.")
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  const changeStatus = (e, id) => {
    setIsLoading(true)
    axios
      .post(api.url + "/change-status", { isComplete: e.target.checked, id: id })
      .then(function (response) {
        console.log(response.data);
        if (response.data.success) {
          setIsLoading(false)
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  return (
    <div>
      <div className={style.actionMenu}>
        <div>
          <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
            <InputLabel id="demo-simple-select-label">Filter</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Filter"
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
            >
              <MenuItem value={"all"}>All</MenuItem>
              <MenuItem value={"completed"}>Completed</MenuItem>
              <MenuItem value={"active"}>Active</MenuItem>
            </Select>
          </FormControl>
        </div>
        <TextField id="outlined-search" label="Search Task" size="small" type="search" onChange={(e) => { searchTask(e) }} />
        
        <Button onClick={(e) => { removeCompleted(e) }} variant="outlined">Remove Completed</Button>
        <Button onClick={(e) => { navigate("/add-task") }} variant="outlined">Add Task</Button>
      </div>

      <div className={style.taskLint + " py-3"}>
        <h4>Tasks List : </h4>
        <div className='row g-2'>
          {taskList.length ? taskList.map((el, i) => {
            return <div className='col-md-4 col-sm-6' key={i}>
              <Card className='px-2 w-100'>
                <CardContent>
                  <Typography gutterBottom variant="h6" component="div">
                    <Link to={"/task-details"} state={el}>{el.title}</Link>
                  </Typography>
                </CardContent>
                <CardActions>
                  <FormControlLabel disabled={isLoading} control={<Checkbox onChange={(e) => { changeStatus(e, el._id) }} checked={el.isComplete} />} label="Complete" />
                </CardActions>
              </Card>
            </div>
          }) : ""}
          {isDeleted ? <Alert
            action={
              <Button color="inherit" size="small" onClick={(e) => { undoDelete(e) }}>UNDO</Button>
            }
          >
            This is a success alert — check it out!
          </Alert> : ''}
        </div>
      </div>
    </div>
  )
}
