import { View, Text } from "react-native";
import React from "react";
import { SliderBox } from "react-native-image-slider-box";

const Carousel = () => {
  const images = [
    "https://thumbs.dreamstime.com/b/dosa-banana-leaf-traditional-southern-indian-rice-111935380.jpg",
    "https://cdn.britannica.com/94/240094-050-D5CC461B/Indian-naan-flatbread.jpg",
    "https://c4.wallpaperflare.com/wallpaper/869/719/717/cuisine-food-india-indian-wallpaper-preview.jpg",
    "https://img.freepik.com/premium-photo/amazing-delicious-cheese-burger_727939-299.jpg",
    "https://w0.peakpx.com/wallpaper/101/95/HD-wallpaper-burgers-fast-food-delicious-food-sandwiches-harmful-food.jpg",
    "https://t4.ftcdn.net/jpg/03/61/86/91/360_F_361869194_7JGmIOSj2iUNi0AYoVhVyhKvaN6PkOah.jpg",
  ];
  return (
    <View>
      <SliderBox
        images={images}
        autoplay
        circleLoop
        dotColor="#0066b2"
        inactiveDotColor="white"
        ImageComponentStyle={{
          width: "94%",
          borderRadius: 6,
          marginTop: 10,
        }}
      />
    </View>
  );
};

export default Carousel;
