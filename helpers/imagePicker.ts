import * as ImagePicker from "expo-image-picker";

export const pickImage = async (options = {}) => {
  try {
    const { granted } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (granted) {
      const resulst = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
        aspect: options.aspect ? options.aspect : [1, 1],
      });
      if (!resulst.canceled) {
        return { isPicked: true, uri: resulst.assets[0].uri };
      } else {
        return { isPicked: false };
      }
    } else {
      return { isPicked: false };
    }
  } catch (error) {
    throw error;
  }
};

export const uriSegments = (uri: string) => {
  const type = uri.split(".").pop();
  const name = uri.split("/").pop();
  return { type, name };
};
