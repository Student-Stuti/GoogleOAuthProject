import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from 'react-bootstrap/Button';
import AdminHeader from './AdminHeader';
//import { Link } from 'react-router-dom';

function Home() {
  const navigate = useNavigate()

  // Here we get the token from local storage if there is no token then it will navigate to login 
  //If token exists in localstorage then we will stay on home page
  useEffect(()=>{
    const token =localStorage.getItem("user")
    if(!token){
      navigate('/login')
    }
  })

  return (
    <>
<AdminHeader/>
  <h2 className='center'>Home</h2>
  

  
      </>
  )
}

export default Home