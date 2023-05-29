import React, { useEffect } from 'react'
import style from './style.module.css'
import { Button } from '@mui/material'
import ButtonGroup from '@mui/material/ButtonGroup';
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
  const [taskList, setTaskList] = React.useState([])
  const [filterValue, setFilterValue] = React.useState("all")

  useEffect(() => {
    axios
      .post(api.url + "/taskList", { filter: filterValue })
      .then(function (response) {
        // console.log(response);
        if (response.data.success) {
          setTaskList(response.data.tasks)
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [filterValue, isLoading])


  const changeStatus = (e, id) => {
    setIsLoading(!isLoading)
    axios
      .post(api.url + "/change-status", { isComplete: e.target.checked, id: id })
      .then(function (response) {
        console.log(response.data);
        if (response.data.success) {
          setIsLoading(!isLoading)
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
          <ButtonGroup variant="outlined" aria-label="text button group">
            <Button variant="contained">Filter : </Button>
            <Button onClick={(e)=> setFilterValue("all") }>All</Button>
            <Button onClick={(e)=> setFilterValue("active") }>Active</Button>
            <Button onClick={(e)=> setFilterValue("completed") }>Completed</Button>
          </ButtonGroup>
        </div>
        <Button onClick={(e) => { navigate("/add-task") }} variant="outlined">Add Task</Button>
      </div>
      <div className={style.taskLint + " py-3"}>
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
                  <FormControlLabel control={<Checkbox onChange={(e) => { changeStatus(e, el._id) }} checked={el.isComplete} />} label="Complete" />
                </CardActions>
              </Card>
            </div>
          }) : ""}
        </div>
      </div>
    </div>
  )
}
