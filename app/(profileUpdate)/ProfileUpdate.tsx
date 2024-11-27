import {
  View,
  Text,
  Image,
  ScrollView,
  Pressable,
  ActivityIndicator,
  TextInput,
} from "react-native";
import React, { useEffect, useState } from "react";
import colors from "@/constants/Colors";
import { useUserMineQuery } from "@/redux/api/userApiSlice";
import { useSelector, UseSelector } from "react-redux";
import Input from "@/components/Input";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Entypo from "@expo/vector-icons/Entypo";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Fontisto from "@expo/vector-icons/Fontisto";
import Button from "@/components/Button";
import Ionicons from "@expo/vector-icons/Ionicons";
import SelectMenu from "./../../components/SelectMenu";
import MenuProvider from "@/components/MenuProvider";
import * as ImagePicker from "expo-image-picker";

import {
  useUploadProfilePicMutation,
  useUploadCoverPicMutation,
  useUpdateProfileMutation,
} from "@/redux/api/profile";
import { pickImage, uriSegments } from "@/helpers/imagePicker";
import MultipleInput from "./../../components/MultipleInput";
import ProfileUpdataPreloader from "@/components/Preloaders/ProfileUpdataPreloader";
import { StatusBar } from "expo-status-bar";
import AuthCom from "@/components/AuthCom";
const ProfileUpdate = () => {
  const { token } = useSelector((state) => state.auth);
  const { data: userData, isLoading, refetch } = useUserMineQuery(token);
  const profile = userData?.user?.profile;
  const [error, setError] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [isDatePickerVisible, setDataPickerVisible] = useState(false);

  const [updateProfilePictureApi, { isLoading: profilePicLoading }] =
    useUploadProfilePicMutation();
  const [updateProfileCoverApi, { isLoading: coverPicLoading }] =
    useUploadCoverPicMutation();
  const [updateProfileApi, { isLoading: profileUpdateLoading }] =
    useUpdateProfileMutation();
  const [formData, setFormData] = useState({
    bio: "",
    dob: {},
    address: {},
    education: {},
    hobies: [],
    link: "",
    occupation: {},
  });

  useEffect(() => {
    if (profile) {
      setFormData({
        bio: profile.bio,
        dob: profile.dob,
        address: profile.address,
        education: profile.education,
        hobies: profile.hobies,
        link: profile.link,
        occupation: profile.occupation,
      });
      setProfileImage(profile.image);
      setCoverImage(profile.cover);
    }
  }, [userData]);

  const setDob = (selectedDate) => {
    setDataPickerVisible(false);

    const date = new Date(selectedDate);

    setFormData((prev) => ({
      ...prev,
      dob: {
        ...profile.dob,
        year: date.getFullYear(),
        month: date.getMonth(),
        day: date.getDate(),
      },
    }));
  };

  const handleSubmit = async () => {
    try {
      const response = await updateProfileApi({
        payload: formData,
        token,
      }).unwrap();
      console.log("response ", response);
    } catch (error: any) {
      console.log("ERROR = ", error?.message);
      if (error.data) {
        setError(error.data.error);
      }
    }
  };

  const handleUpdateProfilePicture = async () => {
    const { isPicked, uri } = await pickImage({ aspect: [1, 1] });
    if (!isPicked) {
      return 1;
    } else {
      setProfileImage(uri!);
      try {
        const formData = new FormData();
        const { name, type } = uriSegments(uri!);
        formData.append("profile", {
          name,
          type: `image/${type}`,
          uri: uri!,
        });

        const response = await updateProfilePictureApi({
          payload: formData,
          token,
        }).unwrap();
      } catch (error: any) {
        console.log("ERROR = ", error?.message);
        if (error.data) {
          setError(error.data.error);
        }
      }
    }
  };

  const handleUpdateProfileCover = async () => {
    const { isPicked, uri } = await pickImage({ aspect: [16, 7] });
    if (!isPicked) {
      return 1;
    } else {
      setCoverImage(uri!);
      try {
        const formData = new FormData();
        const { name, type } = uriSegments(uri!);
        formData.append("cover", {
          name,
          type: `image/${type}`,
          uri: uri!,
        });

        const response = await updateProfileCoverApi({
          payload: formData,
          token,
        }).unwrap();
      } catch (error: any) {
        console.log("ERROR = ", error?.message);
        if (error.data) {
          setError(error.data.error);
        }
      }
    }
  };

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        setError("");
      }, 3000);
    }
  }, [error]);

  return (
    <AuthCom>
      <ScrollView style={{ flex: 1, backgroundColor: colors.primary }}>
        <StatusBar backgroundColor={colors.primary} style="light" />
        {/* any error */}
        {error && (
          <Text
            style={{
              backgroundColor: "#ff000054",
              paddingVertical: 8,
              paddingHorizontal: 12,
              borderLeftWidth: 2,
              borderLeftColor: "#ff2c2cea",
              color: colors.while,
              fontSize: 12,
              marginTop: 20,
              marginHorizontal: 15,
            }}
          >
            {error}
          </Text>
        )}
        <View>
          {userData && !isLoading && (
            <View style={{ paddingHorizontal: 10 }}>
              {/* profile cover image update */}
              <View
                style={{
                  borderBottomColor: colors.black_200,
                  borderBottomWidth: 1,
                  paddingVertical: 20,
                }}
              >
                <View
                  style={{
                    width: "100%",
                    aspectRatio: 16 / 7,
                    backgroundColor: colors.black_200,
                    borderRadius: 10,
                    position: "relative",
                  }}
                >
                  <Image
                    source={coverImage && { uri: coverImage }}
                    style={{
                      width: "100%",
                      aspectRatio: 16 / 7,
                      borderRadius: 10,
                    }}
                  />
                  {coverPicLoading && (
                    <View
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        backgroundColor: "#00000083",
                        borderRadius: 10,
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <ActivityIndicator color={colors.while} size="small" />
                    </View>
                  )}
                  <Pressable
                    onPress={handleUpdateProfileCover}
                    style={{
                      position: "absolute",
                      bottom: 20,
                      right: 20,
                      backgroundColor: "#00000083",
                      width: 40,
                      justifyContent: "center",
                      alignItems: "center",
                      height: 40,
                      borderRadius: 100,
                    }}
                  >
                    <MaterialCommunityIcons
                      name="image-edit-outline"
                      size={20}
                      color="#fff"
                    />
                  </Pressable>
                </View>
              </View>

              {/* profile picture update */}
              <View
                style={{
                  borderBottomColor: colors.black_200,
                  borderBottomWidth: 1,
                  paddingVertical: 20,
                }}
              >
                <View
                  style={{
                    width: 150,
                    marginHorizontal: "auto",
                    aspectRatio: 1 / 1,
                    backgroundColor: colors.black_200,
                    borderRadius: 100,
                    position: "relative",
                  }}
                >
                  <Image
                    source={profileImage && { uri: profileImage }}
                    style={{
                      width: "100%",
                      aspectRatio: 1 / 1,
                      borderRadius: 100,
                    }}
                  />
                  {profilePicLoading && (
                    <View
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        backgroundColor: "#00000083",
                        borderRadius: 100,
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <ActivityIndicator color={colors.while} size="small" />
                    </View>
                  )}
                  <Pressable
                    onPress={handleUpdateProfilePicture}
                    style={{
                      position: "absolute",
                      bottom: 20,
                      right: 20,
                      backgroundColor: "#00000083",
                      width: 40,
                      justifyContent: "center",
                      alignItems: "center",
                      height: 40,
                      borderRadius: 100,
                    }}
                  >
                    <MaterialCommunityIcons
                      name="image-edit-outline"
                      size={20}
                      color="#fff"
                    />
                  </Pressable>
                </View>
              </View>

              {/* other infomation update */}
              {/* bio */}
              <View
                style={{
                  paddingVertical: 20,
                  borderBottomColor: colors.black_200,
                  borderBottomWidth: 1,
                }}
              >
                <Text
                  style={{
                    color: colors.while,
                    fontSize: 14,
                    fontFamily: "Poppins-Medium",
                  }}
                >
                  Bio
                </Text>
                <TextInput
                  multiline={true}
                  placeholder="Change Your bio?"
                  placeholderTextColor={colors.gray}
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
                  value={formData.bio ? formData.bio : ""}
                  onChangeText={(text) =>
                    setFormData((prev) => ({ ...prev, bio: text }))
                  }
                />
              </View>
              {/* link */}
              <View
                style={{
                  paddingVertical: 20,
                  borderBottomWidth: 1,
                  borderBottomColor: colors.black_200,
                }}
              >
                <Text
                  style={{
                    color: colors.while,
                    fontSize: 14,
                    fontFamily: "Poppins-Medium",
                  }}
                >
                  Socail Linking
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    borderWidth: 1,
                    borderColor: colors.black_200,
                    backgroundColor: colors.black_100,
                    borderRadius: 10,
                    alignItems: "center",
                    paddingHorizontal: 5,
                  }}
                >
                  <MaterialIcons
                    name="link"
                    size={20}
                    color={colors.gray}
                    style={{ marginLeft: 10 }}
                  />
                  <TextInput
                    placeholder="Add social ansy Link?"
                    placeholderTextColor={colors.gray}
                    style={{
                      backgroundColor: colors.black_100,
                      paddingHorizontal: 15,
                      paddingVertical: 14,
                      borderRadius: 10,
                      color: colors.while,
                      fontSize: 13,
                    }}
                    value={formData.link ? formData.link : ""}
                    onChangeText={(text) =>
                      setFormData((prev) => ({ ...prev, link: text }))
                    }
                  />
                </View>
              </View>

              {/* hobies */}
              <View
                style={{
                  paddingVertical: 20,
                  borderBottomWidth: 1,
                  borderBottomColor: colors.black_200,
                }}
              >
                <Text
                  style={{
                    color: colors.while,
                    fontSize: 14,
                    fontFamily: "Poppins-Medium",
                  }}
                >
                  Hobies
                </Text>
                <MultipleInput
                  limit={4}
                  onGet={(allInput: string[]) => {
                    setFormData((prev) => ({ ...prev, hobies: allInput }));
                  }}
                  inputs={formData.hobies}
                />
              </View>

              {/* occupation */}
              <View
                style={{
                  paddingVertical: 20,
                  borderBottomWidth: 1,
                  borderBottomColor: colors.black_200,
                }}
              >
                <Text
                  style={{
                    color: colors.while,
                    fontSize: 14,
                    fontFamily: "Poppins-Medium",
                  }}
                >
                  Occupation
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    borderWidth: 1,
                    borderColor: colors.black_200,
                    backgroundColor: colors.black_100,
                    borderRadius: 10,
                    marginBottom: 10,
                    alignItems: "center",
                    paddingHorizontal: 5,
                  }}
                >
                  <Entypo
                    name="heart"
                    size={20}
                    color={colors.gray}
                    style={{ marginLeft: 10 }}
                  />

                  <TextInput
                    placeholder="Emotion?"
                    placeholderTextColor={colors.gray}
                    style={{
                      backgroundColor: colors.black_100,
                      paddingHorizontal: 15,
                      paddingVertical: 14,
                      borderRadius: 10,
                      color: colors.while,
                      fontSize: 13,
                    }}
                    value={
                      formData.occupation ? formData.occupation.emotion : ""
                    }
                    onChangeText={(text) =>
                      setFormData((prev) => ({
                        ...prev,
                        occupation: { ...profile.occupation, emotion: text },
                      }))
                    }
                  />
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    borderWidth: 1,
                    borderColor: colors.black_200,
                    backgroundColor: colors.black_100,
                    borderRadius: 10,

                    alignItems: "center",
                    paddingHorizontal: 5,
                  }}
                >
                  <MaterialIcons
                    name="work"
                    size={20}
                    color={colors.gray}
                    style={{ marginLeft: 10 }}
                  />
                  <TextInput
                    placeholder="Occupation?"
                    placeholderTextColor={colors.gray}
                    style={{
                      backgroundColor: colors.black_100,
                      paddingHorizontal: 15,
                      paddingVertical: 14,
                      borderRadius: 10,
                      color: colors.while,
                      fontSize: 13,
                    }}
                    value={formData.occupation ? formData.occupation.name : ""}
                    onChangeText={(text) =>
                      setFormData((prev) => ({
                        ...prev,
                        occupation: { ...profile.occupation, name: text },
                      }))
                    }
                  />
                </View>
              </View>

              {/* education */}

              <View
                style={{
                  paddingVertical: 20,
                  borderBottomWidth: 1,
                  borderBottomColor: colors.black_200,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: 10,
                  }}
                >
                  <Text
                    style={{
                      color: colors.while,
                      fontSize: 14,
                      fontFamily: "Poppins-Medium",
                    }}
                  >
                    Education
                  </Text>
                  <SelectMenu
                    options={["public", "private"]}
                    defaultOption={
                      formData.education.public ? "public" : "private"
                    }
                    onSelect={(option: boolean) =>
                      setFormData((prev) => ({
                        ...prev,
                        education: { ...prev.education, public: option },
                      }))
                    }
                  />
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    borderWidth: 1,
                    borderColor: colors.black_200,
                    backgroundColor: colors.black_100,
                    borderRadius: 10,
                    marginBottom: 10,
                    alignItems: "center",
                    paddingHorizontal: 5,
                  }}
                >
                  <MaterialCommunityIcons
                    name="book-education-outline"
                    size={20}
                    color={colors.gray}
                    style={{ marginLeft: 10 }}
                  />
                  <TextInput
                    placeholder="Institute Name?"
                    placeholderTextColor={colors.gray}
                    style={{
                      backgroundColor: colors.black_100,
                      paddingHorizontal: 15,
                      paddingVertical: 14,
                      borderRadius: 10,
                      color: colors.while,
                      fontSize: 13,
                    }}
                    value={
                      formData.education ? formData.education.instituteName : ""
                    }
                    onChangeText={(text) =>
                      setFormData((prev) => ({
                        ...prev,
                        education: {
                          ...profile.education,
                          instituteName: text,
                        },
                      }))
                    }
                  />
                </View>

                <View
                  style={{
                    flexDirection: "row",
                    borderWidth: 1,
                    borderColor: colors.black_200,
                    backgroundColor: colors.black_100,
                    borderRadius: 10,
                    marginBottom: 10,
                    alignItems: "center",
                    paddingHorizontal: 5,
                  }}
                >
                  <MaterialIcons
                    name="link"
                    size={20}
                    color={colors.gray}
                    style={{ marginLeft: 10 }}
                  />
                  <TextInput
                    placeholder="Institute Link?"
                    placeholderTextColor={colors.gray}
                    style={{
                      backgroundColor: colors.black_100,
                      paddingHorizontal: 15,
                      paddingVertical: 14,
                      borderRadius: 10,
                      color: colors.while,
                      fontSize: 13,
                    }}
                    value={
                      formData.education
                        ? formData.education?.instituteLink
                        : ""
                    }
                    onChangeText={(text) =>
                      setFormData((prev) => ({
                        ...prev,
                        education: {
                          ...profile.education,
                          instituteLink: text,
                        },
                      }))
                    }
                  />
                </View>

                <View
                  style={{
                    flexDirection: "row",
                    borderWidth: 1,
                    borderColor: colors.black_200,
                    backgroundColor: colors.black_100,
                    borderRadius: 10,
                    alignItems: "center",
                    paddingHorizontal: 5,
                  }}
                >
                  <Ionicons
                    name="school"
                    size={20}
                    color={colors.gray}
                    style={{ marginLeft: 10 }}
                  />
                  <TextInput
                    placeholder="Degree?"
                    placeholderTextColor={colors.gray}
                    style={{
                      backgroundColor: colors.black_100,
                      paddingHorizontal: 15,
                      paddingVertical: 14,
                      borderRadius: 10,
                      color: colors.while,
                      fontSize: 13,
                    }}
                    value={formData.education ? formData.education.degree : ""}
                    onChangeText={(text) =>
                      setFormData((prev) => ({
                        ...prev,
                        education: { ...profile.education, degree: text },
                      }))
                    }
                  />
                </View>
              </View>

              {/* address*/}
              <View
                style={{
                  paddingVertical: 20,
                  borderBottomWidth: 1,
                  borderBottomColor: colors.black_200,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: 10,
                  }}
                >
                  <Text
                    style={{
                      color: colors.while,
                      fontSize: 14,
                      fontFamily: "Poppins-Medium",
                    }}
                  >
                    Where do i live
                  </Text>
                  <SelectMenu
                    options={["public", "private"]}
                    defaultOption={
                      formData.address.public ? "public" : "private"
                    }
                    onSelect={(option: boolean) =>
                      setFormData((prev) => ({
                        ...prev,
                        address: { ...prev.address, public: option },
                      }))
                    }
                  />
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    borderWidth: 1,
                    borderColor: colors.black_200,
                    backgroundColor: colors.black_100,
                    borderRadius: 10,
                    alignItems: "center",
                    paddingHorizontal: 5,
                    marginBottom: 10,
                    zIndex: -1,
                  }}
                >
                  <Entypo
                    name="location"
                    size={17}
                    color={colors.gray}
                    style={{ marginLeft: 10 }}
                  />
                  <TextInput
                    placeholder="Address on Map?"
                    placeholderTextColor={colors.gray}
                    multiline={true}
                    style={{
                      backgroundColor: colors.black_100,
                      paddingHorizontal: 15,
                      paddingVertical: 14,
                      borderRadius: 10,
                      color: colors.while,
                      fontSize: 13,
                    }}
                    value={formData.address ? formData.address.address : ""}
                    onChangeText={(text) =>
                      setFormData((prev) => ({
                        ...prev,
                        address: { ...profile.address, address: text },
                      }))
                    }
                  />
                </View>
              </View>

              {/* date of birth */}
              <View
                style={{
                  paddingVertical: 20,
                  borderBottomWidth: 1,
                  borderBottomColor: colors.black_200,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: 10,
                  }}
                >
                  <Text
                    style={{
                      color: colors.while,
                      fontSize: 14,
                      fontFamily: "Poppins-Medium",
                    }}
                  >
                    Date Of Birth
                  </Text>
                  <SelectMenu
                    options={["public", "private"]}
                    defaultOption={formData.dob.public ? "public" : "private"}
                    onSelect={(option: boolean) => {
                      setFormData((prev) => ({
                        ...prev,
                        dob: { ...prev.dob, public: option },
                      }));
                    }}
                  />
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    borderWidth: 1,
                    borderColor: colors.black_200,
                    backgroundColor: colors.black_100,
                    borderRadius: 10,
                    alignItems: "center",
                    paddingHorizontal: 5,
                    zIndex: -1,
                  }}
                >
                  <Pressable
                    style={{
                      width: 50,
                      height: "70%",
                      justifyContent: "center",
                      alignItems: "center",
                      flexDirection: "row",
                      borderRightColor: colors.gray_100,
                      borderRightWidth: 1,
                    }}
                    onPress={() => setDataPickerVisible(true)}
                  >
                    <Fontisto name="date" size={20} color={colors.gray} />
                  </Pressable>
                  <TextInput
                    placeholder="yyyy-mm-dd"
                    placeholderTextColor={colors.gray}
                    style={{
                      backgroundColor: colors.black_100,
                      paddingHorizontal: 15,
                      paddingVertical: 14,
                      borderRadius: 10,
                      color: colors.while,
                      fontSize: 13,
                    }}
                    readOnly={true}
                    value={
                      formData.dob
                        ? `${formData.dob.year}-${formData.dob.month}-${formData.dob.day}`
                        : ""
                    }
                    onChangeText={(text) => {
                      let year, month, day;
                      const dateSegments = text.split("-");
                      year = dateSegments.length == 1 ? dateSegments[0] : "";
                      month = dateSegments.length == 2 ? dateSegments[1] : "";
                      day = dateSegments.length == 3 ? dateSegments[2] : "";
                      setFormData((prev) => ({
                        ...prev,
                        dob: {
                          ...profile.dob,
                          year,
                          month,
                          day,
                        },
                      }));
                    }}
                  />
                </View>
                <DateTimePickerModal
                  isVisible={isDatePickerVisible}
                  mode="date"
                  onConfirm={setDob}
                  onCancel={() => setDataPickerVisible(false)}
                />
              </View>

              {/* update button */}
              <Button
                isLoading={profileUpdateLoading}
                mt={20}
                title="Save"
                onPress={handleSubmit}
              />
            </View>
          )}

          {!userData && isLoading && <ProfileUpdataPreloader />}
        </View>
      </ScrollView>
    </AuthCom>
  );
};

export default ProfileUpdate;
