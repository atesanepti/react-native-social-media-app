import {
  View,
  Text,
  Image,
  Dimensions,
  FlatList,
  ScrollView,
  Pressable,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import colors from "@/constants/Colors";
import images from "@/constants/images";
import ImageGallery from "./ImageGallery";

const ImageLoader = () => {
  return (
    <View
      style={{
        width: "100%",
        aspectRatio: 1 / 1,
        backgroundColor: colors.black_100,
      }}
    ></View>
  );
};

const ImageView = ({ image, extraStyle = {}, adjustment }) => {
  const [height, setHeight] = useState(0);

  const screenWidth =
    Dimensions.get("window").width - (adjustment == "full" ? 0 : 10);
  const [galleryOpen, setGalleryOpen] = useState({
    isOpen: false,
    image: "",
    height,
  });

  const handleImageLoaded = (e) => {
    const { width, height } = e.nativeEvent.source;
    const calculatedHeight = (height / width) * screenWidth;
    setHeight(calculatedHeight);
  };

  return (
    <>
      <View
        style={{
          width: screenWidth,
          minHeight: screenWidth,
          backgroundColor: colors.black_100,
        }}
      >
        <Pressable onPress={() => setGalleryOpen({ isOpen: true, image })}>
          <Image
            source={{ uri: image }}
            style={[
              {
                width: screenWidth,
                height: height,
              },
              extraStyle,
            ]}
            onLoad={handleImageLoaded}
          />
        </Pressable>
      </View>

      <ImageGallery
        height={height}
        image={galleryOpen.image}
        isVisiable={galleryOpen.isOpen}
        onClose={() => setGalleryOpen({ isOpen: false, image: "" })}
      />
    </>
  );
};

const ImageX = ({ source, extraStyle = {}, adjustment }) => {
  const images = source.length !== 1 ? source : source.join("");
  const screenWidth = Dimensions.get("window").width;
  const scrollCom = useRef(null);
  const [scrollStart, setScrollStart] = useState(0);
  const [scrollEnd, setScrollEnd] = useState(0);

  useEffect(() => {
    if (scrollEnd) {
      const scrollToX =
        scrollStart < scrollEnd
          ? scrollStart +
            Math.ceil((scrollEnd - scrollStart) / screenWidth) * screenWidth
          : scrollStart -
            Math.ceil((scrollStart - scrollEnd) / screenWidth) * screenWidth;

      scrollCom.current.scrollTo({ x: scrollToX, animated: true });
    }
  }, [scrollEnd]);

  return (
    <>
      {Array.isArray(images) ? (
        <ScrollView
          ref={scrollCom}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          onScrollBeginDrag={(e) =>
            setScrollStart(e.nativeEvent.contentOffset.x)
          }
          onScrollEndDrag={(e) => setScrollEnd(e.nativeEvent.contentOffset.x)}
        >
          {images.map((image, i) => {
            return (
              <View key={i} style={{ position: "relative" }}>
                <ImageView image={image} adjustment={adjustment} />
                <Text
                  style={{
                    color: colors.while,
                    backgroundColor: "#0000005d",
                    position: "absolute",
                    top: 10,
                    right: 10,
                    paddingHorizontal: 7,
                    borderRadius: 10,
                    fontSize: 11,
                    paddingVertical: 5,
                  }}
                >
                  {i + 1}/{images.length}
                </Text>
              </View>
            );
          })}
        </ScrollView>
      ) : (
        <ImageView image={images} adjustment={adjustment} />
      )}
    </>
  );
};

export default ImageX;
