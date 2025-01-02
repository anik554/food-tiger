import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  Typography,
  CardActions,
  Button,
  TextField,
  InputAdornment,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Loader from "../common/Loader";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import QueryStatsIcon from "@mui/icons-material/QueryStats";
import EventBusyIcon from "@mui/icons-material/EventBusy";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import Grid from "@mui/material/Grid2";
import SearchIcon from "@mui/icons-material/Search";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
const AvailableFood = () => {
  const navigate = useNavigate();
  const [addedFoods, setAddedFoods] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
console.log(addedFoods)
  const filterByStatus = addedFoods.filter(
    (item) => item.status === "Available"
  );

  const sortedFoods = () => {
    const sortedArray = [...filterByStatus].sort(
      (a, b) => dayjs(a.dateTime) - dayjs(b.dateTime)
    );
    setAddedFoods(sortedArray);
  };

  useEffect(() => {
    axios
      .get("http://localhost:5000/availableFoods")
      .then((res) => {
        if (res.data) {
          setAddedFoods(res.data);
          setIsLoading(false);
        } else {
          console.error("Some is wrong");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <Box width={"100%"} py={2}>
      <Grid container spacing={2}>
        <Grid size={4}>
          <TextField
            fullWidth
            label="Search"
            size="small"
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              },
            }}
          />
        </Grid>
        <Grid size={2}>
          <Button variant="contained">Search</Button>
        </Grid>
        <Grid size={6}>
          <Button
            variant="contained"
            sx={{ float: "right" }}
            onClick={sortedFoods}
          >
            Sort by Expire date
          </Button>
        </Grid>
        {isLoading ? (
          <Loader />
        ) : (
          filterByStatus.map((foods) => (
            <Grid key={foods._id} size={3}>
              <Card sx={{ height: "550px", position: "relative" }}>
                <CardHeader
                  avatar={
                    <Avatar aria-label="recipe" src={foods.donarPhoto}></Avatar>
                  }
                  action={
                    <IconButton aria-label="settings">
                      <MoreVertIcon />
                    </IconButton>
                  }
                  title={foods.donarName}
                  subheader={foods.foodCreatedAt}
                />
                <CardMedia
                  component="img"
                  height="194"
                  image={foods.foodImageURL}
                  alt="Paella dish"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5">
                    {foods.foodName}
                  </Typography>
                  <Typography
                    gutterBottom
                    variant="body2"
                    sx={{ display: "flex", alignItems: "center" }}
                  >
                    <LocationOnIcon fontSize="small" />
                    {foods.foodLocation}
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Typography
                      gutterBottom
                      variant="body2"
                      sx={{ display: "flex", alignItems: "center" }}
                    >
                      <EventBusyIcon fontSize="small" /> &nbsp;
                      {foods.dateTime}{" "}
                    </Typography>
                    <Typography
                      gutterBottom
                      variant="body2"
                      sx={{ display: "flex", alignItems: "center" }}
                    >
                      <AddShoppingCartIcon fontSize="small" /> &nbsp;
                      {foods.foodQuantity}{" "}
                    </Typography>
                    <Typography
                      gutterBottom
                      variant="body2"
                      sx={{ display: "flex", alignItems: "center" }}
                    >
                      <QueryStatsIcon fontSize="small" />
                      &nbsp; {foods.status}{" "}
                    </Typography>
                  </Box>
                  <Typography
                    variant="body2"
                    sx={{ color: "text.secondary", mt: 1 }}
                  >
                    {foods.notes}
                  </Typography>
                </CardContent>
                <CardActions
                  sx={{
                    position: "absolute",
                    bottom: "5%",
                    left: 0,
                    right: 0,
                    height: "1px",
                    justifyContent: "flex-end",
                  }}
                >
                  <Button variant="contained" size="small" onClick={()=>navigate(`/available-foods/${foods._id}`)}>
                    View
                  </Button>
                  <Button variant="contained" size="small" color="warning">
                    Update
                  </Button>
                  <Button variant="contained" size="small" color="error">
                    Delete
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))
        )}
      </Grid>
    </Box>
  );
};

export default AvailableFood;
