import { Box, Button } from "@mui/material";
import { useContext } from "react";
import GoogleIcon from "@mui/icons-material/Google";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const GoogleLogin = () => {
  const navigate = useNavigate();
  const { signInGoogle } = useContext(AuthContext);

  const handleGoogleLogin = () => {
    signInGoogle()
      .then((result) => {
        console.log(result.user);
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Box component={"div"}>
      <Button
        fullWidth
        variant="outlined"
        sx={{ my: 1 }}
        startIcon={<GoogleIcon />}
        onClick={handleGoogleLogin}
      >
        {" "}
        Login with Google
      </Button>
    </Box>
  );
};

export default GoogleLogin;
