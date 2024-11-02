import {
  View,
  Text,
  SafeAreaView,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
  Pressable,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Zocial, FontAwesome } from "@expo/vector-icons";
import register from "./register";
import { useRouter } from "expo-router";
import { signInWithEmailAndPassword } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { auth } from "../../firebase";

const login = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const checkLogInStatus = async () => {
      try {
        const token = await AsyncStorage.getItem("authToken");
        if (token) {
          router.replace("/(home)");
        }
      } catch (error) {}
    };
    checkLogInStatus();
  }, []);

  const handleLogin = async () => {
    try {
      if (!email || !password) {
        Alert.alert("Enter all the fields");
        return;
      }
  
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      const token = user?.stsTokenManager.accessToken;
  
      await AsyncStorage.setItem("authToken", token);
      router.replace("/(home)");
      setEmail("");
      setPassword("");
    } catch (error) {
      Alert.alert("An error occurred while logging in");
      console.log("Error:", error);
    }
  };
  

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "#fff", alignItems: "center" }}
    >
      <View style={{ marginTop: 70 }}>
        <Text style={{ fontSize: 18, fontWeight: "bold" }}>Food App</Text>
      </View>

      <KeyboardAvoidingView behavior="padding">
        <View style={{ alignItems: "center" }}>
          <Text
            style={{
              marginTop: 20,
              fontSize: 16,
              fontWeight: "bold",
              color: "#FF033E",
            }}
          >
            Log in to your account
          </Text>
          <View style={{ marginTop: 70 }}>
            <View
              style={{
                flexDirection: "row",
                gap: 8,
                alignItems: "center",
                backgroundColor: "lightgray",
                paddingVertical: 4,
                borderRadius: 8,
                marginTop: 20,
              }}
            >
              <Zocial
                style={{ marginLeft: 8 }}
                name="email"
                size={24}
                color="gray"
              />
              <TextInput
                value={email}
                onChangeText={(text) => setEmail(text)}
                style={{ width: 300, marginVertical: 10 }}
                placeholder="Enter Your Email"
              />
            </View>
            <View
              style={{
                flexDirection: "row",
                gap: 8,
                alignItems: "center",
                backgroundColor: "lightgray",
                paddingVertical: 4,
                borderRadius: 8,
                marginTop: 40,
              }}
            >
              <FontAwesome
                style={{ marginLeft: 8 }}
                name="lock"
                size={24}
                color="gray"
              />
              <TextInput
                value={password}
                onChangeText={(text) => setPassword(text)}
                style={{ width: 300, marginVertical: 10 }}
                placeholder="Enter Your Password"
                secureTextEntry
              />
            </View>
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: 4,
          }}
        >
          <Text style={{ color: "gray" }}>keep logged In </Text>
          <Text style={{ color: "skyblue", fontSize: 13, fontWeight: "600" }}>
            Forgot Password
          </Text>
        </View>
        <TouchableOpacity
          onPress={handleLogin}
          style={{
            marginTop: 50,
            alignItems: "center",
            backgroundColor: "#BA0021",
            borderRadius: 8,
            padding: 12,
            width: 200,
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          <Text style={{ fontSize: 16, fontWeight: "bold", color: "#fff" }}>
            LogIn
          </Text>
        </TouchableOpacity>
        <Pressable
          onPress={() => router.push("/register")}
          style={{ marginTop: 10, alignItems: "center" }}
        >
          <Text style={{ color: "gray" }}>
            Don't have an account ? Register{" "}
          </Text>
        </Pressable>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default login;
