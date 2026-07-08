import { Image, StyleSheet, Text, View } from "react-native";

import { images, LogoMark, ScreenFrame, styles, Tile } from "./shared";

export default function DashboardScreen({ navigation }) {
  return (
    <ScreenFrame>
      <LogoMark small />

      <View style={local.stack}>
        <Image source={images.characters} style={[local.chip, local.side]} />
        <Image source={images.wallpaper} style={[local.chip, local.main]} />
        <Image source={images.teams} style={[local.chip, local.front]} />
      </View>

      <Text style={styles.pageTitle}>Dashboard</Text>
      <Text style={local.welcome}>Welcome to the dashboard</Text>

      <View style={local.tiles}>
        <Tile title="Characters" image={images.characters} onPress={() => navigation.navigate("Characters")} />
        <Tile title="Cities" image={images.cities} onPress={() => navigation.navigate("Cities")} />
        <Tile title="Teams" image={images.teams} onPress={() => navigation.navigate("Teams")} />
      </View>
    </ScreenFrame>
  );
}

const local = StyleSheet.create({
  stack: {
    width: 96,
    height: 96,
    marginTop: 18,
    marginBottom: 46
  },
  chip: {
    position: "absolute",
    borderRadius: 7
  },
  main: {
    top: 0,
    left: 36,
    zIndex: 3,
    width: 55,
    height: 55
  },
  side: {
    top: 29,
    left: 4,
    zIndex: 2,
    width: 47,
    height: 47
  },
  front: {
    top: 54,
    left: 15,
    zIndex: 4,
    width: 55,
    height: 42
  },
  welcome: {
    marginTop: 38,
    color: "#ffffff",
    fontFamily: "DcText",
    fontSize: 20,
    textAlign: "center",
    textTransform: "uppercase"
  },
  tiles: {
    width: "100%",
    maxWidth: 360,
    gap: 24,
    marginTop: 46
  }
});
