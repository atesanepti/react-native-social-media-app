import {
  View,
  Text,
  TextInput,
  Pressable,
  Image,
  Switch,
  ScrollView,
  Dimensions,
} from "react-native";
import React, { useEffect, useState } from "react";
import Button from "./Button";
import icons from "@/constants/icons";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Ionicons from "@expo/vector-icons/Ionicons";
import colors from "@/constants/Colors";
import * as ImagePicker from "expo-image-picker";
import { useCreatePostMutation } from "@/redux/api/postApiSlice";
import Toast, { CloseToast } from "./Toast";
import { useSelector } from "react-redux";
import { router } from "expo-router";
import InputX from "./InputX";
import PostSharePreview from "./post/PostSharePreview";

const TimeUpload = ({ post }) => {
  const [context, setContext] = useState("");
  const [mentions, setMentions] = useState<Array<string>>([]);
  const [images, setImages] = useState([]);
  const [error, setError] = useState("");
  const { width, height } = Dimensions.get("window");
  const { token } = useSelector((state) => state.auth);
  const [postCreateApi, { isLoading: postCreating }] = useCreatePostMutation();

  const postCreateHandler = async () => {
    if (!context && !images.length) {
      return setError("Select Any Context or Memory");
    }

    const formData = new FormData();
    if (context) {
      formData.append("content", context);
    }

    if (images.length) {
      for (let i = 0; i < images.length; i++) {
        const fileType = images[i].split(".").pop();
        const fileName = images[i].split("/").pop();
        formData.append(`time_${i + 1}`, {
          uri: images[i],
          type: `image/${fileType}`,
          name: fileName,
        });
      }
    }
    console.log("mentions", mentions);
    if (mentions.length > 0) {
      formData.append("mentions", JSON.stringify(mentions));
    }

    try {
      const response = await postCreateApi({
        payload: formData,
        token,
      }).unwrap();
      router.push("/Profile");
    } catch (error: any) {
      console.log("Error = ", error);
      if (error.data) {
        setError(error.data.error);
      } else {
        setError(error.message);
      }
    }
  };

  const deleteImage = (index: number) => {
    const newImages = images.filter((_, i) => i != index);
    setImages(newImages);
  };

  const imagesPicker = async () => {
    const resulst = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });
    if (!resulst.canceled) {
      setImages((prev) => [...prev, resulst.assets[0].uri]);
    }
  };

  return (
    <View>
      {error && (
        <Toast
          message={error}
          top={-40}
          variant="error"
          closeBtn={<CloseToast onClose={() => setError("")} />}
        />
      )}
      <View style={{ marginTop: 40 }}>
        <View style={{ marginBottom: 25 }}>
          <InputX
            onGetContext={(text: string) => setContext(text)}
            onGetMentions={(mentions) => setMentions(mentions)}
          />
        </View>

        {Object.keys(post).length > 0 ? (
          <PostSharePreview post={post} context={context} />
        ) : (
          <>
            <View style={{ marginBottom: 25 }}>
              <Text
                style={{
                  color: colors.gray,
                  fontSize: 14,
                  fontFamily: "Poppins-Medium",
                  marginLeft: 10,
                  marginBottom: 5,
                }}
              >
                Upload Memory
              </Text>

              <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
              >
                <View style={{ flexDirection: "row" }}>
                  {images.length >= 1 &&
                    images.map((image, i) => (
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
                          style={{
                            width: "100%",
                            height: 250,
                            borderRadius: 15,
                          }}
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
                          {i + 1}/{images.length}
                        </Text>

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
                          <Ionicons
                            name="close-outline"
                            size={24}
                            color={colors.while}
                          />
                        </Pressable>
                      </View>
                    ))}

                  {images.length < 2 && (
                    <Pressable
                      onPress={imagesPicker}
                      style={{
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor: colors.black_100,
                        padding: 10,
                        borderRadius: 10,
                        borderColor: colors.black_200,
                        borderWidth: 2,
                        width: width - 30,
                        height: 250,
                      }}
                    >
                      <View
                        style={{
                          width: 80,
                          height: 60,
                          borderRadius: 10,
                          borderWidth: 1,
                          borderStyle: "dashed",
                          borderColor: colors.activeYellow,
                          flexDirection: "row",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <Image
                          source={icons.upload}
                          resizeMode="contain"
                          style={{ width: 30, height: 30 }}
                        />
                      </View>
                    </Pressable>
                  )}
                </View>
              </ScrollView>
            </View>
            <Button
              isLoading={postCreating}
              onPress={postCreateHandler}
              title="Upload"
              mt={20}
            />
          </>
        )}
      </View>
    </View>
  );
};

export default TimeUpload;
