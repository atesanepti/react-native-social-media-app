import { View, Text, Pressable, Image } from "react-native";
import React from "react";
import colors from "@/constants/Colors";
import { EvilIcons } from "@expo/vector-icons";
const UserMentionLabel = ({ users = [], styles = {}, onUserSend, onClose }) => {
  const closeHandler = () => {
    onClose();
  };
  const sendUserHandler = (user) => {
    onUserSend({ id: user.id, username: user.username });
  };
  return (
    <>
      {users.map((user, i) => (
        <View
          key={i}
          style={[
            {
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              padding: 5,
              marginBottom: 10,
              borderWidth: 1,
              borderColor: colors.black_200,
              borderRadius: 5,
              backgroundColor: colors.black_100,
            },
          ]}
        >
          <Pressable
            onPress={() => sendUserHandler(user)}
            style={{
              flexGrow: 5,
              flexShrink: 1,
              flexDirection: "row",
              alignItems: "center",
              gap: 10,
            }}
          >
            <View
              style={{
                width: 30,
                aspectRatio: 1 / 1,
                backgroundColor: colors.black_100,
                borderRadius: 100,
              }}
            >
              <Image
                source={{ uri: user.image! }}
                style={{ width: "100%", aspectRatio: 1 / 1, borderRadius: 100 }}
              />
            </View>
            <Text
              style={{
                fontSize: 11,
                color: colors.while,
                fontFamily: "Poppins-Medium",
              }}
            >
              {user.username}
            </Text>
          </Pressable>
          <Pressable
            onPress={closeHandler}
            style={{ flexGrow: 1, flexShrink: 1, alignItems: "center" }}
          >
            <EvilIcons name="close" size={24} color={colors.gray_100} />
          </Pressable>
        </View>
      ))}
    </>
  );
};

export default UserMentionLabel;
