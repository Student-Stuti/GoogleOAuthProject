import React from 'react'
import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

debugger
function UserHeader() {
    const navigate = useNavigate()

    // useEffect(() => {
    //   const token = localStorage.getItem("user");
    //   if (!token) {
    //     navigate('/login');
    //   }
    // }, [navigate]);
  
    useEffect(() => {
      const role = localStorage.getItem("Role");
      if (role !== "Admin") {
        console.log("navigating to user dashboard");
        navigate('/UserDashboard');
      }
    }, [navigate]);

    const handleLogout = (e) =>{
        localStorage.clear()
          navigate('/login')
          alert('Logout successful!!')
    }
  return (
     <nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container-fluid">
    <a className="navbar-brand" 
    href="/">
      UserDashboard
      </a>

    <button className="navbar-toggler"
     type="button" 
     data-bs-toggle="collapse"
      data-bs-target="#navbarSupportedContent" 
      aria-controls="navbarSupportedContent" 
      aria-expanded="false" 
      aria-label="Toggle navigation"
      >
        
      <span className="navbar-toggler-icon"></span>

    </button>
    <div className="collapse navbar-collapse"
     id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="/Home">
            Home
            </Link>
        </li>
        
      </ul>
      <form className="d-flex"
       role="logout"
       >
        
        <button className="btn btn-success" onClick={handleLogout}
        type="submit">
          Logout
          </button>
      </form>
    </div>
  </div>
</nav> 
  )
}

export default UserHeader