import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { auth, db } from "../firebase";

export default function Signup({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const handleSignup = () => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((userCredentials) => {
        alert("Registration Successful");
        db.ref("users/" + userCredentials.user.uid)
          .set({
            name: name,
            email: email,
            img: "",
            uid: userCredentials.user.uid,
            bio: "Hey there!",
          })
          .catch((error) => {
            alert(error);
          });
      });
  };

  return (
    <View>
      <TextInput
        style={styles.input}
        placeholder="Username"
        onChangeText={(text) => {
          setName(text);
        }}
        value={name}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={(text) => {
          setEmail(text);
        }}
        value={email}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry={true}
        onChangeText={(text) => {
          setPassword(text);
        }}
        value={password}
      />
      <TouchableOpacity style={styles.btn} onPress={handleSignup}>
        <Text>Signup</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.btn}
        onPress={() => {
          navigation.navigate("Login");
        }}
      >
        <Text>Login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E7ECEF",
  },
  input: {
    borderBottomWidth: 1,
    backgroundColor: "#FFFAFF",
    padding: 5,
    margin: 10,
    width: 200,
    borderRadius: 5,
  },
  btn: {
    margin: 20,
    padding: 10,
    paddingHorizontal: 20,
    backgroundColor: "#E2C044",
    borderRadius: 5,
  },
});
