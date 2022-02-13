import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ScrollView,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import ChatBox from "../components/ChatBox";
import { db } from "../firebase";
import * as ImagePicker from "expo-image-picker";

let currentDate = new Date();
// Sending Message
const sendMessage = (useruid, uid, msgValue) => {
  if (msgValue.length < 1) return;
  try {
    db.ref("messages/" + useruid + "/" + uid).push({
      sender: useruid,
      reciever: uid,
      msg: msgValue,
      time: currentDate.toLocaleTimeString(),
      img: "",
    });
    db.ref("messages/" + uid + "/" + useruid).push({
      sender: useruid,
      reciever: uid,
      msg: msgValue,
      time: currentDate.toLocaleTimeString(),
      img: "",
    });
  } catch (error) {
    alert(error);
  }
};

// Main Chat
export default function Chat({ route, navigation }) {
  const [msgValue, setMsgValue] = useState("");
  const [msgList, setMsgList] = useState([]);
  let { name, img, uid, useruid } = route.params;

  useEffect(() => {
    try {
      db.ref("messages/" + useruid + "/" + uid).on("value", (snapshot) => {
        let msg = [];
        snapshot.forEach((item) => {
          msg.push({
            sender: item.val().sender,
            reciever: item.val().reciever,
            msg: item.val().msg,
            time: item.val().time,
            img: item.val().img,
          });
        });
        setMsgList(msg.reverse());
      });
    } catch (error) {
      alert(error);
    }
  }, []);
  const selectImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 1,
      base64: true,
    });
    if (!result.cancelled) {
      let source = "data:image/jpg;base64," + result.base64;
      try {
        db.ref("messages/" + useruid + "/" + uid).push({
          sender: useruid,
          reciever: uid,
          msg: msgValue,
          time: currentDate.toLocaleTimeString(),
          img: source,
        });
        db.ref("messages/" + uid + "/" + useruid).push({
          sender: useruid,
          reciever: uid,
          msg: msgValue,
          time: currentDate.toLocaleTimeString(),
          img: source,
        });
        setMsgValue("");
      } catch (error) {
        alert(error);
      }
    }
  };

  const handleSend = () => {
    sendMessage(useruid, uid, msgValue);
    setMsgValue("");
  };
  const handleInput = (text) => {
    setMsgValue(text);
  };

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.chatlist}
        inverted
        alwaysBounceVertical={false}
        data={msgList}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => (
          <ChatBox
            msg={item.msg}
            img={item.img}
            time={item.time}
            sender={item.sender}
            reciever={item.reciever}
            useruid={useruid}
            navigation={navigation}
          />
        )}
      />
      <KeyboardAvoidingView style={styles.inputWrapper}>
        <TextInput
          style={styles.msgInput}
          value={msgValue}
          onChangeText={(text) => handleInput(text)}
          multiline={true}
        />
        <View style={styles.buttonsWrap}>
          <TouchableOpacity style={styles.attachBtn} onPress={selectImage}>
            <Ionicons name="images" size={25} color="black" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.msgBtn} onPress={handleSend}>
            <Ionicons name="send" size={30} color="black" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  chatlist: {
    padding: 10,
    paddingBottom: 0,
  },

  inputWrapper: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    bottom: 0,
    backgroundColor: "#fff",
  },
  msgInput: {
    flex: 1,
    backgroundColor: "white",
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  attachBtn: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    paddingRight: 12,
    borderLeftWidth: 1,
    borderRadius: 5,
    alignItems: "center",
  },
  msgBtn: {
    paddingVertical: 3,
    paddingHorizontal: 10,
    borderLeftWidth: 1,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonsWrap: {
    flexDirection: "row",
    alignItems: "center",
  },
});
