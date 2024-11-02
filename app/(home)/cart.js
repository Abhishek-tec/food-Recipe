import {
  View,
  Text,
  ScrollView,
  Pressable,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
  Ionicons,
  FontAwesome5,
  Feather,
  AntDesign,
  Entypo,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import {
  cleanCart,
  decrementQuantity,
  incrementQuantity,
} from "../../redux/CartReducer";

const cart = () => {
  const params = useLocalSearchParams();
  const router = useRouter();
  const cart = useSelector((state) => state.cart.cart);
  const dispatch = useDispatch();
  const instructions = [
    {
      id: "0",
      name: "Avoid Ringing",
      iconName: "bell",
    },
    {
      id: "1",
      name: "Leave at the door",
      iconName: "door-open",
    },
    {
      id: "2",
      name: "directions to reach",
      iconName: "directions",
    },
    {
      id: "3",
      name: "Avoid Calling",
      iconName: "phone-alt",
    },
  ];
  const total = cart
    ?.map((item) => item.quantity * item.price)
    .reduce((prev, curr) => prev + curr, 0);
  console.log(total);
  return (
    <>
      <ScrollView style={{ flex: 1, backgroundColor: "lightgray", padding: 8 }}>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
          <Ionicons
            onPress={() => router.back()}
            name="arrow-back"
            size={24}
            color="black"
          />
          <Text style={{ fontSize: 15, fontWeight: "bold" }}>
            {params?.name}
          </Text>
        </View>
        <View
          style={{
            backgroundColor: "#fff",
            padding: 8,
            marginTop: 15,
            borderRadius: 10,
          }}
        >
          <Text> Delivery in 35 - 40 mins </Text>
        </View>
        <View style={{ marginVertical: 10 }}>
          <Text
            style={{
              textAlign: "center",
              color: "gray",
              letterSpacing: 4,
              fontSize: 15,
            }}
          >
            ITEM(S) ADDED
          </Text>
        </View>

        <View>
          {cart?.map((item, index) => (
            <Pressable
              style={{ padding: 10, backgroundColor: "#fff" }}
              key={index}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginVertical: 6,
                }}
              >
                <Text style={{ fontSize: 14, fontWeight: "bold" }}>
                  {item?.name}
                </Text>
                <Pressable
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "#fff",
                    padding: 4,
                    borderRadius: 6,
                    borderWidth: 1,
                    borderColor: "green",
                    width: 70,
                    gap: 6,
                  }}
                >
                  <TouchableOpacity
                    onPress={() => {
                      dispatch(decrementQuantity(item));
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 14,
                        fontWeight: "bold",
                        color: "green",
                      }}
                    >
                      -
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <Text
                      style={{
                        color: "green",
                        paddingHorizontal: 6,
                        fontSize: 14,
                      }}
                    >
                      {item.quantity}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      dispatch(incrementQuantity(item));
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 14,
                        fontWeight: "bold",
                        color: "green",
                      }}
                    >
                      +
                    </Text>
                  </TouchableOpacity>
                </Pressable>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginTop: 4,
                }}
              >
                <Text style={{ fontWeight: "bold" }}>
                  Rs {item.price * item.quantity}
                </Text>
                <Text style={{ fontWeight: "bold" }}>
                  Quantity: {item?.quantity}
                </Text>
              </View>
            </Pressable>
          ))}

          <View style={{ marginTop: 15 }}>
            <Text style={{ fontSize: 14, fontWeight: "bold" }}>
              Delivery instructions
            </Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {instructions?.map((item, index) => (
                <TouchableOpacity
                  style={{
                    backgroundColor: "#fff",
                    margin: 10,
                    borderRadius: 10,
                    padding: 10,
                  }}
                  key={index}
                >
                  <View
                    style={{ alignItems: "center", justifyContent: "center" }}
                  >
                    <FontAwesome5
                      name={item?.iconName}
                      size={20}
                      color="gray"
                    />
                    <Text
                      style={{
                        color: "gray",
                        width: 75,
                        paddingTop: 5,
                        textAlign: "center",
                      }}
                    >
                      {item?.name}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          <View
            style={{ backgroundColor: "#fff", marginTop: 15, borderRadius: 8 }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                padding: 10,
              }}
            >
              <View style={{ flexDirection: "row", gap: 8 }}>
                <Feather name="plus-circle" size={20} color="black" />
                <Text>Add more items</Text>
              </View>
              <AntDesign name="right" size={24} color="black" />
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                padding: 10,
              }}
            >
              <View style={{ flexDirection: "row", gap: 8 }}>
                <Entypo name="new-message" size={24} color="black" />
                <Text>Add more coocking instructions</Text>
              </View>
              <AntDesign name="right" size={24} color="black" />
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                padding: 10,
              }}
            >
              <View style={{ flexDirection: "row", gap: 8 }}>
                <MaterialCommunityIcons
                  name="food-fork-drink"
                  size={24}
                  color="black"
                />
                <Text>Don't send cultery with the order</Text>
              </View>
              <AntDesign name="right" size={24} color="black" />
            </View>
          </View>

          <View>
            <View
              style={{
                backgroundColor: "#fff",
                borderRadius: 8,
                padding: 10,
                marginVertical: 10,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Text>Feeding India Donation</Text>
                <AntDesign name="checksquare" size={24} color="#fd5c63" />
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginVertical: 5,
                }}
              >
                <Text style={{ color: "gray", fontSize: 12 }}>
                  Working towards manipulation free-India
                </Text>
                <Text>Rs 3</Text>
              </View>
            </View>
          </View>

          <View
            style={{
              marginVertical: 10,
            }}
          >
            <Text
              style={{
                fontSize: 16,
                fontWeight: "bold",
                textAlign: "center",
                color: "#0066b2",
              }}
            >
              Billing Details
            </Text>
            <View
              style={{
                marginTop: 8,
                backgroundColor: "#fff",
                borderRadius: 8,
                padding: 10,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Text
                  style={{ fontSize: 14, fontWeight: "bold", color: "gray" }}
                >
                  Item Total
                </Text>
                <Text style={{ fontSize: 14, fontWeight: "bold" }}>
                  ₹ {total}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginTop: 6,
                }}
              >
                <Text
                  style={{ fontSize: 14, fontWeight: "bold", color: "gray" }}
                >
                  Delivery charge
                </Text>
                <Text style={{ fontSize: 14, fontWeight: "bold" }}>₹ 15</Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginTop: 6,
                }}
              >
                <Text
                  style={{ fontSize: 14, fontWeight: "bold", color: "gray" }}
                >
                  Delivery Partner Charge
                </Text>
                <Text style={{ fontSize: 14, fontWeight: "bold" }}>₹ 75</Text>
              </View>

              <View style={{ marginVertical: 8 }}>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Text style={{ fontSize: 15, fontWeight: "bold" }}>
                    To Pay
                  </Text>
                  <Text> ₹ {total + 90} </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      {total === 0 ? null : (
        <Pressable
          style={{
            marginVertical: 8,
            backgroundColor: "#fff",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            padding: 20,
          }}
        >
          <View style={{ gap: 8 }}>
            <Text style={{ fontSize: 15, fontWeight: "bold" }}>
              Pay Using Cash
            </Text>
            <Text style={{ fontSize: 13, fontWeight: "bold" }}>
              Cash on Delivery
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              dispatch(cleanCart());
              router.replace({
                pathname: "/order",
                params: {
                  name: params?.name,
                },
              });
            }}
            style={{
              backgroundColor: "#fd5c63",
              padding: 5,
              borderRadius: 8,
              width: 200,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              margin: 8,
            }}
          >
            <View>
              <Text style={{ color: "#fff", gap: 6, fontWeight: "bold" }}>
                ₹ {total + 95}
              </Text>
              <Text style={{ color: "#fff", gap: 6, fontWeight: "bold" }}>
                TOTAL
              </Text>
            </View>
            <Text style={{ fontWeight: "bold", color: "#fff" }}>
              Place Order
            </Text>
          </TouchableOpacity>
        </Pressable>
      )}
    </>
  );
};

export default cart;
