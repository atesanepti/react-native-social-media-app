import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { router, Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import { StatusBar } from "expo-status-bar";
import colors from "@/constants/Colors";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import {
  EvilIcons,
  Entypo,
  SimpleLineIcons,
  AntDesign,
  Ionicons,
  MaterialCommunityIcons,
  Feather,
  MaterialIcons,
} from "@expo/vector-icons";
import * as Font from "expo-font";

SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
  const [fontsLoaded, error] = useFonts({
    "Poppins-Black": require("../assets/fonts/Poppins-Black.ttf"),
    "Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
    "Poppins-ExtraBold": require("../assets/fonts/Poppins-ExtraBold.ttf"),
    "Poppins-ExtraLight": require("../assets/fonts/Poppins-ExtraLight.ttf"),
    "Poppins-Light": require("../assets/fonts/Poppins-Light.ttf"),
    "Poppins-Medium": require("../assets/fonts/Poppins-Medium.ttf"),
    "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
    "Poppins-SemiBold": require("../assets/fonts/Poppins-SemiBold.ttf"),
    "Poppins-Thin": require("../assets/fonts/Poppins-Thin.ttf"),
    ...EvilIcons.font,
    ...Entypo.font,
    ...SimpleLineIcons.font,
    ...AntDesign.font,
    ...Ionicons.font,
    ...MaterialCommunityIcons.font,
    ...MaterialIcons.font,
    ...Feather.font,
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, error]);

  if (!fontsLoaded) return null;

  return (
    // hole app warped by redux provider
    <Provider store={store}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="Continue" />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="(profileUpdate)" />
        <Stack.Screen
          name="(search)"
      
        />
        <Stack.Screen
          name="profile/[id]"
          options={() => {
            return {
              headerShown: true,
              title: "Profile",
              headerStyle: {
                backgroundColor: colors.primary,
              },

              headerTitleStyle: {
                color: colors.while,
                fontSize: 15,
              },
              headerLeft(props) {
                return (
                  <Ionicons
                    onPress={() => router.back()}
                    name="arrow-back"
                    size={24}
                    color="#fff"
                    style={{ paddingHorizontal: 10 }}
                  />
                );
              },
            };
          }}
        />
      </Stack>
      <StatusBar style="light" />
    </Provider>
  );
};

export default RootLayout;

const styles = StyleSheet.create({});
