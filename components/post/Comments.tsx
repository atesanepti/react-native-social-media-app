import {
  View,
  Text,
  ScrollView,
  Modal,
  Image,
  Pressable,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React, { useEffect, useState } from "react";
import colors from "@/constants/Colors";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import CommentPreloader from "../Preloaders/CommentPreloader";
import {
  useCreateCommentMutation,
  useFetchCommentsQuery,
  useCreateReplyCommentMutation,
} from "@/redux/api/commentApiSlice";
import { useSelector } from "react-redux";
import Input from "../Input";
import Button from "../Button";
import CommentInput from "./CommentInput";
import Comment from "./Comment";

const Comments = ({ postId, isVisible, user, content, onClose }) => {
  const { token } = useSelector((state) => state.auth);
  const [isReplySelected, setReplySelected] = useState({
    id: "",
    commentCreator: "",
  });
  // fetch all comment
  const [isLoading, setIsLoading] = useState(true);

  const [commentCreateApi, { isLoading: createLoading }] =
    useCreateCommentMutation();
  const [replyCommentCreateApi, { isLoading: replyCreateLoading }] =
    useCreateReplyCommentMutation();
  const { data: comments, isLoading: fetchLoading } = useFetchCommentsQuery({
    postId,
    token,
  });

  const commentsPayload = comments?.payload;
  console.log("cl",commentsPayload?.length)
  useEffect(() => {
    console.log("comments", comments);
  }, [comments]);

  const handleCommentCreate = async (comment: string) => {
    try {
      if (!isReplySelected.id) {
        const res = await commentCreateApi({
          token,
          payload: { text: comment, postId },
        });
      } else {
        const res = await replyCommentCreateApi({
          token,
          payload: { text: comment, postId },
          commentId : isReplySelected.id,
        });
        console.log("RESPONSE ",res);
      }
    } catch (error) {
      console.log("ERROR", error);
    }
  };

  return (
    <Modal visible={isVisible} transparent={true}>
      <View style={{ flex: 1, backgroundColor: colors.primary }}>
        {/* comment box header */}
        <View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            paddingHorizontal: 10,
            paddingVertical: 10,
            borderBottomWidth: 1,
            height: 60,
            zIndex: 1,
            borderBottomColor: colors.black_200,
            backgroundColor: colors.primary,
            justifyContent: "space-between",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <View style={{ flexDirection: "row", gap: 10 }}>
            <View
              style={{
                backgroundColor: colors.black_200,
                width: 40,
                aspectRatio: 1 / 1,
              }}
            >
              <Image
                source={{ uri: user.profile.image }}
                style={{ width: "100%", aspectRatio: 1 / 1, borderRadius: 3 }}
              />
            </View>
            <View>
              <Text
                style={{
                  color: colors.while,
                  fontSize: 12,
                  fontFamily: "Poppins-SemiBold",
                }}
              >
                {user.username}
              </Text>
              <Text
                style={{
                  color: colors.gray,
                  fontSize: 10,
                  marginTop: -8,
                }}
              >
                {content.length >= 30 ? content.slice(0, 30) + "..." : content}
              </Text>
            </View>
          </View>

          <TouchableOpacity onPress={onClose}>
            <EvilIcons name="close" size={24} color={colors.while} />
          </TouchableOpacity>
        </View>

        <ScrollView
          style={{
            marginVertical: 80,
            paddingHorizontal: 10,
            flex: 1,
          }}
        >
          {!commentsPayload && fetchLoading && <CommentPreloader count={6} />}
          {commentsPayload && !fetchLoading && (
            <View style={{ gap: 8 }}>
              {commentsPayload.map((comment, i) => (
                <Comment
                  key={i}
                  comment={comment}
                  onReplySelection={(replyObj: {
                    id: string;
                    commentCreator: string;
                  }) =>
                    setReplySelected({
                      id: replyObj.id,
                      commentCreator: replyObj.commentCreator,
                    })
                  }
                />
              ))}
            </View>
          )}
          {!fetchLoading && commentsPayload.length <= 0 && (
            <Text
              style={{
                textAlign: "center",
                color: colors.gray_100,
                fontSize: 12,
              }}
            >
              0 comments
            </Text>
          )}
        </ScrollView>

        {/* comment creating message */}
        {(createLoading || replyCreateLoading) && (
          <Text
            style={{
              color: colors.while,
              backgroundColor: "#00000063",
              fontSize: 12,
              position: "absolute",
              left: "40%",
              bottom: 160,
              paddingHorizontal: 10,
              paddingVertical: 5,
              borderRadius: 5,
            }}
          >
            creating...
          </Text>
        )}

        {/* comment  input */}
        <CommentInput
          isReplySelected={isReplySelected}
          setReplySelected={() =>
            setReplySelected({ id: "", commentCreator: "" })
          }
          onCommentSent={handleCommentCreate}
        />
      </View>
    </Modal>
  );
};

export default Comments;
