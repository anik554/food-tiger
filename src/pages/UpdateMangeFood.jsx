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
import { useLoaderData, useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid2";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useState } from "react";
import dayjs from "dayjs";
import axios from "axios";
import { toast } from "react-toastify";
const UpdateMangeFood = () => {
  const navigate = useNavigate();
  const {
    _id,
    donarName,
    donarEmail,
    donarPhoto,
    foodCreatedAt,
    foodName,
    foodImageURL,
    foodQuantity,
    foodLocation,
    dateTime,
    status,
    notes,
  } = useLoaderData();

  const [updatedInfo, setUpdatedInfo] = useState({
    donarName: donarName,
    donarEmail: donarEmail,
    donarPhoto: donarPhoto,
    foodCreatedAt: foodCreatedAt,
    foodName: foodName,
    foodImageURL: foodImageURL,
    foodQuantity: foodQuantity,
    foodLocation: foodLocation,
    dateTime: dateTime,
    status: status,
    notes: notes,
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleDateTimeChange = (newValue) => {
    console.log(newValue);
    const formattedDateTime = newValue.format("YYYY-MM-DD h:mm A");
    setUpdatedInfo((prev) => ({
      ...prev,
      dateTime: formattedDateTime,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      donarName: updatedInfo?.donarName,
      donarEmail: updatedInfo?.donarEmail,
      donarPhoto: updatedInfo?.donarPhoto,
      foodCreatedAt: updatedInfo.foodCreatedAt,
      foodName: updatedInfo.foodName,
      foodImageURL: updatedInfo.foodImageURL,
      foodQuantity: updatedInfo.foodQuantity,
      foodLocation: updatedInfo.foodLocation,
      dateTime: updatedInfo.dateTime,
      status: updatedInfo.status,
      notes: updatedInfo.notes,
    };
    console.log(payload);
    axios
      .put(`http://localhost:5000/availableFood/${_id}`, payload)
      .then((res) => {
        if (res.data) {
          toast.success("Updated Food Successfully");
          navigate("/manage-my-foods")
        } else {
          toast.error("Not Updated Food, SomeThing is Wrong");
        }
      })
      .catch((err) => {
        console.error("Error while submitting:", err);
      });
  };

  return (
    <Box width="100%" py={2}>
      <Paper elevation={2} sx={{ p: 4, maxWidth: 800, mx: "auto" }}>
        <Typography gutterBottom variant="h6" textAlign="center">
          Update Food Item
        </Typography>
        <Box component="div" width="100%">
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid size={6}>
                <TextField
                  fullWidth
                  type="text"
                  value={updatedInfo.donarName}
                  name="donarName"
                  onChange={handleChange}
                  label="Donator Name"
                />
              </Grid>
              <Grid size={6}>
                <TextField
                  fullWidth
                  type="email"
                  name="donarEmail"
                  value={updatedInfo.donarEmail}
                  onChange={handleChange}
                  label="Donator Email"
                />
              </Grid>
              <Grid size={6}>
                <TextField
                  fullWidth
                  type="text"
                  label="Enter Food Name"
                  name="foodName"
                  onChange={handleChange}
                  value={updatedInfo.foodName}
                />
              </Grid>
              <Grid size={6}>
                <TextField
                  fullWidth
                  type="url"
                  label="Enter Food Image URL"
                  name="foodImageURL"
                  value={updatedInfo.foodImageURL}
                  onChange={handleChange}
                />
              </Grid>
              <Grid size={6}>
                <TextField
                  fullWidth
                  type="number"
                  label="Enter Food Quantity"
                  name="foodQuantity"
                  onChange={handleChange}
                  value={updatedInfo.foodQuantity}
                />
              </Grid>
              <Grid size={6}>
                <TextField
                  fullWidth
                  type="text"
                  label="Enter Pickup Location"
                  name="foodLocation"
                  onChange={handleChange}
                  value={updatedInfo.foodLocation}
                />
              </Grid>
              <Grid size={6}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DateTimePicker
                    label="Expired Date and Time"
                    value={dayjs(updatedInfo.dateTime)}
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
                    value={updatedInfo.status}
                    name="status"
                    onChange={handleChange}
                    input={<OutlinedInput label="Select Food Status" />}
                  >
                    <MenuItem value="Available">Available</MenuItem>
                    <MenuItem value="Not Available">Not Available</MenuItem>
                    <MenuItem value="Requested">Requested</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid size={12}>
                <TextField
                  fullWidth
                  type="text"
                  label="Enter Additional Notes"
                  name="notes"
                  value={updatedInfo.notes}
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
                  Updated
                </Button>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Paper>
    </Box>
  );
};

export default UpdateMangeFood;
