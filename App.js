import React, { useState, useEffect } from "react";
import { AsyncStorage } from "@react-native-async-storage/async-storage";
import { Image, StyleSheet, Text, View, LogBox } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "./screens/Login";
import Home from "./screens/Home";
import { TouchableOpacity } from "react-native-gesture-handler";
import { auth, db } from "./firebase";
import Signup from "./screens/Signup";
import Chat from "./screens/Chat";
import DisplayBox from "./components/DisplayBox";
import GuestProfile from "./screens/GuestProfile";
import { Ionicons } from "@expo/vector-icons";
import ContactsEntry from "./components/ContactsEntry";

LogBox.ignoreAllLogs();
const StartStack = createStackNavigator();
const HomeStack = createStackNavigator();

const HomeStackScreen = ({ navigation }) => {
  const [user, setUser] = useState("");
  const [contacts, setContacts] = useState("");
  // var ContactCount;
  useEffect(() => {
    try {
      db.ref("users/").on("value", (snapshot) => {
        const uid = auth.currentUser.uid;
        snapshot.forEach((item) => {
          if (item.val().uid === uid) {
            setUser([item.val().name, item.val().img]);
            if (item.val().contact !== undefined)
              setContacts(item.val().contact);
          }
        });
      });
    } catch (error) {
      alert(error);
    }
  }, []);

  // if (contacts !== undefined) {
  //   ContactCount = Object.values(contacts).length;
  // }

  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="Home"
        children={() => <Home contacts={contacts} />}
        options={{
          title: user[0],
          headerStyle: { backgroundColor: "#e2c044", elevation: 0 },
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => {
                if (user[1] !== "")
                  navigation.navigate("DisplayBox", { img: user[1] });
              }}
            >
              <Image
                source={
                  user[1] === "" ? require("./assets/dp.jpg") : { uri: user[1] }
                }
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 50,
                  marginLeft: 10,
                }}
              />
            </TouchableOpacity>
          ),
          // headerRight: () => (
          //   <TouchableOpacity
          //     onPress={() => {
          //       navigation.navigate("AddContact");
          //     }}
          //   >
          //     <Ionicons name="add" size={30} color="black" />
          //   </TouchableOpacity>
          // ),
        }}
      />
      <HomeStack.Screen
        name="Chat"
        component={Chat}
        options={({ route }) => ({
          title: route.params.name,
          headerRight: () => (
            <>
              {route.params.img !== "" ? (
                <TouchableOpacity
                  onPress={() => {
                    if (route.params.img !== "")
                      navigation.navigate("DisplayBox", {
                        img: route.params.img,
                      });
                  }}
                >
                  <Image
                    source={
                      route.params.img === ""
                        ? require("./assets/dp.jpg")
                        : { uri: route.params.img }
                    }
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 20,
                      marginRight: 10,
                      borderWidth: 1,
                      borderColor: "black",
                    }}
                  />
                </TouchableOpacity>
              ) : (
                <></>
              )}
            </>
          ),
        })}
      />
      <HomeStack.Screen name="DisplayBox" component={DisplayBox} />
      <HomeStack.Screen name="GProfile" component={GuestProfile} />
      {/* <HomeStack.Screen
        name="AddContact"
        component={ContactsEntry}
        initialParams={{ count: ContactCount }}
      /> */}
    </HomeStack.Navigator>
  );
};

const AuthenticateStack = createStackNavigator();

const AuthenticateStackScreen = () => {
  return (
    <StartStack.Navigator
      mode="modal"
      screenOptions={{
        cardStyle: {},
      }}
    >
      <StartStack.Screen
        name="Login"
        component={Login}
        options={{
          title: "For Us",
          headerStyle: {
            backgroundColor: "#E2C044",
          },
          headerTitleAlign: "center",
          headerTitleStyle: { fontSize: 30 },
        }}
      />
      <StartStack.Screen
        name="Signup"
        component={Signup}
        options={{
          title: "For Us",
          headerStyle: {
            backgroundColor: "#E2C044",
          },
          headerTitleAlign: "center",
          headerTitleStyle: { fontSize: 30 },
        }}
      />
    </StartStack.Navigator>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <AuthenticateStack.Navigator>
        <AuthenticateStack.Screen
          name="Authenticate"
          component={AuthenticateStackScreen}
          options={{ headerShown: false }}
        />
        <AuthenticateStack.Screen
          name="HomeScreen"
          component={HomeStackScreen}
          options={{ headerShown: false }}
        />
      </AuthenticateStack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({});
