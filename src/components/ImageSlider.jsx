import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Import the carousel styles
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { carouselImages } from "../utils/mainUtil";

const ImageSlider = () => {
  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: "100%",
        margin: "auto",
        boxShadow: 3,
        borderRadius: 2,
        overflow: "hidden",
        mt:2
      }}
    >
      <Carousel
        autoPlay
        interval={3000}
        infiniteLoop
        showThumbs={false}
        showStatus={false}
        dynamicHeight={false}
      >
        {carouselImages.map((image, index) => (
          <Box
            key={index}
            sx={{
              position: "relative",
              height: "100%",
              maxHeight: 550,
              width: "100%",
            }}
          >
            <img
              src={image}
              alt={`Slide ${index + 1}`}
              style={{
                width: "100%",
                height: "100%",
                maxHeight: "550px",
                objectFit: "cover",
              }}
            />
            <Typography
              variant="caption"
              sx={{
                position: "absolute",
                bottom: 16,
                left: 16,
                color: "#fff",
                backgroundColor: "rgba(0, 0, 0, 0.6)",
                padding: "4px 8px",
                borderRadius: 1,
              }}
            >
              Slide {index + 1}
            </Typography>
          </Box>
        ))}
      </Carousel>
    </Box>
  );
};

export default ImageSlider;
