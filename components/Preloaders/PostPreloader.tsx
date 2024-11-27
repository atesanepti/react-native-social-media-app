import { View, Text } from "react-native";
import React from "react";
import colors from "@/constants/Colors";

const PostPreloader = ({ count = 1 }) => {
  const countArra = Array.from({ length: count });
  return (
    <>
      {countArra.map((_, i) => (
        <View key={i} style={{ marginVertical: 15, paddingHorizontal: 10 }}>
          <View
            style={{
              width: "100%",
              height: 55,
              borderRadius: 10,
              marginBottom: 10,
              gap: 10,
              flexDirection: "row",
            }}
          >
            <View
              style={{
                backgroundColor: colors.black_200,
                width: 50,
                height: 50,
                borderRadius: 10,
              }}
            ></View>

            <View style={{ flexGrow: 1 }}>
              <View
                style={{
                  width: "100%",
                  height: 25,
                  backgroundColor: colors.black_200,
                  borderRadius: 10,
                }}
              ></View>
              <View
                style={{
                  width: 60,
                  height: 15,
                  backgroundColor: colors.black_200,
                  borderRadius: 10,
                  marginTop: 7,
                }}
              ></View>
            </View>
          </View>

          <View
            style={{
              width: "100%",
              height: 230,
              borderRadius: 10,
              marginBottom: 10,
              backgroundColor: colors.black_200,
            }}
          ></View>
        </View>
      ))}
    </>
  );
};

export default PostPreloader;
