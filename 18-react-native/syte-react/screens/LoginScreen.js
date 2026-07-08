import { useState } from "react";
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

import { LogoMark, PrimaryButton, ScreenFrame, styles } from "./shared";
import { login, setAuthToken } from "../api";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      return Alert.alert("Error", "Email and password are required.");
    }

    setLoading(true);
    try {
      const data = await login({ email, password });
      setAuthToken(data.token);
      navigation.replace("MainTabs");
    } catch (error) {
      Alert.alert("Login failed", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScreenFrame>
      <TouchableOpacity style={local.back} onPress={() => navigation.goBack()} activeOpacity={0.8}>
        <Text style={local.backText}>Back</Text>
      </TouchableOpacity>

      <View style={[styles.card, local.card]}>
        <LogoMark />
        <Text style={local.heading}>Enter your profile</Text>
        <View style={local.form}>
          <TextInput style={styles.input} placeholder="Email" placeholderTextColor="#111111" keyboardType="email-address" value={email} onChangeText={setEmail} />
          <TextInput style={styles.input} placeholder="Password" placeholderTextColor="#111111" secureTextEntry value={password} onChangeText={setPassword} />
        </View>
      </View>

      <View style={local.buttonWrap}>
        <PrimaryButton title={loading ? "Logging in..." : "Login"} onPress={handleLogin} />
      </View>
    </ScreenFrame>
  );
}

const local = StyleSheet.create({
  back: {
    position: "absolute",
    top: 18,
    right: 18,
    zIndex: 2,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: "rgba(4, 33, 59, 0.86)"
  },
  backText: {
    color: "#ffffff",
    fontFamily: "DcText",
    fontSize: 14,
    textTransform: "uppercase"
  },
  card: {
    minHeight: 420,
    marginTop: 20
  },
  heading: {
    marginTop: 16,
    color: "#0785ff",
    fontFamily: "DcText",
    fontSize: 22,
    textTransform: "uppercase"
  },
  form: {
    width: "100%",
    gap: 44,
    marginTop: 28
  },
  buttonWrap: {
    marginTop: 48
  }
});
