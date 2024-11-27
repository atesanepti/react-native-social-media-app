import { View, Text, ScrollView, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import colors from "@/constants/Colors";
import { router, useFocusEffect } from "expo-router";
import { fetchMine, updateUserApi } from "@/queries/userQueries";
import { StatusBar } from "expo-status-bar";
import ProfilePreloader from "@/components/Preloaders/ProfilePreloader";
import Input from "@/components/Input";
import Button from "@/components/Button";
import { generatePassword } from "@/helpers/passwordGen";
import iconSet from "@expo/vector-icons/build/Fontisto";
import icons from "@/constants/icons";
import { userValidation } from "@/helpers/validation";
import FormErrorMessage from "@/components/FormErrorMessage";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import * as ImagePicker from "expo-image-picker";
import {
  useUserUpdateMutation,
  useUserMineQuery,
} from "@/redux/api/userApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials } from "@/redux/features/authSlice";
import AuthCom from "@/components/AuthCom";
import Logout from "./../../components/Profile/Logout";

const ProfileUpdate = () => {
  const [error, setError] = useState("");
  const { token } = useSelector((state) => state.auth);
  const [form, setForm] = useState({
    username: "",
    email: "",
    oldPassword: "",
    newPassword: "",
  });

  const [userUpdateApi, { isLoading: updateLoading }] = useUserUpdateMutation();
  const { data, isLoading: fetchLoading } = useUserMineQuery(token);
  const user = data?.user;

  const dispatch = useDispatch();

  const passwordGen = () => {
    const password = generatePassword();
    setForm((prev) => ({ ...prev, newPassword: password }));
  };

  const handleUpdate = async () => {
    const willBeValidate = {
      username: form.username,
      email: form.email,
    };
    if (form.oldPassword) {
      willBeValidate.newPassword = form.newPassword;
    }
    if (form.newPassword) {
      willBeValidate.oldPassword = form.oldPassword;
    }
    const errors = userValidation(willBeValidate);

    if (errors?.error) {
      return setError(errors.error);
    }
    const formData = {};

    for (let key in form) {
      if (user[key] !== form[key]) {
        formData[key] = form[key];
      }
    }

    if (formData.length == 0) return true;

    try {
      const response = await userUpdateApi({
        payload: formData,
        token,
      }).unwrap();
      console.log("Response = ", response);
      dispatch(
        setCredentials({
          user: {
            username: response.user.username,
            id: response.user.id,
            email: response.user.email,
          },
          token,
        })
      );
      if (error) {
        setError("");
      }
    } catch (error) {
      // console.log(error);
      if (error?.data) {
        setError(error.data?.error);
      } else {
        setError(error.message);
      }
    }
  };

  useEffect(() => {
    if (user) {
      setForm({
        username: user.username,
        email: user.email,
        newPassword: undefined,
        oldPassword: undefined,
      });
    }
  }, [user]);

  useEffect(() => {
    console.log("error ", error);
  }, [error]);

  return (
    <AuthCom>
      <ScrollView style={{ flex: 1, backgroundColor: colors.primary }}>
        <View
          style={{
            flex: 1,
            paddingVertical: 20,
          }}
        >
          <StatusBar backgroundColor={colors.primary} style="light" />
          <Logout />
          {!fetchLoading && user ? (
            <View style={{ paddingVertical: 60 }}>
              <Text
                style={{
                  fontSize: 28,
                  color: colors.while,
                  textAlign: "center",
                  fontFamily: "Poppins-SemiBold",
                  textTransform: "uppercase",
                  marginBottom: -10,
                }}
              >
                Hey,
              </Text>
              <Text
                style={{
                  fontSize: 20,
                  color: colors.while,
                  textAlign: "center",
                  fontFamily: "Poppins-SemiBold",
                  textTransform: "uppercase",
                }}
              >
                Be More <Text style={{ color: "#54C392" }}>secure</Text> Anytime
              </Text>
              <View style={{ marginTop: 40, paddingHorizontal: 30 }}>
                <Input
                  mb={20}
                  onChange={(value) =>
                    setForm((prev) => ({ ...prev, username: value }))
                  }
                  type="text"
                  value={form.username}
                  placeholder="User name"
                />
                <Input
                  mb={20}
                  onChange={(value) =>
                    setForm((prev) => ({ ...prev, email: value }))
                  }
                  type="text"
                  value={form.email}
                  placeholder="Emaill Address"
                />
                <Input
                  mb={20}
                  onChange={(value) =>
                    setForm((prev) => ({ ...prev, oldPassword: value }))
                  }
                  type="password"
                  value={form.oldPassword}
                  placeholder="Old Password"
                />
                <Input
                  mb={20}
                  onChange={(value) =>
                    setForm((prev) => ({ ...prev, newPassword: value }))
                  }
                  type="password"
                  value={form.newPassword}
                  placeholder="New Password"
                />
                <Pressable onPress={passwordGen}>
                  <Text
                    style={{
                      color: "#34f0c7",
                      fontSize: 10,
                      borderWidth: 1,
                      borderColor: "#15B392",
                      borderStyle: "dotted",
                      width: 140,
                      paddingHorizontal: 3,
                      paddingVertical: 2,
                      borderRadius: 3,
                      textAlign: "center",
                      backgroundColor: "#1cad8e62",
                    }}
                  >
                    Auto Genarate
                  </Text>
                </Pressable>
                {error && <FormErrorMessage message={error} />}

                <Button
                  isLoading={updateLoading}
                  title="Update Profile"
                  onPress={handleUpdate}
                />
              </View>
            </View>
          ) : (
            <ProfilePreloader />
          )}
        </View>
      </ScrollView>
    </AuthCom>
  );
};

export default ProfileUpdate;
