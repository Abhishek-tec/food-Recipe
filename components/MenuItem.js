import { View, Text, Pressable, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { FontAwesome } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import {
  addToCart,
  decrementQuantity,
  incrementQuantity,
  removeFromCart,
} from "../redux/CartReducer";

const MenuItem = ({ item }) => {
  const dispatch = useDispatch();
  const [addItems, setAddItems] = useState(0);
  const [selected, setSelected] = useState(false);
  

  return (
    <View>
      <Pressable
        style={{
          margin: 10,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          marginVertical: 15,
        }}
      >
        <View>
          <Text style={{ fontSize: 15, fontWeight: "bold", color: "black" }}>
            {item?.name}
          </Text>
          <Text style={{ fontSize: 14, fontWeight: "bold", marginBottom: 5 }}>
            ₹ {item?.price}
          </Text>
          <Text>
            {[0, 0, 0, 0, 0].map((en, i) => (
              <FontAwesome
                key={i}
                style={{ paddingHorizontal: 3 }}
                name={i < Math.floor(item.rating) ? "star" : "star-o"}
                size={15}
                color="#FEBE10"
              />
            ))}
          </Text>
          <Text
            style={{ width: 230, marginTop: 8, color: "gray", fontSize: 14 }}
          >
            {item?.description > 40
              ? item?.description.substr(0, 37) + "..."
              : item?.description}
          </Text>
        </View>
        <TouchableOpacity>
          <Image
            style={{ width: 120, height: 120, borderRadius: 8 }}
            source={{ uri: item?.image }}
          />
          {selected ? (
            <Pressable
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#fd5c63",
                padding: 6,
                marginTop: -20,
                borderRadius: 6,
                borderWidth: 1,
                borderColor: "red",
                left: 20,
                width: 85,
                gap: 10,
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  if (addItems == 1) {
                    dispatch(removeFromCart(item));
                    setAddItems(0);
                    setSelected(false);
                    return;
                  }
                  setAddItems((c) => c - 1);
                  dispatch(decrementQuantity(item));
                }}
              >
                <Text
                  style={{ fontSize: 15, fontWeight: "bold", color: "#fff" }}
                >
                  -
                </Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <Text
                  style={{
                    color: "#fff",
                    paddingHorizontal: 6,
                    fontSize: 15,
                  }}
                >
                  {addItems}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setAddItems((c) => c + 1);
                  dispatch(incrementQuantity(item));
                }}
              >
                <Text
                  style={{ fontSize: 15, fontWeight: "bold", color: "#fff" }}
                >
                  +
                </Text>
              </TouchableOpacity>
            </Pressable>
          ) : (
            <TouchableOpacity
              onPress={() => {
                setSelected(true);
                if (addItems == 0) {
                  setAddItems((c) => c + 1);
                }
                dispatch(addToCart(item));
              }}
              style={{
                alignItems: "center",
                backgroundColor: "white",
                padding: 6,
                marginTop: -20,
                borderRadius: 6,
                borderWidth: 1,
                borderColor: "red",
                left: 20,
                width: 85,
              }}
            >
              <Text style={{ color: "#fd5c63", fontWeight: "bold" }}>ADD</Text>
            </TouchableOpacity>
          )}
        </TouchableOpacity>
      </Pressable>
    </View>
  );
};

export default MenuItem;
