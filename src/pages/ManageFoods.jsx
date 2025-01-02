import {
  Box,
  Button,
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
import { useNavigate } from "react-router-dom";
import DeleteModal from "../common/DeleteModal";
import { toast } from "react-toastify";
import NoDataFound from "../common/NoDataFound";

const ManageFoods = () => {
  const navigate = useNavigate();
  const [manageFoods, setManageFoods] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [deleteID, setDeleteId] = useState({ id: "", name: "" });

  const handleOpen = (id, name) => {
    setOpen(true);
    setDeleteId({ id: id, name: name });
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = () => {
    const { id, name } = deleteID;
    axios
      .delete(`http://localhost:5000/availableFood/${id}`)
      .then((res) => {
        if (res.data) {
          toast.success(`${name} have been deleted successfully`);
          setManageFoods((prev) => prev.filter((food) => food._id !== id));
          handleClose();
        } else {
          toast.error(`name not deleted successfully, try again`);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };
  useEffect(() => {
    axios
      .get("http://localhost:5000/availableFoods")
      .then((res) => {
        if (res.data) {
          setManageFoods(res.data);
          setIsLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <Box width={"100%"} >
      {manageFoods.length > 0 ? (
        <>
          <Typography gutterBottom variant="h6" sx={{ p: 1 }}>
            Manage Food List
          </Typography>

          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>#</TableCell>
                  <TableCell>Donar Name</TableCell>
                  <TableCell>Donar Email</TableCell>
                  <TableCell>Food Name</TableCell>
                  <TableCell>Food Id</TableCell>
                  <TableCell>Quantity</TableCell>
                  <TableCell>CreatedAt</TableCell>
                  <TableCell>Expier Date</TableCell>
                  <TableCell>Pickup Location</TableCell>
                  {/* <TableCell>Notes</TableCell> */}
                  <TableCell>Status</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {isLoading ? (
                  <TableCell
                    colSpan={4}
                    align="center"
                    style={{ height: "100px" }}
                  >
                    <Loader />
                  </TableCell>
                ) : (
                  manageFoods.map((food, index) => (
                    <TableRow key={food._id}>
                      <TableCell> {index + 1}. </TableCell>
                      <TableCell> {food.donarName} </TableCell>
                      <TableCell> {food.donarEmail} </TableCell>
                      <TableCell> {food.foodName} </TableCell>
                      <TableCell> {food._id} </TableCell>
                      <TableCell> {food.foodQuantity} </TableCell>
                      <TableCell> {food.foodCreatedAt} </TableCell>
                      <TableCell>
                        {" "}
                        {dayjs(food.dateTime).format(
                          "MMMM DD,YYYY h:mm A"
                        )}{" "}
                      </TableCell>
                      <TableCell> {food.foodLocation} </TableCell>
                      {/* <TableCell> {food.notes} </TableCell> */}
                      <TableCell> {food.status} </TableCell>
                      <TableCell>
                        <Box
                          sx={{ display: "flex", alignItems: "center", gap: 1 }}
                        >
                          <Button
                            variant="contained"
                            size="small"
                            color="success"
                            onClick={() =>
                              navigate(`/manage-my-foods/${food._id}`)
                            }
                          >
                            Update
                          </Button>
                          <Button
                            variant="contained"
                            size="small"
                            color="error"
                            onClick={() => handleOpen(food._id, food.foodName)}
                          >
                            Delete
                          </Button>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <DeleteModal
            open={open}
            handleClose={handleClose}
            title="Are You Sure?"
            body={`Would You Like to Delete ${deleteID.name}`}
            handleDelete={handleDelete}
          />
        </>
      ) : (
        <NoDataFound />
      )}
    </Box>
  );
};

export default ManageFoods;
