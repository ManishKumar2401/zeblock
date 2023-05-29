import React from 'react'
import { Button, TextField } from '@mui/material'
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Grid from '@mui/material/Grid';
import {setLocalStorage} from '../../Helper/LocalStorage'
import {setCookie} from '../../Helper/Cokkies'
import {api} from '../../Helper/Data'
import axios from 'axios';

export default function Login() {
    const [showPassword, setShowPassword] = React.useState(false);
    const [formData, setFormData] = React.useState({password:"", email:""})
    const handleClickShowPassword = () => setShowPassword((show) => !show);
  
    const handleMouseDownPassword = (event) => {
      event.preventDefault();
    };

    const changeHandler =(e)=>{
      setFormData({...formData, [e.target.name] : e.target.value})
    }

    const submitHandler =(e)=>{
      let validPass = /^(?=.*?[A-Z])(?=.*?[a-z]).{6,}$/
      let validEmail = /^[ ]*([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})[ ]*$/i;
      if(formData.password && formData.email){
        if(validEmail.test(formData.email)){
          if(validPass.test(formData.password)){
            axios
            .post(api.url + "/login", formData)
            .then(function (response) {
              // console.log(response);
              if (response.data) {
                setLocalStorage("user", { name: response.data.fullname, username: response.data.username, id: response.data.id, email: response.data.email, role: response.data.role });
                setCookie("token", response.data.token, 1);
                window.location.replace("/");
              }
            })
            .catch(function (error) {
              console.log(error);
            });
          }else{
            alert("Password should have min 6 char, 1 uppercase & 1 lowercase ")
          }
        }else{
          alert("Email is not valid")
        }
      }else{
        alert("Both field are required")
      }
    }

  return (
    <div className="row align-items-center vh-100 w-100">
      <div class="card mx-auto" style={{ width: "35rem" }}>
        <div class="card-body">
        <h5 class="card-title text-center mb-3">LOGIN</h5>
          <Grid container spacing={2}>
            <Grid item sm={12}>
              <TextField fullWidth name='email' label="Email"  onChange={(e)=> changeHandler(e)} variant="outlined" />
            </Grid>
            <Grid item sm={12}>
              <FormControl fullWidth variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                <OutlinedInput
                onChange={(e)=> changeHandler(e)}
                  type={showPassword ? 'text' : 'password'}
                  name='password'
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Password"
                />
              </FormControl>
            </Grid>
            <Grid item>
            <Button onClick={(e)=>{submitHandler(e)}} variant="contained">Login</Button>
            </Grid>
          </Grid>
        </div>
      </div>
    </div>
  )
}
