import { View, Text, Pressable } from "react-native";
import React from "react";
import colors from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";

const MentionLabel = ({ user, onClose, style = {} }) => {
  return (
    <View
      style={[
        {
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingBottom: 10,
        },
        style,
      ]}
    >
      <Text
        style={{
          color: colors.while,
          fontSize: 12,
          fontFamily: "Poppins-Medium",
        }}
      >
        @{user.username}/
      </Text>
      <Ionicons
        onPress={onClose}
        name="close-outline"
        size={24}
        color={colors.while}
      />
    </View>
  );
};

export default MentionLabel;
