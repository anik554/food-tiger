import * as React from "react";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Avatar,
  Button,
  Tooltip,
  MenuItem,
} from "@mui/material";
import { NavLink } from "react-router-dom";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import MenuIcon from "@mui/icons-material/Menu";
import AuthContext from "../context/AuthContext";

const settings = ["Profile", "Account", "Dashboard", "Logout"];
const pages = [
  { name: "Home", path: "/" },
  { name: "Available Foods", path: "/available-foods" },
  { name: "Add Food", path: "/add-food" },
  { name: "Manage My Foods", path: "/manage-my-foods" },
  { name: "My Food Request", path: "/my-food-request" },
];

function Navbar() {
  const { user, logoutUser } = React.useContext(AuthContext);
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleSignOut = () => {
    logoutUser()
      .then(() => {
        console.log("Logout succefully");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* Logo for desktop */}
          <FastfoodIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Food Tiger
          </Typography>

          {/* Responsive menu for mobile */}
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="open navigation menu"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: "block", md: "none" } }}
            >
              {pages.map((page) => (
                <NavLink
                  key={page.name}
                  to={page.path}
                  style={{ textDecoration: "none" }}
                  className={({ isActive }) =>
                    isActive ? "active" : "inactive"
                  }
                >
                  <MenuItem onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">{page.name}</Typography>
                  </MenuItem>
                </NavLink>
              ))}
            </Menu>
          </Box>

          {/* Logo for mobile */}
          <FastfoodIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Food Tiger
          </Typography>

          {/* Navigation links for desktop */}
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <NavLink
                key={page.name}
                to={page.path}
                style={{ textDecoration: "none" }}
                className={({ isActive }) => (isActive ? "active" : "inactive")}
              >
                <Button
                  onClick={handleCloseNavMenu}
                  sx={{
                    my: 2,
                    color: "white",
                    display: "block",
                    backgroundColor: ({ isActive }) =>
                      isActive ? "rgba(255, 255, 255, 0.2)" : "transparent",
                  }}
                >
                  {page.name}
                </Button>
              </NavLink>
            ))}
          </Box>

          {/* User settings */}
          <Box sx={{ flexGrow: 0, display: "flex", gap: 1 }}>
            {user && user?.email ? (
              <>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar
                      alt="Remy Sharp"
                      src="/static/images/avatar/2.jpg"
                    />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {settings.map((setting) => (
                    <MenuItem
                      key={setting}
                      onClick={() => {
                        handleCloseUserMenu();
                        if (setting === "Logout") {
                          handleSignOut();
                        }
                      }}
                    >
                      <Typography textAlign="center">{setting}</Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </>
            ) : (
              <>
                <NavLink
                  to="/login"
                  style={{ textDecoration: "none" }}
                  className={({ isActive }) =>
                    isActive ? "active" : "inactive"
                  }
                >
                  <Button
                    sx={{
                      color: "white",
                      backgroundColor: ({ isActive }) =>
                        isActive ? "rgba(255, 255, 255, 0.2)" : "transparent",
                    }}
                  >
                    Login
                  </Button>
                </NavLink>
                <NavLink
                  to="/register"
                  style={{ textDecoration: "none" }}
                  className={({ isActive }) =>
                    isActive ? "active" : "inactive"
                  }
                >
                  <Button
                    sx={{
                      color: "white",
                      backgroundColor: ({ isActive }) =>
                        isActive ? "rgba(255, 255, 255, 0.2)" : "transparent",
                    }}
                  >
                    Register
                  </Button>
                </NavLink>
              </>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar;
