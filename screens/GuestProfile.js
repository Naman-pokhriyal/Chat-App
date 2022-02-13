import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Image,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";

export default function GuestProfile({ navigation, route }) {
  const { name, img, uid, bio } = route.params;

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ flexGrow: 1, justifyContent: "space-between" }}
    >
      <View>
        <TouchableOpacity
          style={styles.ProfileImagebtn}
          onPress={() => {
            navigation.navigate("DisplayBox", {
              img: img,
            });
          }}
        >
          <Image
            style={styles.ProfileImage}
            source={img === "" ? require("../assets/dp.jpg") : { uri: img }}
          />
        </TouchableOpacity>
        <View style={styles.ProfileData}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                flex: 1,
                fontSize: 30,
                fontWeight: "bold",
                textAlign: "center",
                padding: 0,
              }}
            >
              {name}
            </Text>
          </View>
        </View>
        <View style={styles.ProfileData}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                flex: 1,
                fontSize: 18,
                textAlign: "center",
                padding: 0,
              }}
            >
              {bio}
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
