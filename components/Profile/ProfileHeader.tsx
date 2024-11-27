import {
  View,
  Text,
  Image,
  Pressable,
  Linking,
  Alert,
  Dimensions,
} from "react-native";
import React, { useState } from "react";
import { Link } from "expo-router";
import colors from "@/constants/Colors";
import ProfileStatus from "./ProfileStatus";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import ImageGallery from "../ImageGallery";
import ProfileActions from "./ProfileActions";
import images from "@/constants/images";

const ProfileHeader = ({ profile, action = false }) => {
  const [imageGallery, setImageGallery] = useState({
    isShow: false,
    aspectRatio: "",
    image: "",
    height: 0,
  });
  const screenWidth = Dimensions.get("window").width;
  const [coverHeight, setCoverHeight] = useState(0);

  const coverImageLoaded = (e) => {
    const { width, height } = e.nativeEvent.source;
    const calculatedHeight = (height / width) * screenWidth;
    setCoverHeight(calculatedHeight);
  };
  const {
    profileImage,
    cover,
    username,
    connectionCount,
    postCount,
    bio,
    link,
  } = profile;

  return (
    <View>
      <ImageGallery
        onClose={() =>
          setImageGallery({
            isShow: false,
            image: "",
            height: 0,
            aspectRatio: "",
          })
        }
        isVisiable={imageGallery.isShow}
        image={imageGallery.image}
        aspectRatio={imageGallery.aspectRatio}
        height={imageGallery.height}
      />
      <View style={{ alignItems: "center", padding: 10 }}>
        <View style={{ position: "relative" }}>
          <View
            style={{
              width: "100%",
              aspectRatio: 16 / 7,
              backgroundColor: colors.black_200,
              borderRadius: 15,
            }}
          >
            <Pressable
              onPress={() =>
                setImageGallery({
                  isShow: true,
                  height: coverHeight,
                  image: cover,
                  aspectRatio: "",
                })
              }
            >
              <Image
                onLoad={coverImageLoaded}
                source={profileImage && { uri: cover }}
                style={{ width: "100%", aspectRatio: 16 / 7, borderRadius: 15 }}
              />
            </Pressable>
          </View>
          <View
            style={{
              position: "absolute",
              top: 110,
              left: 20,
              width: 120,
              aspectRatio: 1 / 1,
              backgroundColor: colors.black_200,
              borderRadius: 100,
            }}
          >
            <Pressable
              onPress={() =>
                setImageGallery({
                  isShow: true,
                  image: profileImage,
                  aspectRatio: "1/1",
                })
              }
            >
              <Image
                source={{ uri: profileImage }}
                style={{
                  width: "100%",
                  aspectRatio: 1 / 1,
                  borderRadius: 100,
                  marginHorizontal: "auto",
                  borderWidth: 3,
                }}
              />
            </Pressable>
          </View>
        </View>

        <Text
          style={{
            textAlign: "center",
            fontSize: 17,
            color: colors.while,
            fontFamily: "Poppins-Bold",
            marginTop: 10,
            marginLeft: 80,
          }}
        >
          {username}
        </Text>

        <View>
          <Text
            style={{
              fontSize: 13,
              color: "#ddd",
              marginTop: 20,
              textAlign: "center",
            }}
          >
            {bio}
          </Text>
          {link && (
            <Pressable
              onPress={async () => {
                try {
                  await Linking.openURL(link);
                } catch (error) {
                  Alert.alert("URL Can't Find", `${link} no longer exists!`);
                }
              }}
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: 15,
                justifyContent: "center",
              }}
            >
              <EvilIcons name="link" size={24} color="#006BFF" />
              <Text
                style={{
                  fontSize: 13,
                  color: "#006BFF",
                  paddingVertical: 2,
                }}
              >
                {link}
              </Text>
            </Pressable>
          )}
        </View>
        {action && (
          <ProfileActions
            userId={profile.id}
            userIsConnected={profile.userIsConnected}
          />
        )}
        <ProfileStatus post={postCount} connects={connectionCount} />
      </View>
    </View>
  );
};

export default ProfileHeader;
