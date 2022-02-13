import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Chats from "./Chats";
import Profile from "./Profile";

const Tabs = createMaterialTopTabNavigator();
export default function Home() {
  return (
    <Tabs.Navigator
      screenOptions={{
        tabBarStyle: {
          elevation: 0,
          backgroundColor: "#e2c044",
        },
        tabBarLabelStyle: {
          fontSize: 14,
        },
        tabBarPressColor: "#E7CE73",
      }}
    >
      <Tabs.Screen name="Chats" component={Chats} />
      <Tabs.Screen name="Profile" component={Profile} />
    </Tabs.Navigator>
  );
}
