import { View, Text } from "react-native";
import React from "react";
import colors from "@/constants/Colors";

const CommentPreloader = ({ count = 4 }) => {
  const countArr = Array.from({ length: count });
  return (
    <View
      style={{ flex: 1, gap: 20,  paddingVertical: 10 }}
    >
      {countArr.map((_, i) => (
        <View key={i} style={{ flexDirection: "row", gap: 10 }}>
          {/* user profile icon */}
          <View
            style={{
              width: 35,
              height: 35,
              backgroundColor: colors.black_200,
              borderRadius: 100,
            }}
          ></View>

          {/* comment content */}
          <View
            style={{
           
              width: 300,
              backgroundColor: colors.black_200,
              height: 70,
              borderRadius: 10,
            }}
          ></View>
        </View>
      ))}
    </View>
  );
};

export default CommentPreloader;
