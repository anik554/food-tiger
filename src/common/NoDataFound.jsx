import { Box, Typography } from "@mui/material";

const NoDataFound = () => {
  return (
    <Box
      width="100%"
      minHeight="calc(100vh - 120px)" 
      display="flex"
      justifyContent="center"
      alignItems="center"
      sx={{
        boxSizing:"border-box",
        overflow:"hidden"
      }}
    >
      <Typography gutterBottom variant="h6" color="error" textAlign="center">
        No Data Found! Please Add Food
      </Typography>
    </Box>
  );
};

export default NoDataFound;

