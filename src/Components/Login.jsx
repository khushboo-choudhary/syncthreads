import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import "./Login.css";
import { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
// eslint-disable-next-line
import { firebaseapp } from "../fire_config";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const Submit = async () => {
    const Auth = getAuth();
    await signInWithEmailAndPassword(Auth, email, password)
      .then((res) => {
        console.log(res._tokenResponse.refreshToken);
        sessionStorage.setItem("Token", res._tokenResponse.refreshToken);
        navigate("/home");
      })
      .catch((error) => {
        alert(error.code);
      });
  };
  return (
    <>
   
    
      <div className="login">
         <div className="avatar"> <Avatar  sx={{ m: 1,bgcolor: "secondary.main" }}>
            <LockOutlinedIcon/>
          </Avatar></div>
        <h2>Login</h2>
        <TextField
          onChange={(e) => setEmail(e.target.value)}
          className="outlined_basic"
          label="Email"
          variant="outlined"
        />
        <TextField
          onChange={(e) => setPassword(e.target.value)}
          className="outlined_basic"
          label="Password"
          variant="outlined"
          type={"password"}
        />
        <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
        <br />
        <br />
        <Button
          onClick={() => Submit()}
          variant="contained"
          color="success"
        >
          Login
        </Button>
        <br />
        <br />
        <a href="/signup">Don't Have Account</a>
      </div>
      
    </>
  );
};
