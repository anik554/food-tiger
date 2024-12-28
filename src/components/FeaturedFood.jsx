import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  Button,
} from "@mui/material";
import { foods } from "../utils/mainUtil";
import Grid from "@mui/material/Grid2";
const FeaturedFood = () => {
  return (
    <Box width={"100%"} >
      <Typography variant="h6" textAlign={"center"} marginTop={2}>
        Featured Food
      </Typography>
      <Grid container spacing={2} mt={2}>
        {foods.map((food) => (
          <Grid key={food.id} size={{ xs: 12, md: 6, lg: 3 }}>
            <Card>
              <CardMedia
                component={"img"}
                alt="img"
                height={"140"}
                src={food.image}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component={"div"}>
                  {food.name}
                </Typography>
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  {food.description}
                </Typography>
                <Typography variant="body2" sx={{ color: "text.secondary" ,mt:1}}>
                  Price : {food.price}
                </Typography>
              </CardContent>
              <CardActions>
                <Button variant="outlined">Show ALl</Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default FeaturedFood;
