import { View, Text, Pressable, TouchableOpacity } from "react-native";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useCreateSharePostMutation } from "@/redux/api/postApiSlice";
import Colors from "@/constants/Colors";
import PostHeader from "./PostHeader";
import PostContent from "./PostContent";
import Button from "../Button";
import { EvilIcons } from "@expo/vector-icons";
import { removeSharePost } from "@/redux/features/postShareSlice";
import { useRouter } from "expo-router";
const PostSharePreview = ({ post, context }) => {
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const router = useRouter();
  const handleSharePostRemove = () => {
    dispatch(removeSharePost());
  };

  const [createSharePost, { isLoading, error }] = useCreateSharePostMutation();

  const handleShare = async () => {
    try {
      const res = await createSharePost({
        payload: { content: context, sharedPostId: post.id },
        token,
      }).unwrap();
      console.log("RESPONSE", res);
      router.push("/Profile");
    } catch (error) {
      console.log("ERROR ", error);
    }
  };

  return (
    <View>
      {Object.keys(post).length > 0 && (
        <View
          style={{
            backgroundColor: Colors.black_200,
            overflow: "hidden",
            paddingVertical: 10,
            borderRadius: 10,
          }}
        >
          <View>
            <PostHeader
              post={{
                createdAt: post.createdAt,
                user: {
                  username: post.user.username,
                  profileImage: post.user.profile.image,
                  id: post.user.id,
                },
              }}
            />
            <PostContent
              post={{
                content: post.content,
                images: post.images,
                mentions: post.mentions,
              }}
            />
          </View>

          <View>
            <Button
              title="Share Post"
              mt={0}
              isLoading={isLoading}
              onPress={handleShare}
            />
            <TouchableOpacity
              onPress={handleSharePostRemove}
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: Colors.black_100,

                borderRadius: 100,
                marginTop: 10,
                width: 60,
                height: 60,
                marginHorizontal: "auto",
              }}
            >
              <EvilIcons name="close" size={24} color={Colors.while} />
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

export default PostSharePreview;
