import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import "./Signup.css";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
// eslint-disable-next-line
import { firebaseapp } from "../fire_config";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


export const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const Register = async () => {
    const Auth = getAuth();
    await createUserWithEmailAndPassword(Auth, email, password)
      .then((res) => {
        if (res.operationType === "signIn") {
          navigate("/");
        }
      })
      .catch((error) => alert(error.code));
  };
  return (
    <>
      <div className="signup">
      <div className="avatar"> <Avatar  sx={{ m: 1,bgcolor: "secondary.main" }}>
            <LockOutlinedIcon/>
          </Avatar></div>
        <h2>Register</h2>
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
        <Button onClick={() => Register()} variant="contained" color="success">
          Register
        </Button>
        <br />
        <br />
        <a href="/">Have Account Already</a>
      </div>
    </>
  );
};
