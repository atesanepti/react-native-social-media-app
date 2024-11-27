import { View, Text, Alert, Linking } from "react-native";
import React from "react";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import colors from "./../../constants/Colors";
import AboutList from "./AboutList";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Link } from "expo-router";
import { useSelector } from "react-redux";
import Hobies from "./Hobies";
const ProfileAbout = ({ profile }) => {
  const { occupation, education, dob, address, hobies } = profile;
  const { user } = useSelector((state) => state.auth);
  console.log("profile ", profile);
  console.log("user ", user.id);
  return (
    <View style={{ paddingHorizontal: 10, paddingVertical: 20 }}>
      {/* header */}
      <View style={{ flexDirection: "row", alignItems: "center", gap: 3 }}>
        {/* <AntDesign name="infocirlceo" size={16} color="#fff" /> */}
        <Text style={{ color: colors.while, fontFamily: "Poppins-SemiBold" }}>
          {" "}
          Detailes
        </Text>
      </View>

      {/* list */}
      <View style={{ paddingHorizontal: 10 }}>
        {user.id == profile.user.id ? (
          <AboutList
            title={occupation.emotion ? occupation.emotion : "Emotion"}
            value={occupation.name ? occupation.name : "Set your occupation"}
          >
            <MaterialIcons
              name="work"
              size={24}
              color="#ddd"
              style={{ width: 30 }}
            />
          </AboutList>
        ) : (
          occupation &&
          occupation.name && (
            <AboutList title={occupation.emotion} value={occupation.name}>
              <MaterialIcons
                name="work"
                size={24}
                color="#ddd"
                style={{ width: 30 }}
              />
            </AboutList>
          )
        )}

        {user.id == profile.user.id ? (
          <AboutList
            title="Live in"
            value={address.address ? address.address : "Set your address"}
          >
            <EvilIcons
              name="location"
              size={22}
              color="#ddd"
              style={{ width: 30 }}
            />
          </AboutList>
        ) : (
          address &&
          address.address && (
            <AboutList title="Live in" value={address.address}>
              <EvilIcons
                name="location"
                size={22}
                color="#ddd"
                style={{ width: 30 }}
              />
            </AboutList>
          )
        )}

        {user.id == profile.user.id ? (
          <AboutList
            title={education.degree}
            link={education.instituteLink}
            value={education.instituteName}
          >
            <MaterialCommunityIcons
              name="book-education-outline"
              size={22}
              color="#ddd"
              style={{ width: 30 }}
            />
          </AboutList>
        ) : (
          education &&
          education.intituteName && (
            <AboutList
              title={education.degree}
              link={education.instituteLink}
              value={education.instituteName}
            >
              <MaterialCommunityIcons
                name="book-education-outline"
                size={22}
                color="#ddd"
                style={{ width: 30 }}
              />
            </AboutList>
          )
        )}

        {user.id == profile.user.id ? (
          <AboutList
            title="Date Of Birth"
            value={`${dob.year ? dob.year : "Year"}/${
              dob.month ? dob.month : "Month"
            }/${dob.day ? dob.day : "Day"}`}
          >
            <FontAwesome5
              name="birthday-cake"
              size={20}
              color="#ddd"
              style={{ width: 30 }}
            />
          </AboutList>
        ) : (
          dob &&
          dob.year && (
            <AboutList
              title="Date Of Birth"
              value={`${dob.year}/${dob.month}/${dob.day}`}
            >
              <FontAwesome5
                name="birthday-cake"
                size={20}
                color="#ddd"
                style={{ width: 30 }}
              />
            </AboutList>
          )
        )}

        {hobies.length > 0 && <Hobies hobies={hobies} />}
      </View>

      {/* update profile */}
      {user.id == profile.user.id && (
        <View>
          <Link
            href="/ProfileUpdate"
            style={{
              color: "#006BFF",
              width: "100%",
              textAlign: "center",
              paddingVertical: 10,
              borderRadius: 6,
              marginVertical: 30,
              backgroundColor: "#006aff38",
            }}
          >
            Edit Profile
          </Link>
        </View>
      )}
    </View>
  );
};

export default ProfileAbout;
