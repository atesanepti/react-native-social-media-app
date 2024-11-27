import { View, Text, Modal, TouchableHighlight, Image } from "react-native";
import React from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import colors from "@/constants/Colors";
const ImageGallery = ({
  isVisiable,
  onClose,
  image,
  height = 0,
  aspectRatio = "",
}) => {
  return (
    <Modal visible={isVisiable}>
      <View style={{ flex: 1, backgroundColor: colors.primary }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "flex-end",
            alignItems: "center",
            marginTop: 30,
            marginRight: 30,
          }}
        >
          <TouchableHighlight onPress={onClose}>
            <AntDesign name="close" size={24} color={colors.while} />
          </TouchableHighlight>
        </View>
        <View style={{ marginTop: 150 }}>
          <Image
            source={{ uri: image }}
            style={[
              { width: "100%" },
              aspectRatio ? { aspectRatio: aspectRatio } : { height: height },
            ]}
          />
        </View>
      </View>
    </Modal>
  );
};

export default ImageGallery;
