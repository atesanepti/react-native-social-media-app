import { View, Text } from "react-native";
import React from "react";
import { Entypo } from "@expo/vector-icons";
import colors from "@/constants/Colors";
const Hobies = ({ hobies }) => {
  return (
    <View>
      <Text
        style={{
          color: colors.while,
          fontSize: 12,
          fontFamily: "Poppins-Medium",
          marginVertical: 10,
        }}
      >
        Hobies
      </Text>
      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          gap: 10,
        }}
      >
        {hobies?.map((text, i) => (
          <View
            key={i}
            style={{
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: colors.black_200,
              borderRadius: 50,
              paddingRight: 5,
            }}
          >
            <Entypo
              name="heart"
              size={13}
              color={colors.gray}
              style={{
                backgroundColor: colors.black_100,
                paddingHorizontal: 10,
                paddingVertical: 8,
                borderRadius: 50,
              }}
            />

            <Text
              style={{
                fontSize: 10,
                color: colors.gray,
                marginTop: -3,
                paddingHorizontal: 5,
              }}
            >
              {text}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
};

export default Hobies;
