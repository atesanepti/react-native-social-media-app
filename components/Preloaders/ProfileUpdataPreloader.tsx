import { View, Text } from "react-native";
import React from "react";
import colors from "@/constants/Colors";

const ProfileUpdataPreloader = () => {
  return (
    <View style={{ paddingVertical: 30, paddingHorizontal: 10 }}>
      {/* cover */}
      <View
        style={{
          width: "100%",
          height: 120,
          borderRadius: 10,
          backgroundColor: colors.black_100,
          marginBottom: 10,
        }}
      ></View>
      {/* profile */}
      <View
        style={{
          width: 130,
          height: 130,
          borderRadius: 100,
          marginHorizontal: "auto",
          backgroundColor: colors.black_100,
          marginBottom: 40,
        }}
      ></View>

      {/* lables */}
      <View
        style={{
          width: "100%",
          height: 50,
          backgroundColor: colors.black_100,
          borderRadius: 5,
          marginBottom: 20,
        }}
      ></View>

      <View
        style={{
          width: "100%",
          height: 50,
          backgroundColor: colors.black_100,
          borderRadius: 5,
          marginBottom: 20,
        }}
      ></View>

      <View
        style={{
          width: "100%",
          height: 50,
          backgroundColor: colors.black_100,
          borderRadius: 5,
          marginBottom: 20,
        }}
      ></View>
      <View
        style={{
          width: "100%",
          height: 50,
          backgroundColor: colors.black_100,
          borderRadius: 5,
          marginBottom: 20,
        }}
      ></View>
      <View
        style={{
          width: "100%",
          height: 50,
          backgroundColor: colors.black_100,
          borderRadius: 5,
          marginBottom: 20,
        }}
      ></View>
      <View
        style={{
          width: "100%",
          height: 50,
          backgroundColor: colors.black_100,
          borderRadius: 5,
          marginBottom: 20,
        }}
      ></View>
    </View>
  );
};

export default ProfileUpdataPreloader;
