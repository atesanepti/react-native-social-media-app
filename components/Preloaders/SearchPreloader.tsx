import { View, Text } from "react-native";
import React from "react";
import colors from "@/constants/Colors";

const SearchPreloader = ({ count }) => {
  const user = Array.from({ length: count });
  return (
    <View style={{ paddingHorizontal: 10 }}>
      {user.map((_, i) => (
        <View
          key={i}
          style={{
            width: "100%",
            height: 35,
            borderRadius: 10,
            backgroundColor: colors.black_200,
            marginBottom: 10,
          }}
        ></View>
      ))}
    </View>
  );
};

export default SearchPreloader;
