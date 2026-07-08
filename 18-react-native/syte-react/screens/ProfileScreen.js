import { Image, StyleSheet, Text, View } from "react-native";

import { images, ScreenFrame, styles } from "./shared";

export default function ProfileScreen() {
  return (
    <ScreenFrame>
      <Text style={styles.pageTitle}>My Profile</Text>
      <View style={[styles.card, local.card]}>
        <Image source={images.avatar} style={local.avatar} />
        <Text style={local.name}>Bruce Wayne</Text>
        <Text style={local.copy}>Owner of Wayne Enterprises and permanent guardian of Gotham City.</Text>
      </View>
    </ScreenFrame>
  );
}

const local = StyleSheet.create({
  card: {
    marginTop: 52,
    minHeight: 390
  },
  avatar: {
    width: 170,
    height: 170,
    borderRadius: 12
  },
  name: {
    marginTop: 24,
    color: "#0785ff",
    fontFamily: "DcTitle",
    fontSize: 32,
    textTransform: "uppercase"
  },
  copy: {
    marginTop: 20,
    color: "#ffffff",
    fontFamily: "DcText",
    fontSize: 19,
    lineHeight: 27,
    textAlign: "center",
    textTransform: "uppercase"
  }
});
