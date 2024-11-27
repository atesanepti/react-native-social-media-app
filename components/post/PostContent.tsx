import { View, Text } from "react-native";
import React from "react";
import PostText from "../TextX";
import ImageX from "../ImageX";

const PostContent = ({ post, adjustment }) => {
  const { content, images, mentions } = post;

  return (
    <View style={{ marginTop: 10, marginBottom: 5 }}>
      {content && (
        <PostText
          mentions={mentions?.users ? mentions.users : []}
          content={content || ""}
          line={images?.length <= 0 ? 5 : 2}
        />
      )}

      <View>
        <ImageX source={images} adjustment={adjustment} />
      </View>
    </View>
  );
};

export default PostContent;
