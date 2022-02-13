import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  Pressable,
} from "react-native";
import { auth, db } from "../firebase";
// import { useIsFocused } from "@react-navigation/native";

const Chats = ({ navigation }) => {
  // const isFocused = useIsFocused();

  const [users, setUsers] = useState([]);
  // const [contacts, setContacts] = useState("");
  // var contactList = [];

  useEffect(() => {
    try {
      //   db.ref("users/").on("value", (snapshot) => {
      //     const uid = auth.currentUser.uid;
      //     snapshot.forEach((item) => {
      //       setContacts(item.val().contact);
      //     });
      //   });
      //   if (contacts !== undefined) contactList = Object.values(contacts);

      db.ref("users/").on("value", (snapshot) => {
        const uid = auth.currentUser.uid;
        let userlist = [];
        snapshot.forEach((item) => {
          if (
            item.val().uid !== uid
            //  &&
            //  contactList.includes(item.val().uid)
          ) {
            userlist.push({
              username: item.val().name,
              key: item.val().uid,
              img: item.val().img,
              bio: item.val().bio,
            });
          }
        });
        setUsers(userlist);
      });
    } catch (error) {
      alert(error);
    }
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={users}
        renderItem={({ item }) => (
          <Pressable
            style={({ pressed }) => [
              {
                backgroundColor: pressed ? "#dbdbdb" : "transparent",
              },
              styles.msgContainer,
            ]}
            onPress={() => {
              navigation.navigate("Chat", {
                name: item.username,
                img: item.img,
                uid: item.key,
                useruid: auth.currentUser.uid,
              });
            }}
          >
            <View style={styles.msgView}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("GProfile", {
                    name: item.username,
                    img: item.img,
                    uid: item.key,
                    bio: item.bio,
                  });
                }}
              >
                <Image
                  style={styles.msgImg}
                  source={
                    item.img === ""
                      ? require("../assets/dp.jpg")
                      : { uri: item.img }
                  }
                />
              </TouchableOpacity>
              <Text style={styles.msgText}>{item.username}</Text>
            </View>
          </Pressable>
        )}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  msgContainer: {
    paddingVertical: 12,
    borderColor: "#808080",
  },
  msgView: {
    paddingLeft: 12,
    height: 40,
    flexDirection: "row",
    alignItems: "center",
  },
  msgText: {
    fontSize: 20,
    paddingLeft: 25,
    textTransform: "capitalize",
  },
  msgImg: {
    width: 45,
    height: 45,
    borderRadius: 50,
    backgroundColor: "#000",
  },
});
export default Chats;
