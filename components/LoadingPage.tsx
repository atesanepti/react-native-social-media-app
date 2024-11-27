import { View, Text, Image, Animated, StyleSheet } from "react-native";
import React, { useEffect, useRef } from "react";
import colors from "@/constants/Colors";

const LoadingPage = () => {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const startPopAnimation = () => {
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 1.2, // Scale up to 120%
        duration: 150, // Fast pop
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1, // Scale back to 100%
        duration: 150, // Fast return
        useNativeDriver: true,
      }),
    ]).start();
  };
  useEffect(() => {
    startPopAnimation();
  }, []);
  return (
    <View
      style={{
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: colors.primary,
      }}
    >
      <View style={{}}>
        <Animated.Image
          resizeMode="contain"
          source={require("../assets/images/logo2.png")} // Replace with your image path
          style={[
            styles.image,

            { transform: [{ scale: scaleAnim }] }, // Bind scale animation
          ]}
        />
        <Text
          style={{
            fontSize: 12,
            color: colors.while,
            fontFamily: "Poppins-Regular",
            textAlign: "center",
          }}
        >
          Loading..
        </Text>
        
      </View>
    </View>
  );
};

export default LoadingPage;
const styles = StyleSheet.create({
  image: {
    width: 150,
    height: 90,
  },
});
