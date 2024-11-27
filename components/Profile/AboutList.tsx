import { View, Text, Linking, Alert } from "react-native";
import React from "react";
import colors from "@/constants/Colors";

const AboutList = ({ link = undefined, title, value, children }) => {
  return (
    <View
      style={{
        paddingVertical: 15,
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
      }}
    >
      {children}
      <View>
        <Text
          style={{
            color: colors.gray_100,
            textTransform: "capitalize",
            fontSize: 12,
            fontFamily: "Poppins-Medium",
            marginBottom: -7,
          }}
        >
          {title}
        </Text>
        <Text
          onPress={async () => {
            if (link) {
              try {
                await Linking.openURL(link);
              } catch (error) {
                Alert.alert("URL Can't Find", `${link} no longer exists!`);
              }
            } else {
              return;
            }
          }}
          style={{
            color: colors.while,
            fontFamily: "Poppins-Medium",
            fontSize: 13,
          }}
        >
          {value}
        </Text>
      </View>
    </View>
  );
};

export default AboutList;
