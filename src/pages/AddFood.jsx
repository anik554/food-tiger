import { useContext, useState } from "react";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";
import AuthContext from "../context/AuthContext";
import Grid from "@mui/material/Grid2";

const AddFood = () => {
  const { user } = useContext(AuthContext);
  const [foodData, setFoodData] = useState({
    foodName: "",
    foodImageURL: "",
    foodQuantity: "",
    foodLocation: "",
    dateTime: dayjs(),
    status: "Available",
    notes: "",
  });

  console.log(foodData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFoodData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDateTimeChange = (newValue) => {
    console.log(newValue);
    const formattedDateTime = newValue.format("YYYY-MM-DD h:mm A");
    setFoodData((prev) => ({
      ...prev,
      dateTime: formattedDateTime,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      foodName: foodData.foodName,
      foodImageURL: foodData.foodImageURL,
      foodQuantity: foodData.foodQuantity,
      foodLocation: foodData.foodLocation,
      dateTime: foodData.dateTime,
      status: foodData.status,
      notes: foodData.notes,
    };
    console.log(payload);
  };

  return (
    <Box width="100%" p={2}>
      <Paper elevation={2} sx={{ p: 4, maxWidth: 800, mx: "auto" }}>
        <Typography gutterBottom variant="h6" textAlign="center">
          Create Food
        </Typography>
        <Box component="div" width="100%">
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid size={6}>
                <TextField
                  fullWidth
                  type="text"
                  value={user?.displayName || ""}
                  disabled
                  label="Donator Name"
                />
              </Grid>
              <Grid size={6}>
                <TextField
                  fullWidth
                  type="email"
                  value={user?.email || ""}
                  disabled
                  label="Donator Email"
                />
              </Grid>
              <Grid size={6}>
                <TextField
                  fullWidth
                  type="text"
                  label="Enter Food Name"
                  name="foodName"
                  value={foodData.foodName}
                  onChange={handleChange}
                />
              </Grid>
              <Grid size={6}>
                <TextField
                  fullWidth
                  type="url"
                  label="Enter Food Image URL"
                  name="foodImageURL"
                  value={foodData.foodImageURL}
                  onChange={handleChange}
                />
              </Grid>
              <Grid size={6}>
                <TextField
                  fullWidth
                  type="number"
                  label="Enter Food Quantity"
                  name="foodQuantity"
                  value={foodData.foodQuantity}
                  onChange={handleChange}
                />
              </Grid>
              <Grid size={6}>
                <TextField
                  fullWidth
                  type="text"
                  label="Enter Pickup Location"
                  name="foodLocation"
                  value={foodData.foodLocation}
                  onChange={handleChange}
                />
              </Grid>
              <Grid size={6}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DateTimePicker
                    label="Enter Date and Time"
                    value={dayjs(foodData.dateTime)}
                    onChange={handleDateTimeChange}
                    renderInput={(params) => <TextField {...params} />}
                    slotProps={{ textField: { fullWidth: true } }}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid size={6}>
                <FormControl fullWidth>
                  <InputLabel id="food-status-label">
                    Select Food Status
                  </InputLabel>
                  <Select
                    labelId="food-status-label"
                    id="food-status"
                    value={foodData.status}
                    name="status"
                    onChange={handleChange}
                    input={<OutlinedInput label="Select Food Status" />}
                  >
                    <MenuItem value="Available">Available</MenuItem>
                    <MenuItem value="Not Available">Not Available</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid size={12}>
                <TextField
                  fullWidth
                  type="text"
                  label="Enter Additional Notes"
                  name="notes"
                  value={foodData.notes}
                  onChange={handleChange}
                  multiline
                  rows={4}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  type={"submit"}
                  fullWidth
                  variant="contained"
                  color="primary"
                >
                  Save
                </Button>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Paper>
    </Box>
  );
};

export default AddFood;
