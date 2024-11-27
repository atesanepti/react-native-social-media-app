import { View, Text } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import colors from "@/constants/Colors";
import TabIcon from "@/components/TabIcon";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Redirect, router } from "expo-router";
const ProfileUpdateLayout = () => {
  return (
    <Tabs
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.primary,
          borderBottomColor: "#232533",
          borderBottomWidth: 1,
          elevation: 0,
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
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: colors.primary,

          borderTopColor: "#232533",
          height: 75,
          borderTopWidth: 1,
          borderColor: colors.black_200,
        },
      }}
    >
      <Tabs.Screen
        name="ProfileUpdate"
        options={{
          title: "User Profile",
          tabBarIcon: ({ color, size, focused }) => {
            return (
              <TabIcon text="Profile" icon="add-circle" focused={focused} />
            );
          },
        }}
      />
      <Tabs.Screen
        name="UserUpdate"
        options={{
          title: "User Account",
          tabBarIcon: ({ color, size, focused }) => {
            return <TabIcon text="User" icon="lock-open" focused={focused} />;
          },
        }}
      />
    </Tabs>
  );
};

export default ProfileUpdateLayout;
