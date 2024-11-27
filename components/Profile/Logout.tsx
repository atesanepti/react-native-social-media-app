import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import React from "react";
import { logout } from "@/redux/features/authSlice";
import { useSelector, useDispatch } from "react-redux";
import AntDesign from "@expo/vector-icons/AntDesign";
import colors from "@/constants/Colors";
import { useRouter } from "expo-router";
import { deleteToken } from "@/helpers/token";
const Logout = () => {
  const { token } = useSelector((state) => state.auth);
  const { width, height } = Dimensions.get("screen");

  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogout = async () => {
    dispatch(logout());
    await deleteToken("credential");
    router.push("/Login");
  };

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "flex-end",
        paddingHorizontal: 15,
      }}
    >
      <TouchableOpacity
        style={{
          backgroundColor: "#ff2a3c59",
          width: 40,
          height: 40,
          borderRadius: 100,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
        onPress={handleLogout}
      >
        <AntDesign name="logout" size={20} color="#ff2a3c" />
      </TouchableOpacity>
    </View>
  );
};

export default Logout;
