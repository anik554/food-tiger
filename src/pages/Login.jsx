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
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import AuthContext from "../context/AuthContext";
import GoogleLogin from "../common/GoogleLogin";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { loginUser } = useContext(AuthContext);
  const [userInfo, setUserInfo] = useState({
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
    loginUser(userInfo.email, userInfo.password)
      .then((result) => {
        console.log(result.user);
        navigate(location.state || "/");
      })
      .catch((err) => {
        console.log(err);
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
            Login your profile
          </Typography>
          <form onSubmit={handleSubmit}>
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
              Don&#39;t have an account?{" "}
              <Link to={"/register"} underline="hover">
                Create Account
              </Link>
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Login;
