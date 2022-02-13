import { View, Image, StyleSheet } from "react-native";
import React, { useState } from "react";

export default function DisplayBox({ route }) {
  const img = route.params.img;

  return (
    <View style={styles.container}>
      <Image style={styles.displayImg} source={{ uri: img }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  displayImg: {
    height: "90%",
    width: "90%",
    resizeMode: "contain",
  },
});
