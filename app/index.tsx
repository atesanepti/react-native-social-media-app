import React, { useEffect, useRef, useState } from "react";
import { View, StyleSheet, Animated, Image, Text } from "react-native";
import images from "@/constants/images";
import colors from "@/constants/Colors";
import { getToken } from "@/helpers/token";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "@/redux/features/authSlice";
import { Link, Redirect } from "expo-router";
import LoadingPage from "@/components/LoadingPage";
const PopAnimation = () => {
  const { isLogin, error, isLoading, token } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();
  const [isTokenFount, setTokenFount] = useState(true);

  //check authentication
  useEffect(() => {
    getToken("credential").then((res) => {
      if (res) {
        dispatch(fetchUser(res));
      } else {
        setTokenFount(false);
      }
    });
  }, []);
  if (!isLogin && isTokenFount) {
    return <LoadingPage />;
  } else if (!isTokenFount) {
    return <Redirect href="/Continue" />;
  } else if (isLogin && !error) {
    return <Redirect href="/Home" />;
  } else if (!isLogin && error) {
    return <Redirect href="/Login" />;
  }
};

export default PopAnimation;
