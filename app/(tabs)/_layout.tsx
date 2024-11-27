import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Tabs } from "expo-router";

import icons from "@/constants/icons";
import colors from "../../constants/Colors";
import TabIcon from "@/components/TabIcon";

const TabLayout = () => {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,

        tabBarStyle: {
            backgroundColor: colors.primary,
            height: 75,
            borderTopWidth: 1,
            borderColor : colors.black_200

          },
          
        
      }}
    >
      <Tabs.Screen
        name="Home"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size, focused }) => {
            return <TabIcon text="Home" icon="home" focused={focused} />;
          },
        }}
      />
      <Tabs.Screen
        name="Create"
        options={{
          title: "Create",
          tabBarIcon: ({ color, size, focused }) => {
            return <TabIcon text="Create" icon="create" focused={focused} />;
          },
        }}
      />
      <Tabs.Screen
        name="Bookmark"
        options={{
          title: "Bookmark",
          tabBarIcon: ({ color, size, focused }) => {
            return (
              <TabIcon
                text="Chat"
                icon="chatbox-ellipses-outline"
                focused={focused}
              />
            );
          },
        }}
      />
      <Tabs.Screen
        name="Profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, size, focused }) => {
            return (
              <TabIcon
                text="Profile"
                icon="briefcase-sharp"
                focused={focused}
              />
            );
          },
        }}
      />
    </Tabs>
  );
};

export default TabLayout;
