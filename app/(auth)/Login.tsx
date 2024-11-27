import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  SafeAreaView,
  Image,
  TextInput,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import colors from "@/constants/Colors";
import images from "@/constants/images";
import Button from "@/components/Button";
import Input from "@/components/Input";
import { Link, router } from "expo-router";
import { userValidation } from "@/helpers/validation";
import { login } from "@/queries/userQueries";
import Toast, { CloseToast } from "@/components/Toast";
import { setToken } from "@/helpers/token";
import AuthCom from "@/components/AuthCom";

import { setCredentials } from "@/redux/features/authSlice";
import { useDispatch } from "react-redux";
import { useUserLoginMutation } from "@/redux/api/userApiSlice";

const Login = () => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const [loginApi, { isLoading }] = useUserLoginMutation();

  const handleLogin = async () => {
    const errors = userValidation("pass", email, password);

    if (errors) {
      setError(errors.error);
      return 0;
    }

    try {
      const response = await loginApi({ email, password }).unwrap();
      setError("");
      dispatch(
        setCredentials({
          user: {
            id: response.user.id,
            username: response.user.username,
            email: response.user.email,
          },
          token: response.token,
        })
      );
      await setToken("credential", response.token);

      router.push("/Home");
    } catch (error: any) {
      if (error.data?.error) {
        setError(error.data?.error);
      }
    }
  };

  return (
    <ScrollView
      style={{ backgroundColor: colors.primary }}
      contentContainerStyle={{ flex: 1, justifyContent: "center" }}
    >
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View style={{ width: "100%", paddingHorizontal: 20 }}>
          <Image
            source={images.logo}
            resizeMode="contain"
            style={{ width: 150, height: 90 }}
          />
          <View style={{ marginTop: 20 }}>
            <Text
              style={{
                fontSize: 20,
                fontFamily: "Poppins-Bold",
                color: colors.while,
                marginBottom: 20,
              }}
            >
              SignIn
            </Text>
            <Input
              mb={20}
              name="Email"
              placeholder="Enter your Email"
              value={email}
              onChange={(value) => setEmail(value)}
            />
            <Input
              mb={20}
              name="Password"
              placeholder="Enter your password"
              type="password"
              value={password}
              onChange={(value) => setPassword(value)}
            />
            <Link
              href="/Signup"
              style={{
                fontSize: 12,
                color: colors.activeYellow,
                textAlign: "right",
                fontFamily: "Poppins-Medium",
                marginTop: 10,
              }}
            >
              Create New Account
            </Link>
            {error && (
              <Toast
                top={-150}
                variant="error"
                message={error}
                closeBtn={<CloseToast onClose={() => setError("")} />}
              />
            )}
            <Button
              isLoading={isLoading}
              title="SignIn"
              onPress={handleLogin}
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default Login;

const styles = StyleSheet.create({});
