import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { TextInput } from "react-native-gesture-handler";
import { auth, db } from "../firebase.js";

export default function ContactsEntry(props) {
  const [ID, setID] = useState("");
  var { count } = props.route.params;

  const addContact = () => {
    count++;
    try {
      db.ref("users/" + auth.currentUser.uid + "/contact")
        .update({ [count]: ID })
        .then(alert("Done"));
    } catch (error) {
      alert(error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="User ID"
        onChangeText={(text) => {
          setID(text);
        }}
        value={ID}
      />
      <TouchableOpacity
        style={styles.btn}
        onPress={() => {
          addContact();
        }}
      >
        <Text>Add Contact</Text>
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
