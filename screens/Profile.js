import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Image,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { auth, db } from "../firebase";

export default function Profile({ navigation }) {
  const [user, setUser] = useState("");
  const [userimg, setUserimg] = useState("");
  const [newuser, setNewuser] = useState("");
  const [bio, setBio] = useState("");
  const [newbio, setNewbio] = useState("");

  useEffect(() => {
    try {
      db.ref("users/").on("value", (snapshot) => {
        const uid = auth.currentUser.uid;
        snapshot.forEach((item) => {
          if (item.val().uid === uid) {
            setUser(item.val().name);
            setUserimg(item.val().img);
            setBio(item.val().bio);
          }
        });
      });
    } catch (error) {
      alert(error);
    }
  }, []);

  const selectPhoto = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [3, 3],
      quality: 1,
      base64: true,
    });
    if (!result.cancelled) {
      try {
        db.ref("users/" + auth.currentUser.uid).update({
          img: "data:image/jpg;base64," + result.base64,
        });
      } catch (error) {
        alert(error);
      }
    }
  };

  const UpdateUser = () => {
    try {
      db.ref("users/" + auth.currentUser.uid).update({
        name: newuser === "" ? user : newuser,
      });
    } catch (error) {
      alert(error);
    }
    setNewuser("");
  };
  const UpdateBio = () => {
    if (newbio !== "")
      try {
        db.ref("users/" + auth.currentUser.uid).update({
          bio: newbio,
        });
      } catch (error) {
        alert(error);
      }
    setNewbio("");
  };

  const handleForgot = () => {
    auth
      .sendPasswordResetEmail(auth.currentUser.email)
      .then(function () {
        alert("Sent to email");
      })
      .catch(function (e) {
        console.log(e);
      });
  };
  const handleSignout = () => {
    auth
      .signOut()
      .then(() => {
        navigation.replace("Authenticate", { screen: "Login" });
      })
      .catch((error) => alert(error));
  };

  const removePhoto = () => {
    Alert.alert("Confirm", "Remove Profile Picture?", [
      {
        text: "Yes",
        onPress: () => {
          try {
            db.ref("users/" + auth.currentUser.uid).update({
              img: "",
            });
          } catch (error) {
            alert(error);
          }
        },
      },
      {
        text: "No",
      },
    ]);
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ flexGrow: 1, justifyContent: "space-between" }}
    >
      <View>
        <TouchableOpacity
          style={styles.ProfileImagebtn}
          onPress={selectPhoto}
          onLongPress={removePhoto}
        >
          <Image
            style={styles.ProfileImage}
            source={
              userimg === "" ? require("../assets/dp.jpg") : { uri: userimg }
            }
          />
        </TouchableOpacity>
        <View style={styles.ProfileData}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Text style={styles.ProfileName}>Username: </Text>
            <TextInput
              style={{
                flex: 1,
                fontSize: 18,
                borderBottomWidth: 1,
                borderBottomColor: "#E0E0E0",
                padding: 0,
              }}
              placeholder={user}
              value={newuser}
              onChangeText={(text) => {
                setNewuser(text);
              }}
            />
          </View>
          <Pressable
            onPress={UpdateUser}
            style={({ pressed }) => [
              {
                backgroundColor: pressed ? "#A1C6EA" : "#5f9fde",
              },
              styles.smallBtn,
            ]}
          >
            <Text
              style={{
                fontSize: 15,
              }}
            >
              Change
            </Text>
          </Pressable>
        </View>
        <View style={styles.ProfileData}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Text style={styles.ProfileName}>Bio: </Text>
            <TextInput
              style={{
                flex: 1,
                fontSize: 18,
                borderBottomWidth: 1,
                borderBottomColor: "#E0E0E0",
                padding: 0,
              }}
              placeholder={bio}
              value={newbio}
              onChangeText={(text) => {
                setNewbio(text);
              }}
            />
          </View>
          <Pressable
            onPress={UpdateBio}
            style={({ pressed }) => [
              {
                backgroundColor: pressed ? "#A1C6EA" : "#5f9fde",
              },
              styles.smallBtn,
            ]}
          >
            <Text
              style={{
                fontSize: 15,
              }}
            >
              Change
            </Text>
          </Pressable>
        </View>
      </View>
      <View>
        <Pressable
          style={({ pressed }) => [
            {
              backgroundColor: pressed ? "#A1C6EA" : "#5f9fde",
            },
            styles.Btn,
          ]}
          onPress={handleForgot}
        >
          <Text>Change Password</Text>
        </Pressable>
        <Pressable
          style={({ pressed }) => [
            {
              backgroundColor: pressed ? "#ff644a" : "#D1462F",
            },
            styles.redBtn,
          ]}
          onPress={handleSignout}
        >
          <Text style={{ color: "#fff" }}>LogOut</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#E7ECEF",
  },
  ProfileImagebtn: {
    alignItems: "center",
    marginVertical: 20,
  },
  ProfileImage: {
    width: 180,
    height: 180,
    borderRadius: 90,
    borderWidth: 2,
    borderColor: "#E0E0E0",
  },
  ProfileData: {
    flexDirection: "row",
    alignItems: "baseline",
    justifyContent: "space-between",
    marginLeft: 10,
    marginTop: 10,
  },
  ProfileName: {
    fontSize: 18,
    fontWeight: "bold",
  },

  smallBtn: {
    padding: 5,
    paddingHorizontal: 10,
    alignItems: "center",
    position: "absolute",
    right: 0,
    bottom: 0,
  },
  Btn: {
    padding: 10,
    alignItems: "center",
  },
  redBtn: {
    padding: 10,
    alignItems: "center",
  },
});
