import { View, Text } from "react-native";
import React from "react";
import ProfilePosts from "@/components/post/Posts";
import ProfilePostsOther from "./ProfilePosts";

const ProfileHome = ({ profileId = "" }) => {
  return (
    <View>
      <View>
        {/* posts */}
        {profileId ? <ProfilePostsOther /> : <ProfilePosts />}
      </View>
    </View>
  );
};

export default ProfileHome;
