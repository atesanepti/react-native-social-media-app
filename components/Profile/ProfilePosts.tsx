import { View, Text } from "react-native";
import React from "react";
import {
  useFetchPostsMineQuery,
  useFetchPostsQuery,
} from "@/redux/api/postApiSlice";
import { useSelector } from "react-redux";
import Posts from "../post/Posts";

const ProfileMinePosts = ({ token }) => {
  
  const { data: postsData, isLoading, error } = useFetchPostsMineQuery(token);
  const posts = postsData?.payload;

  return <Posts posts={posts} isLoading={isLoading} error={error} />;
};

const OtherProfilePosts = ({ token, userId }) => {
  const {
    data: postsData,
    isLoading,
    error,
  } = useFetchPostsQuery({ token, userId });
  const posts = postsData?.payload;
  return <Posts posts={posts} isLoading={isLoading} error={error} />;
};

const ProfilePosts = ({ userId = "" }) => {
  const { token } = useSelector((state) => state.auth);
  return (
    <>
      {userId ? (
        <OtherProfilePosts token={token} userId={userId} />
      ) : (
        <ProfileMinePosts token={token} />
      )}
    </>
  );
};

export default ProfilePosts;
