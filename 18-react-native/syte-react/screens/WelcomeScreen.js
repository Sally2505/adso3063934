import { StyleSheet, Text, View } from "react-native";

import { LogoMark, PrimaryButton, ScreenFrame, styles } from "./shared";

export default function WelcomeScreen({ navigation }) {
  return (
    <ScreenFrame>
      <View style={[styles.card, local.card]}>
        <LogoMark />
        <Text style={styles.title}>DC Comics</Text>
        <Text style={[styles.text, local.fact]}>
          Did you know that the initials DC come from Detective Comics, the legendary magazine where Batman first
          appeared?
        </Text>
      </View>

      <View style={local.actions}>
        <PrimaryButton title="Login" onPress={() => navigation.navigate("Login")} />
        <PrimaryButton title="Register" onPress={() => navigation.navigate("Register")} />
      </View>
    </ScreenFrame>
  );
}

const local = StyleSheet.create({
  card: {
    minHeight: 444,
    marginTop: 20
  },
  fact: {
    marginTop: 38
  },
  actions: {
    width: "100%",
    maxWidth: 316,
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 18,
    marginTop: 44
  }
});
