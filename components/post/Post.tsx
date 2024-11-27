import {
  View,
  Text,
  Image,
  Pressable,
  TouchableHighlight,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import React, { useEffect, useState } from "react";
import colors from "@/constants/Colors";
import icons from "@/constants/icons";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import Entypo from "@expo/vector-icons/Entypo";
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useDispatch, useSelector } from "react-redux";
import { setSharePost } from "@/redux/features/postShareSlice";
import { router } from "expo-router";
import moment from "moment";
import Menu, { MenuList } from "../MenuList";
import Comments from "./Comments";
import { useMenuContext } from "@/context/menuContext";
import { useMakeLikeMutation } from "@/redux/api/likeApiSlice";
import PostHeader from "./PostHeader";
import PostContent from "./PostContent";
import { useRouter } from "expo-router";
const Post = ({ post }) => {
  const auth = useSelector((state) => state.auth);
  const [isAdmired, setAdmired] = useState(false);
  const [admireCount, setAdmireCount] = useState(0);
  const { createdAt, content, images, user, shareId, sharedPost } = post;
  const [isCommentVisible, setCommentVisible] = useState(false);
  const dispatch = useDispatch();

  const router = useRouter();

  const [makeLikeApi] = useMakeLikeMutation();

  const handleAdmired = async () => {
    try {
      const payload = { like: !isAdmired };
      const response = makeLikeApi({
        payload,
        token: auth.token,
        postId: post.id,
      });
      setAdmired(!isAdmired);
      setAdmireCount((prev) => {
        let count;
        if (isAdmired) {
          count = prev - 1;
        } else {
          count = prev + 1;
        }
        return count;
      });
      console.log("RESPONSE = ", response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setAdmired(post?.hasLikedByMe);
    setAdmireCount(post?.likes?.likeCount);
  }, []);

  const handleSharePost = () => {
    dispatch(setSharePost(post));
    router.push("/Create");
  };

  return (
    <View
      style={{
        paddingVertical: 20,
        borderBottomColor: "#0C0C0C",
        borderBottomWidth: 3,

        position: "relative",
      }}
    >
      {/* post header */}
      <PostHeader
        post={{
          user: {
            username: user.username,
            id: user.id,
            profileImage: user.profile.image,
          },
          createdAt,
        }}
      />

      {/* post content */}
      <PostContent
        adjustment="full"
        post={{ content: content, images, mentions: post.mentions }}
      />

      {shareId && sharedPost && (
        <View
          style={{
            marginHorizontal: 10,
            paddingHorizontal: 5,
            marginBottom: 10,
            borderWidth: 1,
            borderColor: colors.black_200,
            borderRadius: 10,
          }}
        >
          <PostHeader
            post={{
              user: {
                id: sharedPost.user.id,
                profileImage: sharedPost.user.profile.image,
                username: sharedPost.user.username,
              },
              createdAt: sharedPost.createdAt,
            }}
          />
          <PostContent
            post={{
              content: sharedPost.content,
              images: sharedPost.images,
              mentions: sharedPost.mentions,
            }}
            adjustment="padded"
          />
        </View>
      )}

      {/* like and comment count */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingHorizontal: 10,
        }}
      >
        <Text style={{ fontSize: 10, color: colors.gray, marginBottom: 10 }}>
          {admireCount} people admired{" "}
        </Text>
        <Text style={{ fontSize: 10, color: colors.gray, marginBottom: 10 }}>
          {post.commentCount} comments{" "}
        </Text>
      </View>

      {/* footer box */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 10,
          paddingHorizontal: 10,
        }}
      >
        <Pressable
          onPress={handleAdmired}
          style={{
            flexGrow: 1,
            flexBasis: 1,
            height: 40,
            paddingVertical: 7,
            paddingHorizontal: 12,
            backgroundColor: isAdmired ? "#5a5aff1e" : colors.black_100,
            borderWidth: 1,
            borderColor: isAdmired ? "#5a5aff1e" : colors.black_200,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            gap: 7,
            borderRadius: 10,
          }}
        >
          {isAdmired ? (
            <AntDesign name="like1" size={17} color={colors.gray} />
          ) : (
            <SimpleLineIcons name="like" size={17} color={colors.gray} />
          )}
          {admireCount !== 0 && (
            <Text
              style={{
                fontSize: 11,
                color: colors.gray,
                fontFamily: "Poppins-Medium",
              }}
            >
              {admireCount}
            </Text>
          )}
        </Pressable>
        {isCommentVisible && (
          <Comments
            postId={post.id}
            isVisible={isCommentVisible}
            user={user}
            content={content}
            onClose={() => setCommentVisible(false)}
          />
        )}
        <TouchableOpacity
          onPress={() => setCommentVisible(true)}
          style={{
            height: 40,
            flexGrow: 1,
            flexBasis: 1,
            flexShrink: 1,
            paddingVertical: 7,
            paddingHorizontal: 12,
            backgroundColor: colors.black_100,
            borderWidth: 1,
            borderColor: colors.black_200,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            gap: 6,
            borderRadius: 10,
          }}
        >
          <EvilIcons name="comment" size={22} color={colors.gray} />
          {post.commentCount !== 0 && (
            <Text
              style={{
                fontSize: 11,
                color: colors.gray,
                fontFamily: "Poppins-Medium",
              }}
            >
              {post.commentCount}
            </Text>
          )}
        </TouchableOpacity>

        <Pressable
          disabled={sharedPost && shareId ? true : false}
          onPress={handleSharePost}
          style={{
            height: 40,
            flexGrow: 1,
            flexBasis: 1,
            flexShrink: 1,
            paddingVertical: 7,
            paddingHorizontal: 12,
            backgroundColor: colors.black_100,
            borderWidth: 1,
            borderColor: colors.black_200,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            gap: 6,
            borderRadius: 10,
          }}
        >
          <Entypo name="share" size={18} color={colors.gray} />
        </Pressable>
      </View>
    </View>
  );
};

export default Post;
