import { Box, Button, Modal, Stack, Typography } from "@mui/material";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};

const DeleteModal = ({ open, handleClose, title, body, handleDelete }) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="delete-modal-title"
      aria-describedby="delete-modal-description"
    >
      <Box sx={modalStyle}>
        <Typography id="delete-modal-title" variant="h5" fontWeight={"bold"}>
          {title}
        </Typography>
        <Typography id="delete-modal-description" sx={{ mt: 2 }}>
          {body}
        </Typography>
        <Stack
          direction={"row"}
          spacing={2}
          justifyContent={"flex-end"}
          sx={{ mt: 4 }}
        >
          <Button variant="contained" color="error" onClick={handleDelete}>
            Delete
          </Button>
          <Button variant="contained" onClick={handleClose}>
            Cancel
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
};

export default DeleteModal;
