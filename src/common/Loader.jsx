import { Box, CircularProgress } from "@mui/material";

const Loader = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "calc(100vh - 85px)",
        overflow: "hidden",
        width: "100%", // Moved inside `sx` for consistency
      }}
    >
      <CircularProgress size="5rem" />
    </Box>
  );
};

export default Loader;
