import React from "react";
import { Fragment, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { TextField } from "@mui/material";
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';


const Schema = yup.object().shape({
  userName : yup.string()
  .required('Please enter a username')
  .min(3, "Name must be at least 3 characters"),
  password: yup.string().min(8).max(32)
  .required('Please Enter your password')
  .matches(
    /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
    "Password must contain at least 8 characters, one uppercase, one number and one special case character"
  ),
}).required()
function Login() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState("");
  const[visible, setVisible] = useState(false);
  const {register , handleSubmit, formState:{errors} , reset}= useForm({resolver: yupResolver(Schema)});
  
  const handleUserNameChange = (value) => {
    setUserName(value);
  };

  const handlePasswordChange = (value) => {
    setPassword(value);
  };
  
  

  const onSubmit =(data) =>{
    console.log(data);
    reset();
    
    const payload = {
      userName: userName,
      password: password,
    };

    const url = "https://localhost:7092/api/Controller/login";
    axios
      .post(url, payload)
      .then((result) => {
        console.log(result.data);
        if (result.data.code === 500) {
          alert("User not found");
        }
        if (result.data.code === 404) {
          alert("Wrong Password");
        }
        if (result.data.code === 200) {
          alert("Login successful");
          const token = result.data.token;
          const userRole = result.data.roles[0]; 
          console.log(userRole);
          // Update localStorage with user role
          localStorage.setItem("Role", userRole);

          setUser(token);
          console.log(token);
          
  
          if (userRole === "Admin") {
            console.log("Navigating to admin dashboard");
            navigate("/AdminDashboard")
            
          } else {
            console.log("Navigating to user dashboard");
            navigate("/UserDashboard")
            

          }
          localStorage.setItem("user", JSON.stringify(token));
        }
      })
    
      .catch((error) => {
        alert(error);
      });
  }

  return (
    <Fragment>
      <div>
      <h3 className="login">SIGN IN</h3>
      <div className="img">
        <img
          src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
          className="img-fluid"
          alt="Sample "
        />
      </div>
      <form  onSubmit={handleSubmit(onSubmit)}>

      <div className="outcard">
        
        <div class="form-outline mb-4">
          <TextField 
          label = "UserName"
          {...register("userName" ,{
            required:true
          })}
            error={!!errors?.userName}
            helperText={errors?.userName?.message}
             className="form-control"
            size="small"
            onChange={(e) => handleUserNameChange(e.target.value)}/>
        </div>
        <div className="form-outline mb-4">
       
        
        <TextField
                {...register("password", {
                  required: true
                })}
                label="Password"
                type={visible ? "text" : "password"} // Toggle visibility
                error={!!errors?.password}
                helperText={errors?.password?.message}
                size="small"
                className="form-control"
                onChange={(e) => handlePasswordChange(e.target.value)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => setVisible(!visible)}
                        edge="end"
                      >
                        {visible ? <VisibilityOffIcon /> : <RemoveRedEyeIcon />}
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
      
      </div>
    

       <div className="d-flex justify-content-between align-items-center">
            {/* Checkbox  */}
            <div className="form-check mb-0">
              <input className="form-check-input me-2" type="checkbox" value="" id="form2Example3" />
              <label className="form-check-label" for="form2Example3">
                Remember me
              </label>
            </div>
            <Link className="text-body" to="/ForgetPassword">
            Forget Password ?
            </Link>
          </div>

        <br/>
        <button className="btns" type="submit">Login</button>
        <br/>
        <br/>
        <div className="flex-container">
       <div>
        <Button
          type="button"
          className= "btn"
          onClick={() => navigate("/googlesignin")}
        >
          <i className="fab fa-google"></i>  Google
        </Button>
        </div>

        <div className="register">
        
          < Link  to={"/register"}>
            Register here
          </Link>
        
        </div>
        </div>
      </div>
      </form>
      </div>
    </Fragment>
  );
}

export default Login;