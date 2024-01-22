import { Fragment, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { TextField } from "@mui/material";
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';

const schema = yup.object().shape({
  userName: yup.string()
  .required('Please Enter a username')
  .min(3, "Name must be at least 3 characters"),
  email: yup.string().required('Please Enter your Email').email(),
  password: yup.string().required('Please Enter your password').min(8).max(32)
  .matches(
    /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
      "Password must contain at least 8 characters, one uppercase, one number and one special case character"
  ),
});

const Roles = [
  {
    id:"0",
    option:"Select Role"
  },
  {
    id:"1",
    option:"Admin"
  },
  {
    id:"2",
    option:"User"
  }
]

function Register() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState(0);
  const[visible, setVisible] = useState(false);
  
debugger
  const { register, handleSubmit, formState: { errors } , reset} = useForm({
    resolver: yupResolver(schema),
  })

  const handleEmailChange = (value) => {
    setEmail(value);
  };
  const handleUserNameChange = (value) => {
    setUserName(value);
  };
  const handlePasswordChange = (value) => {
    setPassword(value);
  };
  const handleRoleChange = (value) => {
    setRole(value);
  };
 
  const onSubmitHandler =(data) =>{
    console.log(data);
    reset();
   
    const info = {
      Email : email,
      UserName : userName,
      password : password,
      enumUserRolesDto : role
    };
    const url = "https://localhost:7092/api/Controller/Register";
    axios
      .post(url, info)
      .then((result) => {
        console.log(result.data);
        
        //server side validations
        if (result.data.code === 400) {
          alert("User already exists");
        } else if (result.data.code === 500) {
          alert("Error creating user");
        } else if (result.data.code === 200) {
          alert("New user created successfully");
          console.log(result.data);
          navigate("/login");
        }
      })
      .catch((error) => {
        alert("Error creating user");
        console.log(error);
      });
  };

  return (
    
    <Fragment>
   <form  onSubmit={handleSubmit(onSubmitHandler)}>
      <div className="signup">
        <h1 className="heading">Register</h1>
        <p className="heading">Kindly fill in this form to register.</p>
        <br />
        <div className="form-outline mb-4">
        
        <TextField {...register("email",{
          required:true,
        })} 
        error={!!errors?.email}
        helperText={errors?.email?.message}
        label ="Email"
        className="form-control"
        size="small"
        onChange={(e) => handleEmailChange(e.target.value)} />
        </div>
        
        <div className="form-outline mb-4">
          <TextField {...register("userName" ,{required:true})} 
          error={!!errors?.userName}
          helperText={errors?.userName?.message}
          label="UserName"
          className="form-control"
          onChange={(e) => handleUserNameChange(e.target.value)}
           size="small"/>
        </div>
        
        <div className="form-outline mb-4">
        <TextField
        {...register("password")}
        error={!!errors?.password}
        helperText={errors?.password?.message}
        label="Password"
        type={visible ? "text" : "password"} // Toggle visibility
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
        <div className="form-outline mb-4">
        <select
          className="form-control"
          id="form3Example1"
          name="role"
          value={role}
          onChange={(e) => handleRoleChange(parseInt(e.target.value))}
          
        >
          {Roles.map((item)=>(
            <option key={item.id} value={item.id}>{item.option}</option>
          ))}
        </select>
        </div>
        
      
        <button type="submit" className="btns">Register</button>
        <br/>
        
        <p >Already have a account?<Link to={"/login"} >Login</Link></p>
        </div>
        </form>
    </Fragment>
  );
}
export default Register;
