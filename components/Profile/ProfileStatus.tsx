import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import colors from '@/constants/Colors';

const ProfileStatus = ({ post, connects }) => {
  return (
    <View style={{ alignItems: "center", marginVertical: 30 }}>
      <View style={{ flexDirection: "row", gap: 30, justifyContent: "center" }}>
        <View>
          <Text
            style={{
              fontSize: 17,
              fontFamily: "Poppins-Bold",
              color: colors.while,
              textAlign: "center",
            }}
          >
            {post}
          </Text>
          <Text
            style={{
              fontSize: 10,
              textTransform: "uppercase",
              color: colors.gray,
              fontFamily: "Poppins-Medium",
            }}
          >
            Posts
          </Text>
        </View>
        <View>
          <Text
            style={{
              fontSize: 17,
              fontFamily: "Poppins-Bold",
              color: colors.while,
              textAlign: "center",
            }}
          >
            {connects}
          </Text>
          <Text
            style={{
              fontSize: 10,
              textTransform: "uppercase",
              color: colors.gray,
              fontFamily: "Poppins-Medium",
            }}
          >
            Connects
          </Text>
        </View>
      </View>
    </View>
  );
};

export default ProfileStatus

const styles = StyleSheet.create({})