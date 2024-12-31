import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  Button,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../common/Loader";
const FeaturedFood = () => {
  const [featureFoods, setfeatureFoods] = useState([]);
  const [isLoading, setIsLoading]= useState(true);
  useEffect(() => {
    axios.get("http://localhost:5000/featuredFood").then((res) => {
      setfeatureFoods(res.data);
      setIsLoading(false)
    });
  }, []);
  return (
    <Box width={"100%"}>
      <Typography variant="h6" textAlign={"center"} marginTop={2}>
        Featured Food
      </Typography>
      <Grid container spacing={2} mt={2}>
        {isLoading ? <Loader /> : featureFoods.map((food) => (
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
                <Typography
                  variant="body2"
                  sx={{ color: "text.secondary", mt: 1 }}
                >
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
