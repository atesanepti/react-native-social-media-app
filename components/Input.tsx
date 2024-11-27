import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  Pressable,
} from "react-native";
import React, { useState } from "react";
import colors from "@/constants/Colors";
import images from "@/constants/images";
import icons from "@/constants/icons";

const Input = ({
  name = "",
  type = "text",
  placeholder = "",
  value = "",
  onChange,
  mb,
}) => {
  const [isVisible, setVisible] = useState(false);

  return (
    <View style={{ marginBottom: mb }}>
      {name && (
        <Text
          style={{
            color: colors.while,
            fontSize: 15,
            fontFamily: "Poppins-Medium",
          }}
        >
          {name}
        </Text>
      )}
      <View style={{ position: "relative",  }}>
        <TextInput
          focusable={true}
          placeholderTextColor={colors.gray_100}
          value={value}
          secureTextEntry={type != "password" ? false : !isVisible}
          onChangeText={(text) => onChange(text)}
          placeholder={placeholder}
          style={{
            borderWidth: 1,
            borderColor: colors.black_200,
            backgroundColor: colors.black_100,
            paddingHorizontal: 15,
            paddingVertical: 14,
            borderRadius: 10,
            color: colors.while,
            fontSize: 13,
          }}
        />
        {type == "password" &&
          (isVisible ? (
            <Pressable
              onPress={() => setVisible(!isVisible)}
              style={{ position: "absolute", top: "30%", right: 0 }}
            >
              <Image
                source={icons.eyeHide}
                resizeMode="contain"
                style={{
                  width: 55,
                  height: 25,
                }}
                tintColor={colors.gray}
              />
            </Pressable>
          ) : (
            <Pressable
              onPress={() => setVisible(!isVisible)}
              style={{ position: "absolute", top: "28%", right: 0 }}
            >
              <Image
                source={icons.eye}
                resizeMode="contain"
                style={{
                  width: 55,
                  height: 25,

                  //   transform: [{ translateX: "-50%" }, { translateY: "-50%" }],
                }}
                tintColor={colors.gray}
              />
            </Pressable>
          ))}
      </View>
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({});
