import {
  View,
  Text,
  ScrollView,
  StatusBar,
  RefreshControl,
  Pressable,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link } from "expo-router";
import AuthCom from "@/components/AuthCom";
import HomeHeader from "@/components/Home/HomeHeader";
import { useFetchNewsfeedPostsQuery } from "@/redux/api/postApiSlice";
import colors from "@/constants/Colors";
import { useSelector } from "react-redux";
import PostPreloader from "@/components/Preloaders/PostPreloader";
import Posts from "./../../components/post/Posts";
import AntDesign from "@expo/vector-icons/AntDesign";
const Home = () => {
  const { token } = useSelector((state) => state.auth);
  const [allPosts, setAllPosts] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const refreshHandler = () => {
    setRefreshing(true);

    setTimeout(() => {
      setRefreshing(false);
      refetch();
    }, 2000);
  };

  const {
    data: postPayload,
    isLoading,
    error,
    refetch,
  } = useFetchNewsfeedPostsQuery(token);

  let posts = postPayload?.payload;

  useEffect(() => {
    if (allPosts.length) {
      setAllPosts((prev) => [...prev, ...posts]);
    } else if (posts) {
      setAllPosts(posts);
    }
  }, [posts]);

  const handleLoadMorePosts = () => {
    refetch();
  };

  return (
    <AuthCom>
      <SafeAreaView
        style={{
          backgroundColor: colors.primary,
          flex: 1,
        }}
      >
        <HomeHeader />
        <StatusBar backgroundColor={colors.primary} />

        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={refreshHandler}
            />
          }
        >
          <Posts
            posts={allPosts.length > 0 ? allPosts : posts}
            isLoading={isLoading}
            error={error}
            preloaderCount={3}
          />

          {allPosts.length > 0 && (
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
              }}
            >
              <Pressable
                style={{
                  marginVertical: 10,
                  paddingHorizontal: 10,
                  paddingVertical: 5,
                  width: 140,
                  marginHorizontal: "auto",
                  backgroundColor: colors.activeYellow,
                  borderRadius: 6,
                  borderColor: colors.black_100,
                  borderWidth: 1,
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 10,
                }}
                onPress={handleLoadMorePosts}
              >
                <Text
                  style={{
                    color: colors.while,
                    fontFamily: "Poppins-Medium",
                    fontSize: 12,
                    textAlign: "center",
                  }}
                >
                  Load More
                </Text>
                {isLoading ? (
                  <ActivityIndicator size={"small"} color={colors.while} />
                ) : (
                  <AntDesign name="reload1" size={18} color={colors.while} />
                )}
              </Pressable>
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
    </AuthCom>
  );
};

export default Home;
