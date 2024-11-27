import { View, Text, Pressable, Image, Dimensions } from "react-native";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import colors from "@/constants/Colors";

const MultipleImageShow = ({ images, deleteImage = null }) => {
  const { width } = Dimensions.get("window");

  return (
    <>
      {images.map((image, i) => (
        <View
          key={i}
          style={{
            width: width - 30,
            marginRight: i == 1 ? 0 : 10,
            position: "relative",
          }}
        >
          <Image
            source={{ uri: image }}
            style={{ width: "100%", height: 250, borderRadius: 15 }}
          />
          <Text
            style={{
              position: "absolute",
              top: 10,
              right: 10,
              color: colors.while,
              backgroundColor: "#0000005d",
              paddingHorizontal: 10,
              paddingVertical: 6,
              borderRadius: 10,
              fontSize: 12,
            }}
          >
            {i + 1}/2
          </Text>

          {deleteImage && (
            <Pressable
              onPress={() => deleteImage(i)}
              style={{
                position: "absolute",
                top: 105,
                left: (width - 30 - 40) / 2,
                width: 40,
                height: 40,
                borderRadius: 100,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#0000005d",
              }}
            >
              <Ionicons name="close-outline" size={24} color={colors.while} />
            </Pressable>
          )}
        </View>
      ))}
    </>
  );
};

export default MultipleImageShow;
