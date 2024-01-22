import React from 'react'
import AdminHeader from './AdminHeader'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'


  function AdminDashboard() {
    const navigate = useNavigate()
    useEffect(() => {

      const role = localStorage.getItem("Role");
      if (role !== "Admin") {
        console.log("navigating to user dashboard");
        navigate('/UserDashboard');
      }
    }, [navigate]);
  return (
    <AdminHeader/>
  )
}

export default AdminDashboard