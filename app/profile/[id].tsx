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
import { Link, router, useLocalSearchParams, useNavigation } from "expo-router";
import ProfilePreloader from "@/components/Preloaders/ProfilePreloader";
import { useFindUserQuery } from "@/redux/api/userApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/redux/features/authSlice";
import { deleteToken } from "@/helpers/token";
import ProfileHeader from "@/components/Profile/ProfileHeader";
import ProfileHome from "@/components/Profile/ProfileHome";
import ProfileAbout from "@/components/Profile/ProfileAbout";
import MenuProvider from "@/components/MenuProvider";
import AuthCom from "@/components/AuthCom";
import ProfilePosts from "@/components/Profile/ProfilePosts";

const Profile = () => {
  const { id: userId } = useLocalSearchParams();

  const navigation = useNavigation();
  const [error, setError] = useState("");
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [selectedMenu, setSelectedMenu] = useState("home");

  const {
    data: userData,
    isLoading: userLoading,
    error: fetchError,
  } = useFindUserQuery({ token, userId: userId });

  const userPayload = userData?.payload;

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

  useEffect(() => {
    navigation.setOptions({
      title: `${
        userPayload?.user?.username ? userPayload?.user?.username : "User"
      }`,
    });
  }, [userData]);

  return (
    <AuthCom>
      <ScrollView
        style={{
          flex: 1,
          backgroundColor: colors.primary,
        }}
      >
        <View>
          <StatusBar backgroundColor={colors.primary} style="light" />

          {userPayload && !userLoading && (
            <>
              <ProfileHeader
                action={true}
                profile={{
                  id: userPayload.user.id,
                  postCount: userPayload.postCount,
                  connectionCount: userPayload.connectionCount,
                  cover: userPayload.user.profile.cover,
                  profileImage: userPayload.user.profile.image,
                  username: userPayload.user.username,
                  bio: userPayload.user.profile.bio,
                  link: userPayload.user.profile.link,
                  userIsConnected: userPayload.userIsConnected,
                }}
              />
            </>
          )}

          {!userPayload && userLoading && <ProfilePreloader />}

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

          {selectedMenu == "home" && (
            <ProfilePosts userId="671b753d9765ea37ae885302" />
          )}

          {selectedMenu == "about" && (
            <ProfileAbout
              profile={{
                ...userPayload.user.profile,
                user: { id: userPayload.user.id },
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
