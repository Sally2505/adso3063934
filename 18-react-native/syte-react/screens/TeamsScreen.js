import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import { fetchTeams } from "../api";
import { images, ScreenFrame, styles, Tile } from "./shared";

const teamImages = {
  "Justice League": images.justiceLeague,
  "Teen Titans": images.teams
};

export default function TeamsScreen({ navigation }) {
  const [teams, setTeams] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchTeamsList();
  }, []);

  const fetchTeamsList = async () => {
    try {
      const data = await fetchTeams();
      setTeams(data);
      setError("");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <ScreenFrame>
      <Text style={styles.pageTitle}>Teams</Text>
      {error ? <Text style={local.error}>{error}</Text> : null}
      <View style={local.tiles}>
        {teams.map((team) => (
          <Tile
            key={team.id}
            title={team.name}
            image={teamImages[team.name] || images.teams}
            onPress={() => navigation.navigate("TeamDetails", { id: team.id })}
          />
        ))}
      </View>
    </ScreenFrame>
  );
}

const local = StyleSheet.create({
  tiles: {
    width: "100%",
    maxWidth: 360,
    gap: 24,
    marginTop: 56
  }
});
