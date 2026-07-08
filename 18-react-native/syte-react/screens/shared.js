import { ImageBackground, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export const images = {
  wallpaper: require("../assets/images/wallpaper 1.png"),
  dashboard: require("../assets/images/00af94715567fa713114e67d293d6f97.jpg"),
  profile: require("../assets/images/cf4ae4053175c8f4e54bfa0992527bab.jpg"),
  avatar: require("../assets/images/foto perfil my profile.jpg"),
  characters: require("../assets/images/Profile.webp"),
  cities: require("../assets/images/Central_City_Flash.png"),
  teams: require("../assets/images/Los_Jovenes_Titanes.avif"),
  gotham: require("../assets/images/Gotham.jpg"),
  metropolis: require("../assets/images/Metropolis_Superman.jpg"),
  themyscira: require("../assets/images/Themyscira_Wonder_Woman.png"),
  batman: require("../assets/images/batman.png"),
  superman: require("../assets/images/superman.png"),
  wonderWoman: require("../assets/images/wonder woman.png"),
  justiceLeague: require("../assets/images/liga_De_La_Justicia.jpg")
};

export function ScreenFrame({ children }) {
  return (
    <ImageBackground source={images.wallpaper} resizeMode="cover" style={styles.frame}>
      <View style={styles.tint} />
      <View style={styles.content}>{children}</View>
    </ImageBackground>
  );
}

export function LogoMark({ small = false }) {
  return (
    <View style={[styles.logo, small && styles.logoSmall]}>
      <Text style={[styles.logoText, small && styles.logoTextSmall]}>DC</Text>
    </View>
  );
}

export function PrimaryButton({ title, onPress, dark = false }) {
  return (
    <TouchableOpacity style={[styles.button, dark && styles.buttonDark]} activeOpacity={0.82} onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
}

export function Tile({ title, image, onPress }) {
  return (
    <TouchableOpacity style={styles.tile} activeOpacity={0.85} onPress={onPress}>
      <ImageBackground source={image} resizeMode="cover" style={styles.tileImage}>
        <View style={styles.tileShade} />
        <Text style={styles.tileText}>{title}</Text>
      </ImageBackground>
    </TouchableOpacity>
  );
}

export const styles = StyleSheet.create({
  frame: {
    flex: 1,
    backgroundColor: "#06111d"
  },
  tint: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(3, 12, 24, 0.2)"
  },
  content: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 22,
    paddingTop: 62
  },
  card: {
    width: "100%",
    maxWidth: 340,
    alignItems: "center",
    borderRadius: 10,
    paddingHorizontal: 24,
    paddingVertical: 24,
    backgroundColor: "rgba(4, 33, 59, 0.84)",
    shadowColor: "#001022",
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 6
  },
  logo: {
    width: 138,
    height: 138,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 69,
    borderWidth: 5,
    borderColor: "#0785ff",
    backgroundColor: "rgba(2, 11, 22, 0.9)"
  },
  logoSmall: {
    width: 52,
    height: 52,
    borderRadius: 26,
    borderWidth: 3
  },
  logoText: {
    color: "#0785ff",
    fontFamily: "DcTitle",
    fontSize: 42,
    lineHeight: 48
  },
  logoTextSmall: {
    fontSize: 18,
    lineHeight: 22
  },
  title: {
    marginTop: 18,
    color: "#0785ff",
    fontFamily: "DcTitle",
    fontSize: 39,
    lineHeight: 44,
    textAlign: "center",
    textTransform: "uppercase"
  },
  text: {
    color: "#ffffff",
    fontFamily: "DcText",
    fontSize: 21,
    lineHeight: 30,
    textAlign: "center",
    textTransform: "uppercase"
  },
  button: {
    minWidth: 128,
    height: 62,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    paddingHorizontal: 18,
    backgroundColor: "rgba(224, 238, 250, 0.95)"
  },
  buttonDark: {
    backgroundColor: "rgba(4, 33, 59, 0.94)"
  },
  buttonText: {
    color: "#0785ff",
    fontFamily: "DcText",
    fontSize: 24,
    textTransform: "uppercase"
  },
  input: {
    width: "100%",
    height: 50,
    borderRadius: 9,
    paddingHorizontal: 14,
    color: "#111111",
    backgroundColor: "rgba(246, 242, 244, 0.95)",
    fontFamily: "DcText",
    fontSize: 18
  },
  pageTitle: {
    color: "#ffffff",
    fontFamily: "DcTitle",
    fontSize: 38,
    textAlign: "center",
    textTransform: "uppercase",
    textShadowColor: "#061e3c",
    textShadowOffset: { width: 3, height: 3 },
    textShadowRadius: 1
  },
  tile: {
    width: "100%",
    height: 108,
    overflow: "hidden",
    borderRadius: 18,
    backgroundColor: "#07213a"
  },
  tileImage: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  tileShade: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.12)"
  },
  tileText: {
    color: "#ffffff",
    fontFamily: "DcTitle",
    fontSize: 29,
    textTransform: "uppercase",
    textShadowColor: "#08213d",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 1
  }
});
