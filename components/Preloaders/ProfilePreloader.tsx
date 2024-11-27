import { View, Text } from "react-native";
import React from "react";
import colors from "@/constants/Colors";

const ProfilePreloader = () => {
  return (
    <View style={{ alignItems: "center" }}>
      {/* profile cover */}
      <View
        style={{
          position: "relative",
          width: "100%",
          aspectRatio: 16 / 7,
          backgroundColor: colors.black_100,
        }}
      >
        {/* Profile image */}
        <View
          style={{
            position: "absolute",
            width: 120,
            height: 120,
            borderRadius: 100,
            backgroundColor: colors.black_200,
            marginTop: 70,
            left: 30,
            top: 50,
          }}
        ></View>
      </View>

      {/* Profile name */}
      <View
        style={{
          width: 150,
          height: 40,
          backgroundColor: colors.black_200,
          borderRadius: 10,
          marginVertical: 20,
          marginLeft: 40,
        }}
      ></View>

      {/* bio */}
      <View
        style={{
          width: 350,
          height: 40,
          backgroundColor: colors.black_200,
          borderRadius: 10,
        }}
      ></View>

      {/* profile post and connects count */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          gap: 10,
          marginVertical: 20,
        }}
      >
        <View
          style={{
            width: 70,
            height: 50,
            backgroundColor: colors.black_100,
            borderRadius: 10,
          }}
        ></View>
        <View
          style={{
            width: 70,
            height: 50,
            backgroundColor: colors.black_100,
            borderRadius: 10,
          }}
        ></View>
      </View>
      {/* about and home menu */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          gap: 10,
          marginVertical: 20,
        }}
      >
        <View
          style={{
            width: 120,
            height: 40,
            borderRadius: 5,
            backgroundColor: colors.black_100,
          }}
        ></View>
        <View
          style={{
            width: 120,
            height: 40,
            borderRadius: 5,
            backgroundColor: colors.black_100,
          }}
        ></View>
      </View>
    </View>
  );
};

export default ProfilePreloader;
