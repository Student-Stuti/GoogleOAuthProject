import React from 'react'
import UserHeader from './UserHeader'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'

  function UserDashboard() {
    const navigate = useNavigate()
    
    useEffect(() => {
      const role = localStorage.getItem("Role");
      if (role !== "Admin") {
        console.log("navigating to user dashboard");
        navigate('/UserDashboard');
      }
    }, [navigate]);
  return (
    <UserHeader/>
  )
}

export default UserDashboard