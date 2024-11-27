import { View, Text, Image, Pressable, TouchableOpacity } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import colors from "@/constants/Colors";

const CommentX = ({ image, text, username, scale = 1, allHeight, onPress }) => {
  return (
    <View
      onLayout={(e) => {
        if (allHeight) {
          allHeight(e.nativeEvent.layout.height);
        }
      }}
      style={{
        flexDirection: "row",
        gap: 10,
        transform: [{ scale: scale }],
      }}
    >
      {/* user profile image */}
      <View
        style={{
          width: 35,
          aspectRatio: 1 / 1,
          backgroundColor: colors.black_200,
          borderRadius: 100,
        }}
      >
        <Image
          source={{ uri: image }}
          style={{ width: 35, aspectRatio: 1 / 1, borderRadius: 100 }}
        />
      </View>

      {/* comment content -> text, username, replies */}
      <View style={{ alignItems: "flex-start" }}>
        {/* content */}
        <Pressable
          onPress={() => {
            if (onPress) onPress();
          }}
          style={{
            backgroundColor: colors.black_200,
            padding: 10,
            borderRadius: 10,
            paddingRight: 30,
            maxWidth: 300,
          }}
        >
          {/* content - username */}
          <Text
            style={{
              color: "#ddd",
              fontFamily: "Poppins-Medium",
              fontSize: 10,
            }}
          >
            {username}
          </Text>
          {/* content - text*/}
          <Text
            style={{
              color: colors.while,
              fontSize: 11,
              marginTop: -3,
              lineHeight: 15,
            }}
          >
            {text}
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

const Comment = ({ comment, onReplySelection }) => {
  const [replyCommentsShow, setReplyCommentsShow] = useState(false);
  const [fullCommentHeight, setFullCommentHeight] = useState(0);
  const [replyBoxHeight, setReplyBoxHeight] = useState(0);
  const [allReplyCommentsHeight, setAllReplyCommentsHeight] = useState<
    { index: number; height: number }[]
  >([]);

  const handleReplyClick = () => {
    onReplySelection({ id: comment.id, commentCreator: comment.user.username });
  };

  const getLastCommentHeight = (): number => {
    const last = allReplyCommentsHeight.find((r) => {
      return r.index == allReplyCommentsHeight.length;
    });
    return last?.height! - 22;
  };

  return (
    <View
      onLayout={(e) => {
        if (fullCommentHeight == 0)
          setFullCommentHeight(e.nativeEvent.layout.height);
      }}
    >
      <CommentX
        image={comment.user.profile.image}
        text={comment.text}
        username={comment.user.username}
        onPress={() => handleReplyClick()}
      />

      {/* replies */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "flex-start",
          gap: 20,
          marginTop: 4,
        }}
      >
        {/* reply button */}
        <TouchableOpacity onPress={handleReplyClick} style={{ marginLeft: 50 }}>
          <Text
            style={{
              color: "#ddd",
              fontSize: 10,
              fontFamily: "Poppins-Medium",
            }}
          >
            {" "}
            Reply
          </Text>
        </TouchableOpacity>

        {/* other replies */}
        {comment.replies.length > 0 && (
          <>
            <Text
              style={{
                color: colors.while,
                fontFamily: "Poppins-Medium",
                fontSize: 10,
              }}
              onPress={() => {
                setReplyCommentsShow(!replyCommentsShow);
                // setAllReplyCommentsHeight([]);
              }}
            >
              Show {replyCommentsShow ? "hide" : "all"} replies (
              {comment.replies.length})
            </Text>
          </>
        )}
      </View>

      {replyCommentsShow && (
        <View
          onLayout={(e) => {
            setReplyBoxHeight(e.nativeEvent.layout.height);
          }}
          style={{
            marginTop: 10,
            marginLeft: 16,
            gap: 5,
          }}
        >
          {comment.replies.map((comment, i) => (
            <View
              key={i}
              style={{
                flexDirection: "row",
                alignItems: "flex-start",
              }}
            >
              <View>
                <View
                  style={{
                    width: 41,
                    height: 0.7,
                    backgroundColor: colors.while,
                    marginTop: 21,
                  }}
                ></View>
              </View>
              <CommentX
                username={comment.user.username}
                text={comment.text}
                image={comment.user.profile.image}
                scale={1}
                allHeight={(height: number) =>
                  setAllReplyCommentsHeight((prev) => [
                    ...prev,
                    { index: prev.length + 1, height },
                  ])
                }
              />
            </View>
          ))}
        </View>
      )}

      {replyCommentsShow && allReplyCommentsHeight.length > 0 && (
        <View
          style={{
            position: "absolute",
            width: 0.7,
            height:
              fullCommentHeight -
              25 +
              (replyBoxHeight - getLastCommentHeight()),
            backgroundColor: "#ddd",
            left: 15,
            top: 35,
          }}
        ></View>
      )}
    </View>
  );
};

export default Comment;
