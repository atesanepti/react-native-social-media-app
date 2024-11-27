import { View, Text, Image, Pressable, TouchableOpacity } from "react-native";
import React from "react";
import { AntDesign, Feather, EvilIcons } from "@expo/vector-icons";
import Colors from "@/constants/Colors";
import images from "@/constants/images";
import colors from "@/constants/Colors";
import { useRouter } from "expo-router";
const HomeHeader = () => {
  const router = useRouter();
  return (
    <View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingHorizontal: 20,
          paddingVertical: 20,
          backgroundColor: colors.primary,
          borderBottomColor: colors.black_200,
          borderBottomWidth: 1,
        }}
      >
        {/* brand logo */}
        <View style={{ width: 120 }}>
          <Image
            source={images.logo}
            style={{ width: "100%", height: 35 }}
            resizeMode="contain"
          />
        </View>

        {/* search and notification buttons */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 30,
          }}
        >
          {/* <TouchableOpacity onPress={() => {}} style={{ position: "relative" }}>
            <Feather name="bell" size={24} color={colors.while} />

         
            <View
              style={{
                position: "absolute",
                top: -5,
                right: -5,
                borderRadius: 100,
                backgroundColor: colors.activeYellow,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                width: 20,
                height: 20,
              }}
            >
              <Text
                style={{
                  fontFamily: "Poppins-Medium",
                  fontSize: 9,
                  color: colors.while,
                }}
              >
                9+
              </Text>
            </View>
          </TouchableOpacity> */}

          <TouchableOpacity onPress={() => router.push("/ProfileUpdate")}>
            <EvilIcons name="gear" size={27} color={colors.while} />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              router.push("/Search");
            }}
          >
            <AntDesign name="search1" size={24} color={colors.while} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default HomeHeader;
