import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  TouchableOpacity,
  Switch,
  RefreshControl,
} from "react-native";
import React, { useEffect, useState } from "react";
import AuthCom from "@/components/AuthCom";
import colors from "@/constants/Colors";
import { StatusBar } from "expo-status-bar";
import icons from "@/constants/icons";
import Button from "@/components/Button";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import TimeUpload from "@/components/TimeUpload";
import ReelUpload from "@/components/ReelUpload";
import { useSelector } from "react-redux";

const Create = () => {
  const [updateType, setUploadType] = useState("times");
  const { post } = useSelector((state) => state.postShare);

  console.log("POstlkasdjflkasdlfkj", post);

  return (
    <AuthCom>
      <StatusBar backgroundColor={colors.primary} style="light" />

      <ScrollView
        style={{
          backgroundColor: colors.primary,
          flex: 1,
          paddingVertical: 60,
        }}
        contentContainerStyle={{ justifyContent: "center" }}
      >
        <View
          style={{
            paddingHorizontal: 15,
            flex: 1,
            height: "100%",
            paddingBottom: 100,
          }}
        >
          <View style={{ flexDirection: "row" }}>
            <Text
              style={{
                color: colors.while,
                fontFamily: "Poppins-SemiBold",
                fontSize: 23,
              }}
            >
              Upload /
            </Text>
            <Pressable
              onPress={() => {
                if (updateType == "times") {
                  setUploadType("reel");
                } else {
                  setUploadType("times");
                }
              }}
            >
              <Text
                style={{
                  color: colors.gray,
                  fontFamily: "Poppins-SemiBold",
                  fontSize: 23,
                }}
              >
                {updateType == "times" ? "Times" : "Reel"}
              </Text>
            </Pressable>
          </View>

          {updateType == "times" ? <TimeUpload post={post} /> : <ReelUpload />}
        </View>
      </ScrollView>
    </AuthCom>
  );
};

export default Create;

const styles = StyleSheet.create({});
