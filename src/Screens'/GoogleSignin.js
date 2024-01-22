import React from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import axios from "axios"; 
import { useNavigate } from "react-router-dom";

function GoogleSignin() {
  const navigate = useNavigate();
  const credentialResponse = (response) =>
 {
   console.log(response);
   const data ={
    Provider:'GOOGLE',
     IdToken:response.credential
  };
  const url = 'https://localhost:7092/api/Controller/ExternalLogin';
  axios.post(url,data).then((result) =>{
    if(result.data.isAuthSuccessful === true)
    console.log(result.data);
    const token = result.data.token  
    localStorage.setItem('user', token);  
    console.log(token); 
    console.log("Successful !!")
    navigate('/UserDashboard');
    alert('Login Successful !!')
    
    
  }).catch((error)=>{
    console.log(error);
    console.log("Error while Logging in")
  })

 }
  return (
    <div
      style={{
        display: "flex",
        flex: 1,
        height: "100vh",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <GoogleOAuthProvider clientId="638140716004-jvjhsocqcin9hdb879a65i4bhtmjcr0i.apps.googleusercontent.com">
  <GoogleLogin
  onSuccess={credentialResponse}
  onFaliure={credentialResponse}
/>  </GoogleOAuthProvider>
    </div>
  );
}

export default GoogleSignin;