import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import { fetchCities } from "../api";
import { images, ScreenFrame, styles, Tile } from "./shared";

const cityImages = {
  Gotham: images.gotham,
  Metropolis: images.metropolis,
  Themyscira: images.themyscira
};

export default function CitiesScreen({ navigation }) {
  const [cities, setCities] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchCitiesList();
  }, []);

  const fetchCitiesList = async () => {
    try {
      const data = await fetchCities();
      setCities(data);
      setError("");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <ScreenFrame>
      <Text style={styles.pageTitle}>Cities</Text>
      {error ? <Text style={local.error}>{error}</Text> : null}
      <View style={local.tiles}>
        {cities.map((city) => (
          <Tile
            key={city.id}
            title={city.name}
            image={cityImages[city.name] || images.profile}
            onPress={() => navigation.navigate("CityDetails", { id: city.id })}
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
