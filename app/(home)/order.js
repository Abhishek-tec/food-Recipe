import {
  View,
  Text,
  SafeAreaView,
  Pressable,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import moment from "moment/moment";
import MapView, { Marker, Polyline } from "react-native-maps";
import { FontAwesome5 } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { collection, getDoc, query } from "firebase/firestore";
import { auth, db } from "../../firebase";

const order = () => {
  const userUid = auth?.currentUser.uid;
  const params = useLocalSearchParams();
  const [tip, setTip] = useState(0);
  const time = moment().format("LT");
  const mapView = useRef(null);
  const dispatch = useDispatch();
  const [coordinates] = useState([
    {
      latitude: 12.9716,
      longitude: 77.5946,
    },
    {
      latitude: 13.0451,
      longitude: 77.6269,
    },
  ]);

  useEffect(() => {
    mapView.current.fitToCoordinates(coordinates, {
      edgePadding: {
        top: 50,
        bottom: 50,
        left: 50,
        right: 50,
      },
    });
    const fetchData = async () => {
      try {
        const dataCollectionRef = collection(db, "user", userUid, "userData");
        const dataQuery = query(dataCollectionRef);
        const querySnapdshot = await getDoc(dataQuery);
        const data = [];
        querySnapdshot.forEach((doc) => {
          data.push(...doc.data());
        });
        setData(data);
      } catch (error) {
        console.log("Error:", error);
      }
    };
    fetchData();
  }, []);
  console.log("data:", data);
  return (
    <SafeAreaView>
      <View
        style={{
          padding: 8,
          backgroundColor: "#E32636",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <View style={{ gap: 2 }}>
          <Text style={{ color: "#fff", fontWeight: "500" }}>
            Delivery in 25 mins
          </Text>
          <Text style={{ color: "#fff", fontWeight: "500" }}>
            order placed at {time}
          </Text>
        </View>
        <Text style={{ color: "gray", fontWeight: "500" }}>HELP</Text>
      </View>

      <MapView
        ref={mapView}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        style={{ width: "100%", height: 400 }}
      >
        <Marker coordinate={coordinates[0]} />
        <Marker coordinate={coordinates[1]} />

        <Polyline
          coordinates={coordinates}
          strokeColor="black"
          strokeWidth={1}
          lineDashPattern={[4]}
        />
      </MapView>

      <View
        style={{
          height: 320,
          width: "100%",
          backgroundColor: "#fff",
          borderTopRightRadius: 8,
          borderTopLeftRadius: 8,
        }}
      >
        <View style={{ padding: 10 }}>
          <View>
            <Text
              style={{ fontSize: 16, textAlign: "center", fontWeight: "bold" }}
            >
              {params?.name} has accepted your order
            </Text>
            <View
              style={{
                flexDirection: "row",
                marginTop: 20,
                padding: 6,
                gap: 6,
              }}
            >
              <FontAwesome5
                name="hand-holding-heart"
                size={24}
                color="orange"
              />
              <View style={{ marginHorizontal: 4 }}>
                <Text style={{ fontSize: 15, fontWeight: "600" }}>
                  Tip your hunger Saviour
                </Text>
                <Text style={{ width: 340, color: "gray", marginTop: 4 }}>
                  Thanks your delivery partner for helping you saty safe indoors
                  Support them through these though times with a tip
                </Text>
                <Pressable
                  style={{
                    paddingTop: 20,
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <TouchableOpacity
                    activeOpacity={0.6}
                    onPress={() => setTip(30)}
                    style={{
                      backgroundColor: "#F5F5F5",
                      marginHorizontal: 10,
                      paddingHorizontal: 10,
                      borderRadius: 7,
                    }}
                  >
                    <Text
                      style={{
                        padding: 10,
                        color: "#002D62",
                        fontWeight: "bold",
                      }}
                    >
                      ₹30
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    activeOpacity={0.6}
                    onPress={() => setTip(50)}
                    style={{
                      alignItems: "center",
                      backgroundColor: "#F5F5F5",
                      marginHorizontal: 10,
                      borderRadius: 7,
                    }}
                  >
                    <Text
                      style={{
                        padding: 4,
                        color: "#002D62",
                        fontWeight: "bold",
                      }}
                    >
                      ₹50
                    </Text>
                    <Text
                      style={{
                        backgroundColor: "orange",
                        paddingHorizontal: 10,
                        fontSize: 14,
                        fontWeight: "bold",
                        color: "white",
                      }}
                    >
                      Most Tipped
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    activeOpacity={0.6}
                    onPress={() => setTip(70)}
                    style={{
                      backgroundColor: "#F5F5F5",
                      marginHorizontal: 10,
                      paddingHorizontal: 10,
                      borderRadius: 7,
                    }}
                  >
                    <Text
                      style={{
                        padding: 10,
                        color: "#002D62",
                        fontWeight: "bold",
                      }}
                    >
                      ₹70
                    </Text>
                  </TouchableOpacity>
                </Pressable>
              </View>
            </View>
            {tip ? (
              <View>
                <Text
                  style={{
                    color: "#fc8019",
                    padding: 10,
                    marginLeft: 10,
                    marginRight: 10,
                    fontSize: 16,
                    fontWeight: "600",
                  }}
                >
                  please pay {"₹"}
                  {tip} to your delivery agent at the time of delivery
                </Text>
                <TouchableOpacity
                  onPress={() => setTip(0)}
                  activeOpacity={0.7}
                  style={{
                    padding: 10,
                    marginLeft: 10,
                    marginRight: 10,
                    position: "absolute",
                    top: 40,
                    paddingBottom: 40,
                  }}
                >
                  <Text
                    style={{ color: "red", fontSize: 14, fontWeight: "700" }}
                  >
                    (Cancel)
                  </Text>
                </TouchableOpacity>
              </View>
            ) : null}
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default order;
