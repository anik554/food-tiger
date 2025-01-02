import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Divider,
  TextField,
  Typography,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import AuthContext from "../context/AuthContext";
import { verifyPassword } from "../utils/mainUtil";
import GoogleLogin from "../common/GoogleLogin";

const Register = () => {
  const navigate = useNavigate();
  const { createNewUser, userProfileUpdate } = useContext(AuthContext);
  const [errorMessage, setErrorMessage] = useState("");
  const [userInfo, setUserInfo] = useState({
    name: "",
    photoURL: "",
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      displayName: userInfo.name,
      photoURL: userInfo.photoURL,
    };
    console.log(payload);
    const validationMessage = verifyPassword(userInfo.password);
    setErrorMessage("");

    if (validationMessage !== "Password is valid") {
      setErrorMessage(validationMessage);
      return;
    }

    createNewUser(userInfo.email, userInfo.password)
      .then((result) => {
        console.log(result.user);
        userProfileUpdate(payload)
          .then(() => {
            console.log("User Profile Updated");
          })
          .catch((err) => {
            console.log(err);
          });
        navigate("/");
      })
      .catch((err) => {
        console.error(err);
      });
  };
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "calc(100vh - 85px)",
        overflow: "hidden",
      }}
    >
      <Card sx={{ width: { xs: "90%", lg: "40%" } }}>
        <CardContent>
          <Typography gutterBottom variant="h6">
            Create Your Account
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Enter Your Full Name"
              type="text"
              name="name"
              size="small"
              onChange={handleChange}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Photo URL"
              name="photoURL"
              type="url"
              size="small"
              onChange={handleChange}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Enter Your Email"
              name="email"
              type="email"
              size="small"
              onChange={handleChange}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Enter Your Password"
              name="password"
              type="password"
              size="small"
              onChange={handleChange}
              margin="normal"
            />
            {errorMessage && (
              <Typography variant="caption" color="red">
                {errorMessage}
              </Typography>
            )}
            <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
              Login
            </Button>
          </form>
          <Box sx={{ textAlign: "center", my: 3 }}>
            <Link underline="hover">Forgot your password?</Link>
            <Divider sx={{ my: 1 }}>
              <Chip label="or" size="small" />
            </Divider>
            <GoogleLogin />
            <Typography sx={{ my: 1 }}>
              Have an account?{" "}
              <Link to={"/login"} underline="hover">
                Login
              </Link>
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Register;
