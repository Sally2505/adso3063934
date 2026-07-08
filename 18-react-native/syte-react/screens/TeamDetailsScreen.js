import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { fetchTeamById } from "../api";
import { ScreenFrame, styles } from "./shared";

export default function TeamDetailsScreen({ route, navigation }) {
  const { id } = route.params;
  const [team, setTeam] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchTeam();
  }, []);

  const fetchTeam = async () => {
    try {
      const data = await fetchTeamById(id);
      setTeam(data);
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
        {team ? (
          <View style={[styles.card, local.card]}>
            <Text style={local.title}>{team.name}</Text>
            <Text style={local.field}>Type: {team.type || "N/A"}</Text>
            <Text style={local.field}>Headquarters: {team.headquarters || "N/A"}</Text>
            <Text style={local.field}>Members: {team.members || "N/A"}</Text>
          </View>
        ) : (
          <Text style={local.loading}>Loading team...</Text>
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