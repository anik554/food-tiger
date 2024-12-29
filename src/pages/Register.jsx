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
import { Link } from "react-router-dom";
import GoogleIcon from "@mui/icons-material/Google";
import { useState } from "react";

const Register = () => {
  const [userInfo, setUserInfo] = useState({
    name: "",
    photoURL: "",
    email: "",
    password: "",
  });
  console.log(userInfo);
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
      name: userInfo.name,
      photoURL: userInfo.photoURL,
      email: userInfo.email,
      password: userInfo.password,
    };
    console.log(payload);
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
            <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
              Login
            </Button>
          </form>
          <Box sx={{ textAlign: "center", my: 3 }}>
            <Link underline="hover">Forgot your password?</Link>
            <Divider sx={{ my: 1 }}>
              <Chip label="or" size="small" />
            </Divider>
            <Button
              fullWidth
              variant="outlined"
              sx={{ my: 1 }}
              startIcon={<GoogleIcon />}
            >
              {" "}
              Login with Google
            </Button>
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

export default Register;
