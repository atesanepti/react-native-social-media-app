import { View, Text, Pressable, TouchableHighlight, Image } from "react-native";
import React, { useState } from "react";
import colors from "@/constants/Colors";
import moment from "moment";
import Menu, { MenuList } from "../MenuList";
import { Entypo } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import { useRouter } from "expo-router";

const PostHeader = ({ post }) => {
  const auth = useSelector((state) => state.auth);
  const userId = auth?.user?.id;
  const { createdAt, user } = post;
  const { username, profileImage, id } = user;
  const [menuVisible, setMenuVisible] = useState(false);

  const router = useRouter();

  const navigateToUserProfile = () => {
    if (id == userId) {
      router.push(`/Profile`);
    } else {
      router.push(`/profile/${id}`);
    }
  };

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 10,
      }}
    >
      <View style={{ flexDirection: "row", gap: 10, alignItems: "center" }}>
        <TouchableHighlight onPress={navigateToUserProfile}>
          <Image
            source={user && { uri: profileImage }}
            style={{ width: 45, height: 45, borderRadius: 10 }}
          />
        </TouchableHighlight>
        <View>
          <TouchableHighlight onPress={navigateToUserProfile}>
            <Text
              style={{
                fontSize: 13,
                fontFamily: "Poppins-SemiBold",
                color: colors.while,
              }}
            >
              {username}
            </Text>
          </TouchableHighlight>

          <Text
            style={{
              fontSize: 9,
              fontFamily: "Poppins-Regular",
              color: colors.gray,
              marginTop: -5,
            }}
          >
            {moment(createdAt).fromNow()}
          </Text>
        </View>
      </View>

      <Pressable
        style={{ width: 60 }}
        onPress={() => setMenuVisible(!menuVisible)}
      >
        <Entypo
          style={{ textAlign: "right" }}
          name="dots-three-vertical"
          size={20}
          color={colors.gray}
        />
      </Pressable>

      {/* menu options */}
      {/* <Menu visible={menuVisible} style={{ top: 0, right: 40 }}>
        <MenuList title="Share" onPress={() => {}} />
        {user.id == userId && <MenuList title="Edit" onPress={() => {}} />}
      </Menu> */}
    </View>
  );
};

export default PostHeader;
