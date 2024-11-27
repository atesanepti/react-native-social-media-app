import { Pressable, StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import icons from "@/constants/icons";
import colors from "@/constants/Colors";

export const CloseToast = ({ onClose }) => {
  return (
    <Pressable onPress={() => onClose()}>
      <Image
        source={icons.close}
        resizeMode="contain"
        tintColor={colors.gray}
        style={{ width: 15, height: 15 }}
      />
    </Pressable>
  );
};

const Toast = ({ top, variant , message, closeBtn }) => {
  const styleVariant =
    variant == "error"
      ? {
          view: {
            backgroundColor: "#C7253E",
          },
          text: {
            color: "#fff",
          },
        }
      : {};

  return (
    <View
      style={[
        {
          position: "absolute",
          top: top,
          left: 0,
          width: "100%",
        },
      ]}
    >
      <View
        style={[
          {
            width: 350,
            marginHorizontal: "auto",
            paddingHorizontal: 10,
            paddingVertical: 5,
            borderRadius: 5,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          },
          styleVariant.view,
        ]}
      >
        <Text
          style={[
            { fontFamily: "Poppins-Light", fontSize: 13 },
            styleVariant.text,
          ]}
        >
          {message}
        </Text>
        {closeBtn && closeBtn}
      </View>
    </View>
  );
};

export default Toast;
