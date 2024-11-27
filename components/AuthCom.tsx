import { useCredential } from "@/context/credentials";
import React, { useEffect } from "react";
import { Redirect } from "expo-router";
import { View, Text, ActivityIndicator } from "react-native";
import colors from "@/constants/Colors";
import { useDispatch, useSelector } from "react-redux";
import { getToken } from "@/helpers/token";
import { fetchUser } from "@/redux/features/authSlice";

const AuthCom = ({ children }) => {
  const { isLogin } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  return <>{isLogin ? children : <Redirect href="/Login" />}</>;
};

export default AuthCom;
