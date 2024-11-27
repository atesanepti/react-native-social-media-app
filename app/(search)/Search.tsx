import {
  View,
  Text,
  TextInput,
  Pressable,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import colors from "@/constants/Colors";
import { useSearchUserQuery } from "@/redux/api/userApiSlice";
import { useSelector } from "react-redux";
import { AntDesign } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import SearchPreloader from "@/components/Preloaders/SearchPreloader";

const Search = () => {
  const [search, setSearch] = useState("");
  const { token, user } = useSelector((state) => state.auth);

  const router = useRouter();

  const {
    data: usersPayload,
    isLoading,
    error,
    refetch,
  } = useSearchUserQuery({ token, search });
  const users = usersPayload?.payload?.users;

  useEffect(() => {
    if (search) {
      refetch();
    }
  }, [search]);

  const handleNavigate = (id) => {
    if (id == user.id) {
      router.push(`/Profile`);
    } else {
      router.push(`profile/${id}`);
    }
  };

  useEffect(() => {
    if (error) {
      console.log("ERROR : ", error);
    }
  }, [error]);

  return (
    <View style={{ flex: 1, backgroundColor: colors.primary, paddingTop: 40 }}>
      <View
        style={{
          borderBottomWidth: 1,
          borderBottomColor: colors.black_100,
          padding: 10,
        }}
      >
        <Pressable style={{ marginLeft: 10 }} onPress={() => router.back()}>
          <AntDesign name="arrowleft" size={24} color={colors.while} />
        </Pressable>
      </View>
      <View
        style={{
          paddingVertical: 20,
          paddingHorizontal: 10,
        }}
      >
        <TextInput
          value={search}
          onChangeText={(text) => setSearch(text)}
          placeholderTextColor={colors.gray_100}
          placeholder="search"
          style={{
            borderRadius: 20,
            paddingHorizontal: 20,
            paddingVertical: 10,
            backgroundColor: colors.black_100,
            fontSize: 12,
            color: colors.while,
          }}
        />
      </View>

      {isLoading && <SearchPreloader count={4} />}

      <View style={{ paddingHorizontal: 10 }}>
        {!isLoading &&
          users &&
          !error &&
          users.map((user, i) => (
            <TouchableOpacity
              key={i}
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 10,
                marginBottom: 10,
              }}
              onPress={() => handleNavigate(user.id)}
            >
              <View
                style={{
                  width: 40,
                  aspectRatio: 1 / 1,
                  backgroundColor: colors.black_100,
                  borderRadius: 1990,
                }}
              >
                <Image
                  source={{ uri: user.profile.image }}
                  style={{
                    width: "100%",
                    aspectRatio: 1 / 1,
                    borderRadius: 1000,
                  }}
                />
              </View>
              <View style={{ position: "relative" }}>
                {user.profile?.occupation?.name && (
                  <Text
                    style={{
                      fontSize: 5.5,
                      color: colors.while,
                      backgroundColor: colors.activeYellow,
                      borderRadius: 10,
                      paddingHorizontal: 7,
                      position: "absolute",
                      top: -2,
                      fontFamily: "Poppins-Medium",
                      right: 0,
                    }}
                  >
                    {user.profile.occupation.name}
                  </Text>
                )}
                <Text
                  style={{
                    fontSize: 13,
                    fontFamily: "Poppins-Medium",
                    color: colors.while,
                    marginTop: 10,
                  }}
                >
                  {user.username}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
      </View>
    </View>
  );
};

export default Search;
