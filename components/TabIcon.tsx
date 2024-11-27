import { View, Text } from "react-native";
import React from "react";
import colors from "@/constants/Colors";
import Ionicons from "@expo/vector-icons/Ionicons";
const TabIcon = ({ icon, text, focused }) => {
  return (
    <View style={{ alignItems: "center",width : 60 ,marginTop : 15}}>
      <Ionicons
        name={icon}
        size={18}
        color={focused ? colors.activeYellow : colors.while}
      />
      <Text
        style={{
          fontSize: 10,
          fontFamily: "Poppins-Medium",
          color: focused ? colors.activeYellow : colors.while,
        }}
      >
        {text}
      </Text>
    </View>
  );
};

export default TabIcon;
