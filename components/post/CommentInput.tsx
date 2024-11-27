import { View, Text, TextInput, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import colors from "@/constants/Colors";

import Ionicons from "@expo/vector-icons/Ionicons";
import MentionLabel from "../MentionLabel";
const CommentInput = ({ onCommentSent, isReplySelected, setReplySelected }) => {
  const [comment, setComment] = useState("");

  const handleCreateComment = () => {
    if (!comment) return;
    onCommentSent(comment);
    setComment("");
  };

  const handleRemoveReply = () => {
    console.log("bro called");
    setReplySelected();
  };

  return (
    <View
      style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderTopWidth: 1,

        zIndex: 1,
        borderTopColor: colors.black_200,
        backgroundColor: colors.primary,
        justifyContent: "space-between",
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      <View style={{ flex: 1 }}>
        {isReplySelected.id && (
          <MentionLabel
            user={{ username: isReplySelected.commentCreator }}
            onClose={handleRemoveReply}
          />
        )}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            flex: 1,
          }}
        >
          <TextInput
            style={{
              backgroundColor: colors.black_100,
              borderColor: colors.black_200,
              borderWidth: 1,
              borderRadius: 5,
              color: colors.while,
              fontSize: 13,
              paddingHorizontal: 10,
              paddingVertical: 12,
              flexGrow: 1,
              flexShrink: 1,
              maxHeight: 110,
            }}
            placeholder="Write somthing"
            placeholderTextColor={colors.gray_100}
            value={comment}
            onChangeText={(text) => setComment(text)}
            multiline={true}
          />
          <Pressable
            onPress={handleCreateComment}
            style={{ paddingHorizontal: 15 }}
          >
            <Ionicons
              name="send-sharp"
              size={22}
              color={comment ? colors.while : "#ddd"}
            />
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default CommentInput;
