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

const Login = () => {
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
          <form action="">
            <TextField fullWidth label="Email" size="small" margin="normal" />
            <TextField fullWidth label="Password" size="small" />
            <Button variant="contained" fullWidth sx={{ mt: 2 }}>
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
              Don&#39;t have an account? <Link to={"/register"}  underline="hover">Create Account</Link>
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Login;
