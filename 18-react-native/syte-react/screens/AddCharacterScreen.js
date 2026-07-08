import { useState } from "react";
import { Alert, Image, StyleSheet, Text, TextInput, TouchableOpacity, View, ScrollView } from "react-native";
import * as ImagePicker from "expo-image-picker";

import { LogoMark, PrimaryButton, ScreenFrame, styles } from "./shared";
import { addCharacter, updateCharacter } from "../api";

export default function AddCharacterScreen({ navigation, route }) {
  const existingCharacter = route?.params?.character;
  const [name, setName] = useState(existingCharacter?.name || "");
  const [photoUrl, setPhotoUrl] = useState(existingCharacter?.photo_url || "");
  const [photoFile, setPhotoFile] = useState(null);
  const [realName, setRealName] = useState(existingCharacter?.real_name || "");
  const [age, setAge] = useState(existingCharacter?.age?.toString() || "");
  const [role, setRole] = useState(existingCharacter?.role || "");
  const [ability, setAbility] = useState(existingCharacter?.ability || "");
  const [alignment, setAlignment] = useState(existingCharacter?.alignment || "");
  const [enemy, setEnemy] = useState(existingCharacter?.enemy || "");
  const [city, setCity] = useState(existingCharacter?.city || "");
  const [team, setTeam] = useState(existingCharacter?.team || "");
  const [history, setHistory] = useState(existingCharacter?.history || "");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      return Alert.alert("Permiso necesario", "Debes permitir acceso a la galería para seleccionar una imagen.");
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.7,
      allowsEditing: true
    });

    if (result.canceled) return;
    const uri = result.assets?.[0]?.uri || result.uri;
    if (uri) {
      const name = uri.split('/').pop();
      const match = name?.match(/\.([0-9a-z]+)(?:[?#]|$)/i);
      const type = match ? `image/${match[1]}` : `image/jpeg`;
      setPhotoUrl(uri);
      setPhotoFile({ uri, name, type });
    }
  };

  const handleSubmit = async () => {
    if (!name) {
      setMessage("Name is required");
      return;
    }

    setLoading(true);
    try {
      const characterPayload = {
        name,
        photo_url: photoUrl,
        real_name: realName,
        age: age ? Number(age) : null,
        role,
        ability,
        alignment,
        enemy,
        city,
        team,
        history,
        photo: photoFile
      };

      if (existingCharacter?.id) {
        await updateCharacter(existingCharacter.id, characterPayload);
        setMessage("Character updated successfully");
      } else {
        await addCharacter(characterPayload);
        setMessage("Character saved successfully");
        setName("");
        setPhotoUrl("");
        setPhotoFile(null);
        setRealName("");
        setAge("");
        setRole("");
        setAbility("");
        setAlignment("");
        setEnemy("");
        setCity("");
        setTeam("");
        setHistory("");
      }
    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScreenFrame>
      <ScrollView contentContainerStyle={local.scrollContainer} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
        <TouchableOpacity style={local.back} onPress={() => navigation.goBack()} activeOpacity={0.8}>
          <Text style={local.backText}>Back</Text>
        </TouchableOpacity>
        <View style={local.cardWrap}>
          <View style={[styles.card, local.card]}>
            <LogoMark small />
            <Text style={local.heading}>{existingCharacter ? "Edit character" : "Add character"}</Text>
            <TouchableOpacity style={local.imagePicker} onPress={pickImage} activeOpacity={0.86}>
              {photoUrl ? (
                <Image source={{ uri: photoUrl }} style={local.previewImage} />
              ) : (
                <Text style={local.imagePlaceholder}>Toca para seleccionar imagen</Text>
              )}
            </TouchableOpacity>
            <Text style={local.helperText}>Toca la imagen para seleccionar una foto local (Android).</Text>
            <TextInput style={styles.input} placeholder="Name" placeholderTextColor="#111111" value={name} onChangeText={setName} />
            <TextInput style={styles.input} placeholder="Real name" placeholderTextColor="#111111" value={realName} onChangeText={setRealName} />
            <TextInput style={styles.input} placeholder="Age" placeholderTextColor="#111111" keyboardType="numeric" value={age} onChangeText={setAge} />
            <TextInput style={styles.input} placeholder="Role" placeholderTextColor="#111111" value={role} onChangeText={setRole} />
            <TextInput style={styles.input} placeholder="Ability" placeholderTextColor="#111111" value={ability} onChangeText={setAbility} />
            <TextInput style={styles.input} placeholder="Alignment" placeholderTextColor="#111111" value={alignment} onChangeText={setAlignment} />
            <TextInput style={styles.input} placeholder="Enemy" placeholderTextColor="#111111" value={enemy} onChangeText={setEnemy} />
            <TextInput style={styles.input} placeholder="City" placeholderTextColor="#111111" value={city} onChangeText={setCity} />
            <TextInput style={styles.input} placeholder="Team" placeholderTextColor="#111111" value={team} onChangeText={setTeam} />
            <TextInput style={[styles.input, local.textarea]} placeholder="History" placeholderTextColor="#111111" value={history} onChangeText={setHistory} multiline numberOfLines={4} />
            <Text style={local.message}>{message}</Text>
            <PrimaryButton title={loading ? "Saving..." : existingCharacter ? "Update" : "Save"} onPress={handleSubmit} />
          </View>
        </View>
      </ScrollView>
    </ScreenFrame>
  );
}

const local = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    alignItems: "center",
    paddingTop: 36,
    paddingBottom: 44,
    backgroundColor: "rgba(0, 0, 0, 0.12)"
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
  },
  cardWrap: {
    width: "100%",
    maxWidth: 360,
    paddingHorizontal: 12
  },
  card: {
    width: "100%",
    gap: 16,
    backgroundColor: "rgba(4, 33, 59, 0.92)",
    borderColor: "rgba(7, 133, 255, 0.4)",
    borderWidth: 1,
    padding: 24
  },
  heading: {
    color: "#0785ff",
    fontFamily: "DcText",
    fontSize: 22,
    textTransform: "uppercase"
  },
  imagePicker: {
    width: "100%",
    height: 180,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "rgba(7, 133, 255, 0.35)",
    backgroundColor: "rgba(14, 41, 68, 0.92)",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden"
  },
  previewImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover"
  },
  imagePlaceholder: {
    color: "#c7d8eb",
    fontFamily: "DcText",
    fontSize: 16,
    textAlign: "center",
    paddingHorizontal: 10
  },
  helperText: {
    color: "#ffffff",
    fontFamily: "DcText",
    fontSize: 14,
    marginTop: 8,
    marginBottom: 8,
    opacity: 0.8
  },
  message: {
    color: "#ffffff",
    fontFamily: "DcText",
    fontSize: 16,
    minHeight: 24,
    marginBottom: 8
  }
});
