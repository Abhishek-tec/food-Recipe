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
import React, { useState } from "react";
import { Zocial, FontAwesome, Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import Loading from "../../Loading";
import { auth, db } from "../../firebase";

const register = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const handleRegister = async () => {
    try {
      if (!name || !email || !password) {
        Alert.alert("Please Enter all the fields");
      }
      setLoading(true);
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      ).then((userCredential) => {
        const user = userCredential._tokenResponse.email;
        const userUid = auth.currentUser.uid;

        sendEmailVerification(auth.currentUser).then(() => {
          console.log("Email verification sent to the user");
        });
        setDoc(doc(db, "user", `${userUid}`), {
          name: name,
          email: email,
          password: password,
        });
      });
      setName("");
      setEmail("");
      setPassword("");
      router.replace("/login");
    } catch (error) {
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

      <KeyboardAvoidingView>
        <View style={{ alignItems: "center" }}>
          <Text
            style={{
              marginTop: 20,
              fontSize: 16,
              fontWeight: "bold",
              color: "#FF033E",
            }}
          >
            Register in to your account
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
              <Ionicons
                style={{ marginLeft: 8 }}
                name="person"
                size={24}
                color="gray"
              />
              <TextInput
                value={name}
                onChangeText={(text) => setName(text)}
                style={{ width: 300, marginVertical: 10 }}
                placeholder="Enter Your Name"
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

        <TouchableOpacity
          onPress={handleRegister}
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
            Register
          </Text>
        </TouchableOpacity>

        <Pressable
          onPress={() => router.replace("/login")}
          style={{ marginTop: 10, alignItems: "center" }}
        >
          <Text style={{ color: "gray" }}>Already have an account ? LogIn</Text>
        </Pressable>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default register;
