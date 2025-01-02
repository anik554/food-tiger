import {
  Box,
  Button,
  Divider,
  Modal,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useLoaderData, useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid2";
import { useContext, useState } from "react";
import AuthContext from "../context/AuthContext";
import dayjs from "dayjs";
import axios from "axios";
import { toast } from "react-toastify";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
const AvailableFoodDetails = () => {
  const {
    _id,
    dateTime,
    donarEmail,
    donarName,
    foodCreatedAt,
    foodImageURL,
    foodLocation,
    foodName,
    foodQuantity,
    notes,
    status,
  } = useLoaderData();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [requestInfo, setRequestInfo] = useState({
    _id: _id,
    dateTime: dateTime,
    donarEmail: donarEmail,
    donarName: donarName,
    foodCreatedAt: dayjs().format("MMMM DD,YYYY h:mm A"),
    userEmail: user?.email,
    foodImageURL: foodImageURL,
    foodLocation: foodLocation,
    foodName: foodName,
    foodQuantity: foodQuantity,
    notes: notes,
    status: "Requested",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRequestInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      _id: requestInfo._id,
      dateTime: requestInfo.dateTime,
      donarEmail: requestInfo.donarEmail,
      donarName: requestInfo.donarName,
      foodCreatedAt: requestInfo.foodCreatedAt,
      userEmail: requestInfo.userEmail,
      foodImageURL: requestInfo.foodImageURL,
      foodLocation: requestInfo.foodLocation,
      foodName: requestInfo.foodName,
      foodQuantity: requestInfo.foodQuantity,
      notes: requestInfo.notes,
      status: requestInfo.status,
    };
    const updateStatus={
        status:requestInfo.status
    }
    axios.patch(`http://localhost:5000/availableFood/${_id}`,updateStatus)
    .then((res)=>{
        if(res.data){
            toast.success("Status Updated")
        }else{
            toast.error("Status Not Updated")
        }
    }).catch((err)=>{
        console.error(err)
    })

    axios.post(`http://localhost:5000/requestedFoods`,payload)
    .then((res)=>{
        if(res.data){
            toast.success("Food Request Successfully")
            navigate("/available-foods")
        }else{
            toast.error("Food Request Not Successfully")
        }
    }).catch((err)=>{
        console.error(err)
    })
  };
  return (
    <Box width={"100%"}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Grid container spacing={2}>
          <Grid size={6}>
            <Box sx={{ height: "50vh" }}>
              <img
                style={{ height: "100%", width: "100%", objectFit: "contain" }}
                src={foodImageURL}
                alt=""
              />
            </Box>
          </Grid>
          <Grid size={6}>
            <Box>
              <Typography mb={1}>
                Food Name: <strong>{foodName}</strong>
              </Typography>
              <Typography mb={1}>
                Location: <strong>{foodLocation}</strong>
              </Typography>
              <Typography mb={1}>
                Quantity: <strong>{foodQuantity}</strong>
              </Typography>
              <Typography mb={1}>
                Status: <strong style={{ color: "green" }}>{status}</strong>
              </Typography>
              <Typography mb={1}>
                Expiere Date:{" "}
                <strong style={{ color: "tomato" }}>{dateTime}</strong>
              </Typography>
              <Typography mb={1}>
                Posted Date: <strong>{foodCreatedAt}</strong>
              </Typography>
              <Typography mb={1}>
                Food Description:{" "}
                <strong style={{ color: "grey" }}>{notes}</strong>
              </Typography>
              <Divider sx={{ my: 1 }}></Divider>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography>
                  Creator: <strong>{donarName}</strong>
                </Typography>
                <Typography>
                  Creator Email: <strong>{donarEmail}</strong>
                </Typography>
              </Box>
              <Divider sx={{ my: 1 }}></Divider>
              <Button variant="contained" fullWidth onClick={handleOpen}>
                Request
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Paper>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            sx={{ py: 2 }}
          >
            Request This Food
          </Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid size={6}>
                <TextField
                  fullWidth
                  size="small"
                  label="Food Name"
                  value={requestInfo.foodName}
                  slotProps={{ shrink: true, input: { readOnly: true } }}
                />
              </Grid>
              <Grid size={6}>
                <TextField
                  fullWidth
                  size="small"
                  label="Food Image"
                  value={requestInfo.foodImageURL}
                  slotProps={{ shrink: true, input: { readOnly: true } }}
                />
              </Grid>
              <Grid size={6}>
                <TextField
                  fullWidth
                  size="small"
                  label="Food ID"
                  value={requestInfo._id}
                  slotProps={{ shrink: true, input: { readOnly: true } }}
                />
              </Grid>
              <Grid size={6}>
                <TextField
                  fullWidth
                  size="small"
                  label="Food Donator Name"
                  value={requestInfo.donarName}
                  slotProps={{ shrink: true, input: { readOnly: true } }}
                />
              </Grid>
              <Grid size={6}>
                <TextField
                  fullWidth
                  size="small"
                  label="Food Donator Email"
                  value={requestInfo.donarEmail}
                  slotProps={{ shrink: true, input: { readOnly: true } }}
                />
              </Grid>
              <Grid size={6}>
                <TextField
                  fullWidth
                  size="small"
                  label="User Email"
                  value={requestInfo.userEmail}
                  slotProps={{ shrink: true, input: { readOnly: true } }}
                />
              </Grid>
              <Grid size={6}>
                <TextField
                  fullWidth
                  size="small"
                  label="Request Date"
                  value={requestInfo.foodCreatedAt}
                  slotProps={{ shrink: true, input: { readOnly: true } }}
                />
              </Grid>
              <Grid size={6}>
                <TextField
                  fullWidth
                  size="small"
                  label="Pickup Location"
                  value={requestInfo.foodLocation}
                  slotProps={{ shrink: true, input: { readOnly: true } }}
                />
              </Grid>
              <Grid size={6}>
                <TextField
                  fullWidth
                  size="small"
                  label="Expire Date"
                  value={requestInfo.dateTime}
                  slotProps={{ shrink: true, input: { readOnly: true } }}
                />
              </Grid>
              <Grid size={6}>
                <TextField
                  fullWidth
                  size="small"
                  label="Additional Notes"
                  name="notes"
                  multiline
                  maxRows={4}
                  value={requestInfo.notes}
                  onChange={handleChange}
                  slotProps={{ shrink: true }}
                />
              </Grid>
              <Grid size={12}>
                <Button type="submit" variant="contained" fullWidth>
                  Request For This Food
                </Button>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Modal>
    </Box>
  );
};

export default AvailableFoodDetails;
