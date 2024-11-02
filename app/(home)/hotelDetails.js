import {
  View,
  Text,
  ScrollView,
  Pressable,
  TouchableOpacity,
  Animated,
} from "react-native";
import React, { useRef, useState } from "react";
import { Ionicons, Feather, FontAwesome, Foundation } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import FoodItem from "../../components/FoodItem";
import { useSelector } from "react-redux";
import Modal from "react-native-modal";

const hotelDetails = () => {
  const params = useLocalSearchParams();
  const router = useRouter();
  const cart = useSelector((state) => state.cart.cart);
  console.log(cart);
  const menu = [
    {
      id: "20",
      name: "Recommended",
      items: [
        {
          id: "101",
          name: "Paneer 65",
          price: 275,
          description:
            "This is served with Raita and gravy and has loaded with chilli paste mixed chicken Kebabs",
          rating: 4.1,
          ratings: 43,
          image:
            "https://simshomekitchen.com/wp-content/uploads/2022/04/Tandoori-skewers-1-500x500.png",
          veg: true,
          bestSeller: false,
          quantity: 1,
        },
        {
          id: "102",
          name: "Chilly Chicken (Boneless)",
          price: 285,
          description:
            "E: 604.42 KCal (163.36 KCal), C: 29.67 Grams (8.02 Grams), P: 50.63 Grams (13.68 Grams), F: 30.94 Grams (8.36 Grams)",
          rating: 4.3,
          ratings: 34,
          image: "https://static.toiimg.com/photo/53094926.cms",
          veg: false,
          bestSeller: true,
          quantity: 1,
        },
        {
          id: "103",
          name: "Spl Veg Biryani",
          price: 250,
          description:
            "E: 1327.35 KCal (126.41 KCal), C: 213.24 Grams (20.31 Grams), P: 26.99 Grams (2.57 Grams), F: 38.46 Grams (3.66 Grams)",
          rating: 4.5,
          ratings: 56,
          image:
            "https://www.dwarakaorganic.com/wp-content/uploads/2012/06/Veg-Biryani-Recipe-870x470.jpg",
          veg: true,
          bestSeller: false,
          quantity: 1,
        },
        {
          id: "104",
          name: "Chilly Paneer",
          price: 220,
          description:
            "E: 871.69 KCal (272.40 KCal), C: 21.54 Grams (6.73 Grams), P: 51.90 Grams (16.22 Grams), F: 64.36 Grams (20.11 Grams",
          rating: 3.8,
          ratings: 22,
          image:
            "https://spicecravings.com/wp-content/uploads/2022/01/Chilli-Paneer-Featured-2-500x500.jpg",
          veg: true,
          bestSeller: true,
          quantity: 1,
        },
        {
          id: "105",
          name: "Chicken 65",
          price: 300,
          description:
            "E: 544.39 KCal (155.54 KCal), C: 25.11 Grams (7.17 Grams), P: 45.15 Grams (12.90 Grams), F: 27.91 Grams (7.97 Grams)",
          rating: 4.5,
          ratings: 45,
          image:
            "https://static01.nyt.com/images/2022/05/18/dining/as-baked-chicken/as-baked-chicken-superJumbo-v2.jpg",
          veg: false,
          bestSeller: true,
          quantity: 1,
        },
      ],
    },
    {
      id: "11",
      name: "Rice",
      items: [
        {
          id: "201",
          name: "Chicken Fried Rice",
          price: 260,
          description:
            "E: 1142.26 KCal (163.18 KCal), C: 125.05 Grams (17.86 Grams), P: 40.11 Grams (5.73 Grams), F: 51.37 Grams (7.34 Grams)",
          rating: 4.3,
          ratings: 34,
          image:
            "https://tildaricelive.s3.eu-central-1.amazonaws.com/wp-content/uploads/2021/05/04111234/chicken-fried-rice-low-res-2.png",
          veg: false,
          bestSeller: true,
        },
        {
          id: "202",
          name: "Egg Fried Rice",
          price: 220,
          description:
            "E: 1729.51 KCal (164.72 KCal), C: 204.54 Grams (19.48 Grams), P: 44.03 Grams (4.19 Grams), F: 79.02 Grams (7.53 Grams)",
          rating: 4.3,
          ratings: 52,
          image:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkJal6MILhEzT6dlLG0iKZ8CGH_NVDi5BuxVmrALsy2Q&s",
          veg: false,
          bestSeller: false,
        },
        {
          id: "203",
          name: "Veg Fried Rice",
          price: 190,
          description:
            "E: 1477.00 KCal (140.67 KCal), C: 204.14 Grams (19.44 Grams), P: 22.90 Grams (2.18 Grams), F: 59.95 Grams (5.71 Grams)",
          rating: 4.6,
          ratings: 56,
          image:
            "https://slurrp.club/wp-content/uploads/2022/04/DSC_0286-2-2-750x481.jpg",
          veg: true,
          bestSeller: true,
        },
        {
          id: "204",
          name: "Jeera Rice",
          price: 195,
          description:
            "E: 1832.30 KCal (174.50 KCal), C: 246.73 Grams (23.50 Grams), P: 27.51 Grams (2.62 Grams), F: 78.15 Grams (7.44 Grams)",
          rating: 4.5,
          ratings: 48,
          image:
            "https://delishbite.in/wp-content/uploads/2023/07/Blog_1-3-500x500.jpg?crop=1",
          veg: true,
          bestSeller: false,
        },
      ],
    },
  ];

  const scrollViewRef = useRef(null);
  const scrollAnim = useRef(new Animated.Value(0)).current;
  const TIME_HEIGHt = 650;
  const scrollToCategory = (index) => {
    const yOffset = index * TIME_HEIGHt;
    Animated.timing(scrollAnim, {
      toValue: yOffset,
      duration: 500,
      useNativeDriver: true,
    }).start();
    scrollViewRef.current.scrollTo({
      y: yOffset,
      Animated: true,
    });
  };
  const [modalVisible, setModalVisible] = useState(false);
  const recievedMenu = JSON.parse(params?.menu);
  return (
    <>
      <ScrollView
        ref={scrollViewRef}
        style={{ flex: 1, backgroundColor: "lightwhite" }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            margin: 5,
          }}
        >
          <Ionicons
            onPress={() => router.back()}
            name="arrow-back"
            size={24}
            color="black"
          />
          <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
            <Feather name="camera" size={24} color="black" />
            <Feather name="bookmark" size={24} color="black" />
            <FontAwesome name="share" size={24} color="black" />
          </View>
        </View>

        <View style={{ marginVertical: 20, alignItems: "center" }}>
          <View style={{ alignItems: "center" }}>
            <Text
              style={{ fontSize: 20, fontWeight: "bold", color: "#0066B2" }}
            >
              {params?.name}
            </Text>
            <Text style={{ color: "gray" }}>
              North Indian • Fast Food • 160 for one
            </Text>
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 10 }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  backgroundColor: "green",
                  padding: 2,
                  borderRadius: 4,
                }}
              >
                <Text style={{ color: "#fff" }}>
                  {params?.aggregate_rating}
                </Text>
                <Foundation name="star" size={15} color="#fff" />
              </View>

              <Text style={{ fontSize: 13, color: "gray" }}>3.2k Ratings</Text>
            </View>
          </View>
          <View
            style={{
              backgroundColor: "lightgreen",
              padding: 8,
              borderRadius: 20,
              alignItems: "center",
              justifyContent: "center",
              marginTop: 10,
            }}
          >
            <Text style={{ color: "gray", fontSize: 12, fontWeight: "bold" }}>
              30-40 mins * 6 km | kolkata
            </Text>
          </View>
        </View>

        {recievedMenu?.map((item, index) => (
          <FoodItem key={index} item={item} />
        ))}
      </ScrollView>

      <View style={{ flexDirection: "row", marginHorizontal: 10 }}>
        {recievedMenu?.map((item, index) => (
          <TouchableOpacity
            onPress={() => scrollToCategory(index)}
            key={index}
            style={{
              marginHorizontal: 5,
              marginBottom: 8,
              alignItems: "center",
              backgroundColor: "#fff",
              borderWidth: 1,
              borderColor: "#fd5c63",
              borderRadius: 5,
              padding: 5,
            }}
          >
            <Text style={{ fontWeight: "bold", color: "#0066b2" }}>
              {item?.name}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <Pressable
        onPress={() => setModalVisible(!modalVisible)}
        style={{
          height: 60,
          width: 60,
          borderRadius: 30,
          backgroundColor: "black",
          alignItems: "center",
          justifyContent: "center",
          position: "absolute",
          right: 25,
          bottom: cart?.length > 0 ? 75 : 35,
        }}
      >
        <Ionicons
          style={{ textAlign: "center" }}
          name="fast-food-outline"
          size={24}
          color="white"
        />
        <Text
          style={{
            textAlign: "center",
            fontWeight: "bold",
            marginTop: 3,
            color: "#fff",
            fontSize: 10,
          }}
        >
          MENU
        </Text>
      </Pressable>

      <Modal
        isVisible={modalVisible}
        onBackdropPress={() => setModalVisible(!modalVisible)}
      >
        <View
          style={{
            padding: 10,
            height: 120,
            width: 200,
            backgroundColor: "#FFC72C",
            position: "absolute",
            bottom: 30,
            right: 10,
            borderRadius: 8,
            gap: 10,
          }}
        >
          {menu?.map((item, index) => (
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Text
                style={{ fontSize: 15, fontWeight: "bold", color: "#0066b2" }}
              >
                {item?.name}
              </Text>
              <Text
                style={{ fontSize: 15, fontWeight: "bold", color: "#0066b2" }}
              >
                {item?.items?.length}
              </Text>
            </View>
          ))}
        </View>
      </Modal>

      {cart?.length > 0 && (
        <Pressable
          onPress={() =>
            router.push({
              pathname: "/cart",
              params: {
                name: params.name,
              },
            })
          }
          style={{
            alignItems: "center",
            backgroundColor: "#fd5c63",
            padding: 10,
            justifyContent: "center",
          }}
        >
          <Text style={{ color: "#fff", fontSize: 13, fontWeight: "bold" }}>
            {cart.length} items added
          </Text>
          <Text
            style={{
              color: "#fff",
              fontSize: 13,
              fontWeight: "bold",
              marginTop: 5,
            }}
          >
            Add Item(s) worth 240 to reduce surge fee by Rs 35.
          </Text>
        </Pressable>
      )}
    </>
  );
};

export default hotelDetails;
