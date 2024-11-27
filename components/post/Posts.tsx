import { View, Text, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import PostPreloader from "../Preloaders/PostPreloader";
import { useFetchPostsMineQuery } from "@/redux/api/postApiSlice";
import { useSelector } from "react-redux";
import Post from "./Post";
import { Link } from "expo-router";
import colors from "@/constants/Colors";
import Entypo from "@expo/vector-icons/Entypo";
const Posts = ({ posts, isLoading, error, preloaderCount = 2 }) => {
  return (
    <View style={{ marginTop: 10 }}>
      {/* if post not found? */}
      {posts?.length == 0 &&
        !isLoading && (
          <View style={{ alignItems: "center", gap: -10 }}>
            <Link
              href="/Create"
              style={{
                color: colors.gray,
                fontSize: 13,
                fontFamily: "Poppins-Regular",
                textAlign: "center",
                marginVertical: 10,
                marginTop: 20,
                borderRadius: 10,
                marginHorizontal: 10,
              }}
            >
              Make Your Times
            </Link>
            <Entypo name="back" size={24} color={colors.gray} />
          </View>
        )}

      {/* loading */}
      {isLoading && <PostPreloader count={preloaderCount} />}

      {/* if posts found */}
      {posts && !isLoading && (
        <View>
          {posts.map((post, i) => (
            <Post post={post} key={i} />
          ))}
        </View>
      )}
    </View>
  );
};

export default Posts;
