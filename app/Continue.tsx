import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  StatusBar,
} from "react-native";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link, Redirect, router } from "expo-router";
import images from "@/constants/images";
import colors from "@/constants/Colors";
import Button from "@/components/Button";
import AuthCom from "@/components/AuthCom";
import { useCredential } from "@/context/credentials";
import { getToken } from "@/helpers/token";
import { useSelector } from "react-redux";

const Index = () => {
  const auth = useSelector((state) => state.auth);
  // useEffect(() => {
  //   console.log("auth ", auth);
  // }, [auth]);

  return (
    <SafeAreaView
      style={{
        backgroundColor: colors.primary,
        flex: 1,
        justifyContent: "center",
      }}
    >
      <View style={styles.container}>
        <StatusBar backgroundColor={colors.primary} barStyle="light-content" />

        <Image
          source={images.logo}
          resizeMode="contain"
          style={{ width: 150, height: 90 }}
        />
        <Image
          source={images.cards}
          resizeMode="contain"
          style={{ width: 370, height: 298 }}
        />
        <View style={{ position: "relative", marginVertical: 10 }}>
          <Text
            style={{
              fontSize: 21,
              color: colors.while,
              fontFamily: "Poppins-SemiBold",
              textAlign: "center",

              position: "relative",
            }}
          >
            Discover Endless {"\n"} Possibilities with{" "}
            <Text style={{ color: colors.activeYellow, fontSize: 21 }}>
              Epti
            </Text>
          </Text>
          <Image
            style={{
              position: "absolute",
              bottom: 0,
              right: 0,
              width: 50,
              height: 20,
            }}
            source={images.path}
            resizeMode="contain"
          />
        </View>

        <Text style={{ fontSize: 12, color: colors.gray, textAlign: "center" }}>
          Where Creativity Meets Innovation: Embark on a Journey of Limitless
          Exploration with Aora
        </Text>
        <Button
          onPress={() => {
            router.push("/Login");
          }}
          title="Continue with Email"
        />
      </View>
    </SafeAreaView>
  );
};

export default Index;

const styles = StyleSheet.create({
  container: {
    height: "auto",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
});
