import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  Image,
  TextInput,
  Pressable,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import colors from "@/constants/Colors";
import images from "@/constants/images";
import Button from "@/components/Button";
import Input from "@/components/Input";
import { Link, router } from "expo-router";
import Toast, { CloseToast } from "@/components/Toast";
import { userValidation } from "@/helpers/validation";
import { createUser } from "@/queries/userQueries";
import AuthCom from "@/components/AuthCom";
import { useUserCreateMutation } from "@/redux/api/userApiSlice";
import { useDispatch } from "react-redux";

const Signup = () => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");

  // user apis - (create)
  const [createUserApi, { isLoading, error: signError }] =
    useUserCreateMutation();

  const handleCreateUser = async () => {
    // const willBeValidate = {
    //   username: username,
    //   email: email,
    //   password: password,
    // };

    // const errors = userValidation(willBeValidate);

    // if (errors) {
    //   setError(errors.error);
    //   return 0;
    // }

    try {
      const response = await createUserApi({
        username,
        password,
        email,
      }).unwrap();
      setError("");
      router.push("/Login");
    } catch (error: any) {
      setError(error.data.error);
    }
  };

  return (
    <ScrollView
      style={{ backgroundColor: colors.primary }}
      contentContainerStyle={{
        flex: 1,
        justifyContent: "center",
      }}
    >
      <View>
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
              SignUp
            </Text>
            <Input
              mb={15}
              name="Username"
              placeholder="User Name"
              value={username}
              onChange={(value) => setUsername(value)}
            />
            <Input
              mb={15}
              name="Email"
              placeholder="Enter your Email"
              value={email}
              onChange={(value) => setEmail(value)}
            />
            <Input
              mb={15}
              name="Password"
              placeholder="Enter your password"
              value={password}
              type="password"
              onChange={(value) => setPassword(value)}
            />

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
              onPress={handleCreateUser}
            />

            <Text
              style={{
                fontSize: 12,
                color: colors.gray,
                textAlign: "center",
                marginTop: 20,
              }}
            >
              Already have an account?{" "}
              <Link
                href="/Login"
                style={{
                  color: colors.activeYellow,
                  fontFamily: "Poppins-SemiBold",
                }}
              >
                Login
              </Link>
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default Signup;

const styles = StyleSheet.create({});
