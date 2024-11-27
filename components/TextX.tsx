import {
  View,
  Text,
  Pressable,
  Dimensions,
  Linking,
  Alert,
} from "react-native";
import React, { useState } from "react";
import colors from "@/constants/Colors";
import { REGEXP } from "@/constants/regexp";
import { useRouter } from "expo-router";
const TextLink = ({ content, onClick }) => {
  const { text, specialText } = content;
  return (
    <>
      {text.map((t, i) => {
        const top = specialText.shift();
        return (
          <Text key={i}>
            <Text>{t}</Text>
            <Text
              key={i}
              onPress={() => onClick(top)}
              style={{ fontFamily: "Poppins-Medium", color: "#0D92F4" }}
            >
              {top}
            </Text>
          </Text>
        );
      })}
    </>
  );
};

const TextX = ({ content, line = 2, mb = 10, mentions = [] }) => {
  const [contentCollapse, setContentCollapse] = useState(true);
  const deviceWidth = Dimensions.get("window").width;
  const navigator = useRouter();

  const specialTextChecker = (text: string) => {
    const regexp = REGEXP.MENTION_URL;

    const matches = [...text.matchAll(regexp)];
    if (!matches || matches.length <= 0) {
      return false;
    }

    const matchedText = matches.map((match) => {
      return match[0];
    });

    const textReplaceRegexp = new RegExp(matchedText.join("|"), "g");
    const textExpectUrl = text.split(textReplaceRegexp);
    return { text: textExpectUrl, specialText: matchedText };
  };

  const contentMaker = (content: string) => {
    let text = content;

    const charaCount = ((deviceWidth - 30) / 8.5) * line;

    if (contentCollapse && content.length > charaCount) {
      text = content.slice(0, charaCount) + "...";
    }

    const matches = specialTextChecker(text);

    if (matches) {
      const { text, specialText } = matches;

      return {
        content: { text, specialText },
        specialText: true,
      };
    }

    return { content: text, specialText: false };
  };

  const textInfo = contentMaker(content);

  const handleTextClick = async (text = "") => {
    if (!text) {
      setContentCollapse(!contentCollapse);
    } else {
      if (REGEXP.URL.test(text)) {
        try {
          await Linking.openURL(text);
        } catch (error) {
          Alert.alert(`Don't know how to open this URL: ${text}`);
        }
      } else if (REGEXP.MENTION.test(text)) {
        const username = text.replace("@", "");
        const user = mentions.find((u) => u.username == username);
        navigator.push(`/profile/${user.id}`);
      }
    }
  };

  return (
    <Text
      onPress={(e) => handleTextClick()}
      style={{
        fontSize: 12,
        color: colors.while,
        fontFamily: "Poppins-Regular",
        paddingHorizontal: 10,
        textAlign: "left",
        marginBottom: 0,
      }}
    >
      {!textInfo.specialText ? (
        textInfo.content
      ) : (
        <TextLink content={textInfo.content} onClick={handleTextClick} />
      )}
    </Text>
  );
};

export default TextX;
