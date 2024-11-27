import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  Pressable,
  RefreshControl,
  SectionList,
} from "react-native";
import React, { useEffect, useState } from "react";
import colors from "@/constants/Colors";
import icons from "@/constants/icons";
import { StatusBar } from "expo-status-bar";
import ProfileStatus from "@/components/Profile/ProfileStatus";
import { fetchMine, logoutApi } from "@/queries/userQueries";
import { Link, router } from "expo-router";
import Toast, { CloseToast } from "@/components/Toast";
import ProfilePreloader from "@/components/Preloaders/ProfilePreloader";
import { useUserMineQuery } from "@/redux/api/userApiSlice";
import { useFetchPostsMineQuery } from "@/redux/api/postApiSlice";
import { useDispatch, useSelector, UseSelector } from "react-redux";
import { logout } from "@/redux/features/authSlice";
import { deleteToken } from "@/helpers/token";
import ProfileHeader from "@/components/Profile/ProfileHeader";
import { LinearGradient } from "expo-linear-gradient";
import ProfileHome from "@/components/Profile/ProfileHome";
import ProfileAbout from "@/components/Profile/ProfileAbout";
import MenuProvider from "@/components/MenuProvider";
import AuthCom from "@/components/AuthCom";
import ProfilePosts from "@/components/Profile/ProfilePosts";

const Profile = () => {
  const [error, setError] = useState("");
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [selectedMenu, setSelectedMenu] = useState("home");

  const {
    data: userData,
    isLoading: userLoading,
    error: fetchError,
  } = useUserMineQuery(token);

  const handleLogout = async () => {
    const response = await logoutApi();
    if (!response.ok) {
      setError(response.error);
    } else {
      await deleteToken("credential");
      setError("");
      dispatch(logout());
      router.push("/Login");
    }
  };

  return (
    <AuthCom>
      <ScrollView
        style={{
          flex: 1,
          backgroundColor: colors.primary,
        }}
      >
        <View style={{ paddingVertical: 40 }}>
          <StatusBar backgroundColor={colors.primary} style="light" />

          {userData && !userLoading && (
            <>
              <ProfileHeader
                profile={{
                  postCount: userData.postCount,
                  connectionCount: userData.connectionCount,
                  cover: userData.user.profile.cover,
                  profileImage: userData.user.profile.image,
                  username: userData.user.username,
                  bio: userData.user.profile.bio,
                  link: userData.user.profile.link,
                }}
              />
            </>
          )}

          {!userData && userLoading && <ProfilePreloader />}

          {/* home-about togglers */}
          {userData && !userLoading && (
            <View
              style={{
                width: "100%",
                flexDirection: "row",
                alignItems: "center",
                paddingHorizontal: 20,
              }}
            >
              <Pressable
                onPress={() => setSelectedMenu("home")}
                style={{ flexGrow: 1, flexShrink: 1 }}
              >
                <Text
                  style={{
                    paddingVertical: 5,
                    textAlign: "center",
                    color: selectedMenu == "home" ? "#fff" : colors.gray,
                    borderBottomWidth: 2,
                    fontFamily: "Poppins-Medium",
                    borderBottomColor:
                      selectedMenu == "home" ? "#fff" : "transparent",
                  }}
                >
                  Home
                </Text>
              </Pressable>
              <Pressable
                onPress={() => setSelectedMenu("about")}
                style={{ flexGrow: 1, flexShrink: 1 }}
              >
                <Text
                  style={{
                    paddingVertical: 5,
                    textAlign: "center",
                    color: selectedMenu == "about" ? "#fff" : colors.gray,
                    borderBottomWidth: 2,
                    fontFamily: "Poppins-Medium",
                    borderBottomColor:
                      selectedMenu == "about" ? "#fff" : "transparent",
                  }}
                >
                  About
                </Text>
              </Pressable>
            </View>
          )}

          {selectedMenu == "home" && <ProfilePosts />}

          {selectedMenu == "about" && (
            <ProfileAbout
              profile={{
                ...userData.user.profile,
                user: { id: userData.user.id },
              }}
            />
          )}
        </View>
      </ScrollView>
    </AuthCom>
  );
};

export default Profile;

const styles = StyleSheet.create({});
