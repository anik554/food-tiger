import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";

const RequestedFoods = () => {
    return (
        <Box width={"100%"}>
            <TableContainer component={Paper} >
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Donar Name</TableCell>
                            <TableCell>Pickup Location</TableCell>
                            <TableCell>Expire Date</TableCell>
                            <TableCell>Request date</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default RequestedFoods;