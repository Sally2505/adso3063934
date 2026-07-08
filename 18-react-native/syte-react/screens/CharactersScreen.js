import { useEffect, useState } from "react";
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { fetchCharacters } from "../api";
import { images, ScreenFrame, styles } from "./shared";

export default function CharactersScreen({ navigation }) {
  const [characters, setCharacters] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", fetchCharactersList);
    return unsubscribe;
  }, [navigation]);

  const fetchCharactersList = async () => {
    try {
      const data = await fetchCharacters();
      setCharacters(data);
      setError("");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <ScreenFrame>
      <Text style={styles.pageTitle}>Characters</Text>
      <TouchableOpacity style={local.addButton} activeOpacity={0.85} onPress={() => navigation.navigate("AddCharacter")}>
        <Text style={local.addButtonText}>Add new character</Text>
      </TouchableOpacity>
      {error ? <Text style={local.error}>{error}</Text> : null}
      <FlatList
        data={characters}
        keyExtractor={(item) => String(item.id)}
        contentContainerStyle={local.list}
        renderItem={({ item }) => (
          <TouchableOpacity style={local.item} activeOpacity={0.85} onPress={() => navigation.navigate("CharacterDetails", { id: item.id })}>
            <Image source={item.photo_url ? { uri: item.photo_url } : images.characters} style={local.image} />
            <Text style={local.name}>{item.name}</Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={<Text style={local.empty}>No characters found.</Text>}
      />
    </ScreenFrame>
  );
}

const local = StyleSheet.create({
  list: {
    width: 340,
    gap: 18,
    paddingTop: 24,
    paddingBottom: 24
  },
  item: {
    height: 128,
    flexDirection: "row",
    alignItems: "center",
    gap: 18,
    borderRadius: 12,
    paddingHorizontal: 18,
    backgroundColor: "rgba(4, 33, 59, 0.86)"
  },
  image: {
    width: 86,
    height: 96,
    resizeMode: "contain"
  },
  name: {
    flex: 1,
    color: "#ffffff",
    fontFamily: "DcTitle",
    fontSize: 25,
    textTransform: "uppercase"
  },
  addButton: {
    marginTop: 14,
    marginBottom: 20,
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: "rgba(7, 133, 255, 0.95)"
  },
  addButtonText: {
    color: "#ffffff",
    fontFamily: "DcText",
    fontSize: 16,
    textTransform: "uppercase"
  },
  error: {
    marginBottom: 14,
    color: "#ff8d8d",
    fontFamily: "DcText",
    textAlign: "center"
  },
  empty: {
    color: "#ffffff",
    textAlign: "center",
    marginTop: 20,
    fontFamily: "DcText"
  }
});
