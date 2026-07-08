import { useEffect, useState } from "react";
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { fetchCityById } from "../api";
import { images, ScreenFrame, styles } from "./shared";

const cityImages = {
  Gotham: images.gotham,
  Metropolis: images.metropolis,
  Themyscira: images.themyscira
};

export default function CityDetailsScreen({ route, navigation }) {
  const { id } = route.params;
  const [city, setCity] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchCity();
  }, []);

  const fetchCity = async () => {
    try {
      const data = await fetchCityById(id);
      setCity(data);
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
        {city ? (
          <View style={[styles.card, local.card]}>
            <Image source={cityImages[city.name] || images.profile} style={local.image} />
            <Text style={local.title}>{city.name}</Text>
            <Text style={local.field}>State: {city.state || "N/A"}</Text>
            <Text style={local.field}>Country: {city.country || "N/A"}</Text>
            <Text style={local.field}>Population characters: {city.population_characters || "N/A"}</Text>
            <Text style={local.field}>Population count: {city.population_count || "N/A"}</Text>
          </View>
        ) : (
          <Text style={local.loading}>Loading city...</Text>
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