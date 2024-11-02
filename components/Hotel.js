import { View, Text, TouchableOpacity, Image, Pressable } from "react-native";
import React from "react";
import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const Hotel = ({ item,menu,index }) => {
  const router = useRouter();
  const menuItem=JSON.stringify(menu)
  return (
    <Pressable
    key={index}
      onPress={() =>
        router.push({
          pathname: "/hotelDetails",
          params: {
            id: item.id,
            name: item.name,
            address: item.address,
            smalladdress: item.smalladdress,
            cuisines: item.cuisines,
            aggregate_rating: item.aggregate_rating,
            no_of_delivery: item.no_of_delivery,
            menu:menuItem
          },
        })
      }
      style={{
        marginHorizontal: 8,
        marginVertical: 12,
        backgroundColor: "#fff",
        borderRadius: 15,
      }}
    >
      <Image
        style={{
          width: "100%",
          aspectRatio: 6 / 4,
          borderTopLeftRadius: 6,
          borderTopRightRadius: 6,
        }}
        source={{ uri: item?.featured_image }}
      />
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <View style={{ flex: 1, marginVertical: 5, marginHorizontal: 5 }}>
          <Text style={{ fontWeight: "bold", color: "#0066b2" }}>
            {item?.name}{" "}
          </Text>
          <Text style={{ fontSize: 13, color: "gray" }}>
            {item?.decription}
          </Text>
          <Text style={{ fontSize: 13, color: "gray" }}> {item?.time} </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            backgroundColor: "green",
            alignItems: "center",
            padding: 2,
            borderRadius: 5,
          }}
        >
          <Text style={{ color: "#fff" }}> {item?.aggregate_rating} </Text>
          <FontAwesome name="star" size={12} color="white" />
        </View>
      </View>
      <View
        style={{
          borderWidth: 0.5,
          borderColor: "lightgray",
          marginHorizontal: 10,
        }}
      />
      <View
        style={{
          flexDirection: "row",
          marginHorizontal: 8,
          marginVertical: 5,
          gap: 4,
        }}
      >
        <MaterialCommunityIcons
          name="brightness-percent"
          size={20}
          color="#0066b2"
        />
        <Text style={{ color: "#0066B2", fontWeight: "bold", fontSize: 13 }}>
          20% OFF up to Rs 100
        </Text>
      </View>
    </Pressable>
  );
};

export default Hotel;
