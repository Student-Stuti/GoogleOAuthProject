import React, { useState } from "react";
import axios from "axios";
import { TextField } from "@mui/material";
debugger
const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://localhost:7092/api/Controller/forgot-password",
        {
          email: email,
          clientAppUrl: "http://localhost:3000/ForgetPassword",
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        console.log("Email sent successfully.");
      } else {
        console.error("Error sending email.");
      }
    } catch (error) {
      console.error("An error occurred:", error.message);
    }
  };

  return (
    <div>
      <div className="signup">
      <h2 className="heading">Forgot Password</h2>
      <br></br>
      <form onSubmit={handleSubmit}>
        {/* <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        /> */}
        <div className="form-outline mb-4">
        
        <TextField 
        // {...register("email",{
        //   required:true,
        // })} 
        // error={!!errors?.email}
        // helperText={errors?.email?.message}
        label ="Email"
        className="form-control"
        size="small"
        onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="form-actions text-center">
        <button className="button btn-secondry" type="submit">Reset Password</button>
        </div>
      </form>
    </div>
    </div>
  );
};

export default ForgotPassword;
