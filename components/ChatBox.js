import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";

export default function ChatBox({
  msg,
  img,
  time,
  sender,
  reciever,
  useruid,
  navigation,
}) {
  let isUser = useruid === sender;
  return (
    <View
      style={[
        styles.container,
        isUser && styles.textSent,
        img !== "" && { width: "50%" },
      ]}
    >
      {img !== "" ? (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("DisplayBox", {
              img: img,
            });
          }}
        >
          <Image
            source={{ uri: img }}
            style={{ width: "100%", height: 150, resizeMode: "contain" }}
          />
        </TouchableOpacity>
      ) : (
        <></>
      )}
      <Text style={{ paddingRight: 20 }}>{msg}</Text>
      <Text
        style={[
          styles.timeStyle,
          isUser ? { textAlign: "right" } : { textAlign: "right" },
        ]}
      >
        {time}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ACE4AA",
    minWidth: 15,
    maxWidth: "90%",
    alignSelf: "flex-start",
    borderRadius: 5,
    padding: 10,
    paddingVertical: 7,
    marginVertical: 5,
  },
  textSent: {
    alignSelf: "flex-end",
    backgroundColor: "#AAD0E3",
  },
  timeStyle: {
    fontSize: 10,
  },
});
