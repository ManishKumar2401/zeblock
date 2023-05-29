import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import Navbar from '../Components/Navbar/Navbar'
import Footer from '../Components/Footer/Footer'
import style from './style.module.css'
import { getCookie } from '../Helper/Cokkies'
import { removeLocalStorage } from '../Helper/LocalStorage'

export default function Main() {
  let token = getCookie("token")
  if(token === undefined){
    removeLocalStorage('user')
    return <Navigate to={'/login'} />
  } 

  return (
    <div>
      <Navbar />
      <div className={style.main}>
        <Outlet />
      </div>
      <Footer />
    </div>
  )
}
