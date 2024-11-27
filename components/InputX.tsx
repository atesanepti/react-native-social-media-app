import { View, Text, TextInput } from "react-native";
import React, { useEffect, useState } from "react";
import colors from "@/constants/Colors";
import { useColorScheme } from "./../hooks/useColorScheme.web";
import TextX from "./TextX";
import { useMentionFetchQuery } from "@/redux/api/postApiSlice";
import { useSelector } from "react-redux";
import MentionLabel from "./MentionLabel";
import UserMentionLabel from "./UserMentionLabel";
import { REGEXP } from "@/constants/regexp";

const InputX = ({ onGetContext, onGetMentions }) => {
  const { token } = useSelector((state) => state.auth);
  const [text, setText] = useState("");
  const [mentionSearch, setMenstionSearch] = useState("");
  const [mentioned, setMentioned] = useState([]);

  const {
    data: mentionData,
    isLoading,
    error,
  } = useMentionFetchQuery({
    token,
    search: mentionSearch,
  });

  useEffect(() => {
    if (text) {
      onGetContext(text);
      const mentionsRegexp = REGEXP.MENTION;
      let matches = [...text.matchAll(mentionsRegexp)];

      let lastMention: any = matches.pop();
      lastMention = lastMention?.join("").replace("@", "");

      const isAlreadyMentioned = mentioned?.some((u) => {
        return u.username?.toLowerCase() == lastMention?.toLowerCase();
      });

      if (!isAlreadyMentioned) {
        setMenstionSearch(lastMention);
      }
    }
  }, [text]);

  const handleGetUser = (user) => {
    const firstName = user.username.replace("@", "").split(" ").shift();

    // make new text with full username
    const newText = text.replace(REGEXP.LAST_MENTION, `@${user.username}`);
    setText(newText);
    setMentioned((prev) => {
      const isAlreadyMentioned = prev.some((u) => u.id == user.id);
      if (!isAlreadyMentioned) {
        return [...prev, { username: firstName, id: user.id }];
      } else {
        return prev;
      }
    });
    setMenstionSearch("");
  };

  useEffect(() => {
    if (mentioned.length > 0) {
      onGetMentions(mentioned);
    }
  }, [mentioned]);

  return (
    <View>
      {mentionData && !isLoading && mentionData.payload.length !== 0 && (
        <UserMentionLabel
          users={[
            {
              id: mentionData.payload[0].id,
              username: mentionData.payload[0].username,
              image: mentionData.payload[0].profile.image,
            },
          ]}
          onClose={() => setMenstionSearch("")}
          onUserSend={handleGetUser}
        />
      )}
      <View
        style={{
          backgroundColor: colors.black_200,
          marginBottom: 10,
          borderLeftColor: colors.gray,
          borderLeftWidth: 3,
          flexDirection: "row",
          alignItems: "center",
          padding: 10,
        }}
      >
        {text && <TextX content={text} line={100} mb={0} />}
        {!text && (
          <Text style={{ color: colors.gray_100, fontSize: 11 }}>
            what's on your mind?
          </Text>
        )}
      </View>

      <TextInput
        multiline={true}
        style={{
          paddingHorizontal: 12,
          paddingVertical: 8,
          backgroundColor: colors.black_100,
          borderRadius: 5,
          color: colors.while,
          fontSize: 11,
          borderBottomRightRadius: 5,
          height : 100,
          textAlignVertical : "top"
        }}
        placeholder="write"
        placeholderTextColor={colors.gray_100}
        value={text}
        onChangeText={(text) => setText(text)}
      />
    </View>
  );
};

export default InputX;
