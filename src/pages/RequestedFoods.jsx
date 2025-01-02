import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import Loader from "../common/Loader";
import dayjs from "dayjs";

const RequestedFoods = () => {
  const [requestFoods, setRequestFoods] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:5000/requestedFoods")
      .then((res) => {
        if (res.data) {
          setRequestFoods(res.data);
          setIsLoading(false);
        } else {
          setIsLoading(false);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);
  return (
    <Box width={"100%"} sx={{ py: 3 }}>
      <Typography gutterBottom variant="h6" sx={{ p: 1 }}>
        Requested Food List
      </Typography>

      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Donar Name</TableCell>
              <TableCell>Pickup Location</TableCell>
              <TableCell>Expire Date</TableCell>
              <TableCell>Request date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {isLoading ? (
              <TableCell colSpan={4} align="center" style={{ height: "100px" }}>
                <Loader />
              </TableCell>
            ) : (
              requestFoods.map((food, index) => (
                <TableRow key={food._id}>
                  <TableCell> {index + 1}. </TableCell>
                  <TableCell> {food.donarName} </TableCell>
                  <TableCell> {food.foodLocation} </TableCell>
                  <TableCell>
                    {" "}
                    {dayjs(food.dateTime).format("MMMM DD,YYYY h:mm A")}{" "}
                  </TableCell>
                  <TableCell> {food.foodCreatedAt} </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default RequestedFoods;
