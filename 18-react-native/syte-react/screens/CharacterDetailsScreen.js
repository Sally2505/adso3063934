import { useEffect, useState } from "react";
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { fetchCharacterById } from "../api";
import { images, ScreenFrame, styles } from "./shared";

export default function CharacterDetailsScreen({ route, navigation }) {
  const { id } = route.params;
  const [character, setCharacter] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchCharacter();
  }, []);

  const fetchCharacter = async () => {
    try {
      const data = await fetchCharacterById(id);
      setCharacter(data);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <ScreenFrame>
      <TouchableOpacity style={local.back} onPress={() => navigation.goBack()} activeOpacity={0.8}>
        <Text style={local.backText}>Back</Text>
      </TouchableOpacity>
      <ScrollView contentContainerStyle={local.content}>
        {error ? <Text style={local.error}>{error}</Text> : null}
        {character ? (
          <View style={[styles.card, local.card]}>
            <Image source={character.photo_url ? { uri: character.photo_url } : images.characters} style={local.image} />
            <Text style={local.title}>{character.name}</Text>
            <Text style={local.field}>Real Name: {character.real_name || "N/A"}</Text>
            <Text style={local.field}>Age: {character.age || "N/A"}</Text>
            <Text style={local.field}>Role: {character.role || "N/A"}</Text>
            <Text style={local.field}>Ability: {character.ability || "N/A"}</Text>
            <Text style={local.field}>Alignment: {character.alignment || "N/A"}</Text>
            <Text style={local.field}>Enemy: {character.enemy || "N/A"}</Text>
            <Text style={local.field}>City: {character.city || "N/A"}</Text>
            <Text style={local.field}>Team: {character.team || "N/A"}</Text>
            <Text style={local.field}>History: {character.history || "N/A"}</Text>
          </View>
        ) : (
          <Text style={local.loading}>Loading character...</Text>
        )}
      </ScrollView>
    </ScreenFrame>
  );
}

const local = StyleSheet.create({
  content: {
    alignItems: "center",
    paddingTop: 60,
    paddingBottom: 40,
    width: "100%"
  },
  card: {
    width: "100%",
    maxWidth: 340,
    gap: 12
  },
  image: {
    width: "100%",
    height: 220,
    borderRadius: 16,
    resizeMode: "cover"
  },
  title: {
    color: "#0785ff",
    fontFamily: "DcTitle",
    fontSize: 28,
    textTransform: "uppercase"
  },
  field: {
    color: "#ffffff",
    fontFamily: "DcText",
    fontSize: 16,
    lineHeight: 24
  },
  loading: {
    color: "#ffffff",
    fontFamily: "DcText",
    fontSize: 18,
    marginTop: 20
  },
  error: {
    color: "#ff8d8d",
    fontFamily: "DcText",
    fontSize: 16,
    textAlign: "center",
    marginBottom: 16
  },
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
  }
});