import { Button } from '@mui/material'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { removeLocalStorage } from '../../Helper/LocalStorage'
import { removeCookie } from '../../Helper/Cokkies'
import style from './style.module.css'

export default function Navbar() {
  const navigate = useNavigate()
  const logout=()=>{
    removeLocalStorage('user')
    removeCookie('token')
    navigate('/login')
  }
  return (
    <div className={'p-2 ' + style.navBar}>
        <h4><Link to={'/'}>Task Management</Link></h4>
        <Button onClick={(e)=>{ logout(e)}}>Logout</Button>
    </div>
  )
}
