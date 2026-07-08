import "react-native-gesture-handler";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import {
  Alert,
  ActivityIndicator,
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useFonts } from "expo-font";
import * as ImagePicker from "expo-image-picker";
import { StatusBar } from "expo-status-bar";

import {
  addCharacter,
  addCity,
  addTeam,
  clearAuthToken,
  fetchCharacters,
  fetchCities,
  fetchMe,
  fetchTeams,
  login,
  register,
  setAuthToken,
  updateCharacter,
  updateCity,
  updateMe,
  updateTeam
} from "./api";
import {
  deleteCharacter as deleteCharacterApi,
  deleteCity as deleteCityApi,
  deleteTeam as deleteTeamApi
} from "./api";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const DataContext = createContext(null);
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const assets = {
  logo: require("./assets/dc/logoDC.png"),
  robin: require("./assets/dc/Robin2.jpg"),
  fondos: {
    dashboard: require("./assets/dc/fondos/dashboard.png"),
    login: require("./assets/dc/fondos/login.png"),
    register: require("./assets/dc/fondos/register.png"),
    profile: require("./assets/dc/fondos/myProfile.jpg"),
    characters: require("./assets/dc/fondos/characters.jpg"),
    cities: require("./assets/dc/fondos/cities.jpg"),
    teams: require("./assets/dc/fondos/teams.jpg")
  },
  icons: {
    sidebar: require("./assets/dc/icons/sidebar.png"),
    profile: require("./assets/dc/icons/profile.webp"),
    characters: require("./assets/dc/icons/characters.png"),
    cities: require("./assets/dc/icons/cities.webp"),
    teams: require("./assets/dc/icons/teams.png"),
    plus: require("./assets/dc/icons/plus.png"),
    details: require("./assets/dc/icons/details.png"),
    edit: require("./assets/dc/icons/edit.png"),
    delete: require("./assets/dc/icons/delete.png"),
    back: require("./assets/dc/icons/back.png")
  },
  sidebar: {
    dashboard: require("./assets/dc/sidebar/dashboard.jpg"),
    profile: require("./assets/dc/sidebar/myProfile.jpg"),
    characters: require("./assets/dc/sidebar/characters.jpg"),
    cities: require("./assets/dc/sidebar/cities.jpg"),
    teams: require("./assets/dc/sidebar/teams.webp")
  },
  cities: {
    Atlantis: require("./assets/dc/cities/Atlantis.avif"),
    Bludhaven: require("./assets/dc/cities/bludhaven.avif"),
    CentralCity: require("./assets/dc/cities/CentralCity.png"),
    CoastCity: require("./assets/dc/cities/CoastCity.png"),
    Gotham: require("./assets/dc/cities/Gotham.jpg"),
    Metropolis: require("./assets/dc/cities/Metropolis.jpg"),
    StarCity: require("./assets/dc/cities/StarCity.webp"),
    Themyscira: require("./assets/dc/cities/Themyscira.png")
  },
  teams: {
    justice: require("./assets/dc/teams/liga_De_La_Justicia.jpg"),
    birds: require("./assets/dc/teams/aves-de_presa.webp"),
    titans: require("./assets/dc/teams/Los_Jovenes_Titanes.avif"),
    gotham: require("./assets/dc/teams/Profile - copia.webp"),
    suicide: require("./assets/dc/teams/Escuadron_Suicida_2.jpg")
  }
};

const cityPresets = [
  { id: "preset-coast-city", name: "Coast City", color: "#87FC7C", image: assets.cities.CoastCity, photo_url: "CoastCity.png", country: "USA", state: "California", population_count: 0 },
  { id: "preset-bludhaven", name: "Bludhaven", color: "#7EFEFF", image: assets.cities.Bludhaven, photo_url: "bludhaven.avif", country: "USA", state: "New Jersey", population_count: 0 },
  { id: "preset-gotham-city", name: "Gotham City", color: "#9D7DFE", image: assets.cities.Gotham, photo_url: "Gotham.jpg", country: "USA", state: "New Jersey", population_count: 0 },
  { id: "preset-star-city", name: "Star City", color: "#FE7BFF", image: assets.cities.StarCity, photo_url: "StarCity.webp", country: "USA", state: "Washington", population_count: 0 },
  { id: "preset-central-city", name: "Central City", color: "#FEB4BD", image: assets.cities.CentralCity, photo_url: "CentralCity.png", country: "USA", state: "Missouri", population_count: 0 },
  { id: "preset-metropolis", name: "Metropolis", color: "#FEDAA4", image: assets.cities.Metropolis, photo_url: "Metropolis.jpg", country: "USA", state: "Delaware", population_count: 0 },
  { id: "preset-themyscira", name: "Themyscira", color: "#FFF495", image: assets.cities.Themyscira, photo_url: "Themyscira.png", country: "Greece", state: "Aegean Sea", population_count: 0 },
  { id: "preset-atlantis", name: "Atlantis", color: "#7DFECA", image: assets.cities.Atlantis, photo_url: "Atlantis.avif", country: "Atlantic Ocean", state: "Undersea Kingdom", population_count: 0 }
];

const teamPresets = [
  { id: "preset-justice-league", name: "Justice League", type: "Superheroes", headquarters: "Hall of Justice", image: assets.teams.justice, image_url: "liga_De_La_Justicia.jpg", members: [] },
  { id: "preset-birds-of-prey", name: "Birds of Prey", type: "Superheroes", headquarters: "Clock Tower", image: assets.teams.birds, image_url: "aves-de_presa.webp", members: [] },
  { id: "preset-teen-titans", name: "Teen Titans", type: "Superheroes", headquarters: "Titans Tower", image: assets.teams.titans, image_url: "Los_Jovenes_Titanes.avif", members: [] },
  { id: "preset-gotham-knights", name: "Gotham Knights", type: "Superheroes", headquarters: "The Bell Tower", image: assets.teams.gotham, image_url: "Profile - copia.webp", members: [] },
  { id: "preset-suicide-squad", name: "Suicide Squad", type: "Antiheroes", headquarters: "Belle Reve", image: assets.teams.suicide, image_url: "Escuadron_Suicida_2.jpg", members: [] }
];

function findTeam(nameOrId) {
  return teamPresets.find((team) => normalize(team.name) === normalize(nameOrId) || String(team.id) === String(nameOrId)) || teamPresets[0];
}

const imageMap = {
  "CoastCity.png": assets.cities.CoastCity,
  "bludhaven.avif": assets.cities.Bludhaven,
  "Gotham.jpg": assets.cities.Gotham,
  "StarCity.webp": assets.cities.StarCity,
  "CentralCity.png": assets.cities.CentralCity,
  "Metropolis.jpg": assets.cities.Metropolis,
  "Themyscira.png": assets.cities.Themyscira,
  "Atlantis.avif": assets.cities.Atlantis,
  "liga_De_La_Justicia.jpg": assets.teams.justice,
  "aves-de_presa.webp": assets.teams.birds,
  "Los_Jovenes_Titanes.avif": assets.teams.titans,
  "Profile - copia.webp": assets.teams.gotham,
  "Escuadron_Suicida_2.jpg": assets.teams.suicide,
  "characters.png": assets.icons.characters,
  "profile.webp": assets.icons.profile
};

const normalize = (value) => (value || "").toString().trim().toLowerCase().replace(/\s+/g, " ");
const slugify = (value) => normalize(value).replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
const isApiId = (id) => /^[0-9]+$/.test(String(id || ""));
const parseMembers = (value) => {
  if (Array.isArray(value)) return value;
  if (!value) return [];
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return value.split(",").map((item) => item.trim()).filter(Boolean);
  }
};
const emptyToNull = (value) => {
  if (value === undefined || value === null) return null;
  const text = String(value).trim();
  return text ? text : null;
};
const isLocalUri = (value) => typeof value === "string" && (value.startsWith("file:") || value.startsWith("content:"));
const toCharacterPayload = (item) => ({
  photo: item.photo,
  photo_url: isLocalUri(item.photo_url) ? null : emptyToNull(item.photo_url),
  name: emptyToNull(item.name),
  real_name: emptyToNull(item.real_name),
  age: item.age === "" || item.age === undefined || item.age === null ? null : Number(item.age),
  role: emptyToNull(item.role),
  ability: emptyToNull(item.ability),
  alignment: emptyToNull(item.alignment),
  enemy: emptyToNull(item.enemy),
  city: emptyToNull(item.city),
  team: emptyToNull(item.team),
  history: emptyToNull(item.history)
});
const toCityPayload = (item, preset = {}) => ({
  photo: item.photo,
  photo_url: isLocalUri(item.photo_url) ? null : emptyToNull(item.photo_url || preset.photo_url),
  name: emptyToNull(item.name || preset.name),
  state: emptyToNull(item.state || preset.state),
  country: emptyToNull(item.country || preset.country),
  population_characters: emptyToNull(item.population_characters),
  population_count: Number(item.population_count) || 0
});
const toTeamPayload = (item, preset = {}) => ({
  image: item.image,
  image_url: isLocalUri(item.image_url) ? null : emptyToNull(item.image_url || preset.image_url),
  name: emptyToNull(item.name || preset.name),
  type: emptyToNull(item.type || preset.type),
  headquarters: emptyToNull(item.headquarters || preset.headquarters),
  members: parseMembers(item.members)
});
const sourceFrom = (value, fallback) => {
  if (!value) return fallback;
  if (typeof value !== "string") return value;
  if (value.startsWith("http") || value.startsWith("file:") || value.startsWith("content:")) return { uri: value };
  const key = Object.keys(imageMap).find((name) => value.includes(name));
  return key ? imageMap[key] : fallback;
};
const pickLocalImage = async (prefix = "image") => {
  const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
  if (!permission.granted) {
    Alert.alert("Permiso necesario", "Permite acceso a la galeria para seleccionar una imagen.");
    return null;
  }
  const result = await ImagePicker.launchImageLibraryAsync({ mediaTypes: ImagePicker.MediaTypeOptions.Images, quality: 0.7, allowsEditing: true });
  const asset = result.assets?.[0];
  if (!asset?.uri) return null;
  return {
    uri: asset.uri,
    name: asset.fileName || `${prefix}-${Date.now()}.jpg`,
    type: asset.mimeType || "image/jpeg"
  };
};
const parseNameList = (value) => {
  if (Array.isArray(value)) return value;
  if (!value) return [];
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return value.split(",").map((item) => item.trim()).filter(Boolean);
  }
};

function findCity(nameOrId) {
  const aliasMap = {
    gotham: "Gotham City",
    "gotham city": "Gotham City",
    metropolis: "Metropolis",
    "central city": "Central City",
    "coast city": "Coast City",
    bludhaven: "Bludhaven",
    "star city": "Star City",
    themyscira: "Themyscira",
    atlantis: "Atlantis"
  };
  const normalized = normalize(nameOrId);
  const mappedName = aliasMap[normalized] || nameOrId;
  return cityPresets.find((city) => normalize(city.name) === normalize(mappedName) || String(city.id) === String(nameOrId)) || cityPresets[0];
}

function mergeCities(apiCities = []) {
  return apiCities.map((city) => {
    const preset = findCity(city.name || city.id) || cityPresets[0];
    return {
      ...preset,
      ...city,
      id: city.id || preset.id,
      name: city.name?.trim() || preset.name,
      image: sourceFrom(city.photo_url || city.image, preset.image),
      country: city.country || preset.country || "USA",
      state: city.state || preset.state || "Unknown",
      population_count: Number(city.population_count) || 0
    };
  });
}

function mergeTeams(apiTeams = []) {
  return apiTeams.map((team) => {
    const preset = findTeam(team.name || team.id) || teamPresets[0];
    return {
      ...preset,
      ...team,
      id: team.id || preset.id || slugify(team.name),
      image: sourceFrom(team.image_url || team.photo_url || team.image, preset.image),
      members: parseMembers(team.members)
    };
  });
}

function DataProvider({ children }) {
  const emptyProfile = {
    username: "",
    name: "",
    email: "",
    phone: ""
  };
  const [profiles, setProfiles] = useState({});
  const [currentProfileId, setCurrentProfileId] = useState("");
  const [characters, setCharacters] = useState([]);
  const [cities, setCities] = useState([]);
  const [teams, setTeams] = useState([]);

  const refresh = async () => {
    const [characterResult, cityResult, teamResult] = await Promise.allSettled([fetchCharacters(), fetchCities(), fetchTeams()]);
    if (characterResult.status === "fulfilled" && Array.isArray(characterResult.value)) setCharacters(characterResult.value);
    if (cityResult.status === "fulfilled" && Array.isArray(cityResult.value)) setCities(mergeCities(cityResult.value));
    if (teamResult.status === "fulfilled" && Array.isArray(teamResult.value)) setTeams(mergeTeams(teamResult.value));
  };

  const refreshProfile = async () => {
    try {
      const user = await fetchMe();
      if (user) {
        const id = normalize(user.email || user.username || user.name || "local-profile");
        setCurrentProfileId(id);
        setProfiles((current) => ({ ...current, [id]: { ...emptyProfile, ...(current[id] || {}), ...user } }));
      }
    } catch {}
  };

  useEffect(() => {
    refresh();
    refreshProfile();
  }, []);

  const profile = profiles[currentProfileId] || emptyProfile;

  const value = useMemo(() => ({
    profile,
    openProfile: (next) => {
      const id = normalize(next.email || next.username || next.name || "local-profile");
      setCurrentProfileId(id);
      setProfiles((current) => ({ ...current, [id]: { ...emptyProfile, ...(current[id] || {}), ...next } }));
    },
    setProfile: async (next) => {
      const id = currentProfileId || normalize(next.email || next.username || next.name || "local-profile");
      setCurrentProfileId(id);
      const mergedProfile = { ...emptyProfile, ...(profiles[id] || {}), ...next };
      setProfiles((current) => ({ ...current, [id]: mergedProfile }));
      try {
        const response = await updateMe(next);
        const updatedUser = response?.user || response || next;
        const finalProfile = { ...mergedProfile, ...updatedUser };
        setProfiles((current) => ({ ...current, [id]: finalProfile }));
      } catch {}
    },
    logout: () => {
      clearAuthToken();
      setCurrentProfileId("");
      setProfiles({});
    },
    characters,
    cities,
    teams,
    refresh,
    saveCharacter: async (item) => {
      const payload = toCharacterPayload(item);
      const existingId = isApiId(item.id) ? item.id : null;
      const optimisticId = existingId || `local-${Date.now()}`;
      const optimisticRecord = { ...payload, photo_url: item.photo_url || payload.photo_url, id: optimisticId };
      setCharacters((current) => existingId ? current.map((character) => String(character.id) === String(existingId) ? { ...character, ...optimisticRecord, id: existingId } : character) : [...current, optimisticRecord]);
      try {
        const saved = existingId ? await updateCharacter(existingId, payload) : await addCharacter(payload);
        if (saved?.id && !existingId) {
          setCharacters((current) => current.map((character) => String(character.id) === String(optimisticId) ? { ...optimisticRecord, id: saved.id } : character));
        }
        await refresh();
      } catch (error) {
        Alert.alert("Error", error.message || "No se pudo guardar el personaje.");
        throw error;
      }
    },
    deleteCharacter: async (id) => {
      if (!isApiId(id)) return;
      try {
        await deleteCharacterApi(id);
        await refresh();
      } catch (error) {
        Alert.alert("Error", error.message || "No se pudo eliminar el personaje.");
        throw error;
      }
    },
    saveCity: async (item) => {
      const preset = findCity(item.name || "") || cityPresets[0];
      const existingId = isApiId(item.id) ? item.id : null;
      const payload = toCityPayload(item, preset);
      const optimisticPhoto = item.photo_url || payload.photo_url;
      const optimisticRecord = { ...preset, ...payload, photo_url: optimisticPhoto, id: existingId || `local-${Date.now()}`, image: sourceFrom(optimisticPhoto, preset.image) };
      setCities((current) => existingId ? current.map((city) => String(city.id) === String(existingId) ? optimisticRecord : city) : [...current, optimisticRecord]);
      try {
        if (existingId) await updateCity(existingId, payload);
        else await addCity(payload);
        await refresh();
      } catch (error) {
        Alert.alert("Error", error.message || "No se pudo guardar la ciudad.");
        throw error;
      }
    },
    saveTeam: async (item) => {
      const preset = findTeam(item.name || "") || teamPresets[0];
      const existingId = isApiId(item.id) ? item.id : null;
      const payload = toTeamPayload(item, preset);
      const optimisticImage = item.image_url || payload.image_url;
      const optimisticRecord = { ...preset, ...payload, image_url: optimisticImage, id: existingId || `local-${Date.now()}`, image: sourceFrom(optimisticImage, preset.image) };
      setTeams((current) => existingId ? current.map((team) => String(team.id) === String(existingId) ? optimisticRecord : team) : [...current, optimisticRecord]);
      try {
        if (existingId) await updateTeam(existingId, payload);
        else await addTeam(payload);
        await refresh();
      } catch (error) {
        Alert.alert("Error", error.message || "No se pudo guardar el equipo.");
        throw error;
      }
    },
    deleteCity: async (id) => {
      if (!isApiId(id)) return;
      try {
        await deleteCityApi(id);
        await refresh();
      } catch (error) {
        Alert.alert("Error", error.message || "No se pudo eliminar la ciudad.");
        throw error;
      }
    },
    deleteTeam: async (id) => {
      if (!isApiId(id)) return;
      try {
        await deleteTeamApi(id);
        await refresh();
      } catch (error) {
        Alert.alert("Error", error.message || "No se pudo eliminar el equipo.");
        throw error;
      }
    }
  }), [profile, profiles, currentProfileId, characters, cities, teams]);

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}

function useData() {
  return useContext(DataContext);
}

function Screen({ bg = "dashboard", children, scroll = false }) {
  const body = scroll ? (
    <ScrollView contentContainerStyle={styles.screenContent} showsVerticalScrollIndicator={false}>
      {children}
    </ScrollView>
  ) : (
    <View style={styles.screenContent}>{children}</View>
  );
  return (
    <ImageBackground source={assets.fondos[bg]} resizeMode="cover" style={styles.screen}>
      <View style={styles.tint} />
      {body}
    </ImageBackground>
  );
}

function Header({ navigation, tab, back = false }) {
  const { logout } = useData();
  const [open, setOpen] = useState(false);
  const go = (route) => {
    setOpen(false);
    if (route === "Logout") {
      logout();
      navigation.replace("Welcome");
      return;
    }
    navigation.navigate(route);
  };
  return (
    <>
      <TouchableOpacity style={styles.logoButton} activeOpacity={0.85} onPress={() => back ? navigation.goBack() : setOpen(true)}>
        <Image source={back ? assets.icons.back : assets.logo} style={back ? styles.backIcon : styles.logoImage} />
      </TouchableOpacity>
      {!back && open ? (
        <View style={styles.sidebarLayer}>
          <Pressable style={styles.sidebarShade} onPress={() => setOpen(false)} />
          <View style={styles.sidebar}>
            <TouchableOpacity style={styles.sidebarLogo} onPress={() => setOpen(false)}>
              <Image source={assets.logo} style={styles.logoImage} />
            </TouchableOpacity>
            {[
              ["Dashboard", "Dashboard", assets.sidebar.dashboard],
              ["Profile", "My Profile", assets.sidebar.profile],
              ["Characters", "Characters", assets.sidebar.characters],
              ["Cities", "Cities", assets.sidebar.cities],
              ["Teams", "Teams", assets.sidebar.teams],
              ["Logout", "Logout", assets.icons.delete]
            ].map(([route, label, image]) => (
              <TouchableOpacity key={route} style={[styles.sideOption, tab === route && styles.sideOptionActive]} activeOpacity={0.9} onPress={() => go(route)}>
                <Image source={image} style={styles.sideImage} />
                <View style={styles.sideOverlay} />
                <Text style={styles.sideText}>{label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      ) : null}
    </>
  );
}

function IconButton({ icon, onPress, style }) {
  return (
    <TouchableOpacity style={[styles.iconButton, style]} activeOpacity={0.82} onPress={onPress}>
      <Image source={icon} style={styles.iconImage} />
    </TouchableOpacity>
  );
}

function PageTitle({ title, subtitle }) {
  return (
    <View style={styles.titleWrap}>
      <Text style={styles.pageTitle}>{title}</Text>
      {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
    </View>
  );
}

function WelcomeScreen({ navigation }) {
  return (
    <Screen bg="dashboard">
      <View style={[styles.panel, styles.welcomeCard]}>
        <Image source={assets.logo} style={styles.bigLogo} />
        <Text style={styles.brandTitle}>DC Comics</Text>
        <Text style={styles.copy}>Did you know that DC comes from Detective Comics, the magazine where Batman first appeared?</Text>
      </View>
      <View style={styles.loginActions}>
        <HomeButton title="Login" onPress={() => navigation.navigate("Login")} />
        <HomeButton title="Register" onPress={() => navigation.navigate("Register")} />
      </View>
    </Screen>
  );
}

function AuthScreen({ navigation, mode }) {
  const { openProfile } = useData();
  const isRegister = mode === "register";
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    if (!email || !password || (isRegister && !name)) return Alert.alert("Error", "Completa todos los campos requeridos.");
    if (isRegister && password !== confirm) return Alert.alert("Error", "Las contrasenas no coinciden.");
    setLoading(true);
    let data = null;
    try {
      data = isRegister ? await register({ name, email, password }) : await login({ email, password });
      if (data?.token) setAuthToken(data.token);
    } catch (error) {
      data = { user: { name: name || email.split("@")[0], email } };
    }
    openProfile({
      ...(data?.user || {}),
      username: data?.user?.username || email.split("@")[0] || name,
      name: data?.user?.name || name || email.split("@")[0] || "User",
      email: data?.user?.email || email
    });
    setLoading(false);
    navigation.replace("MainTabs");
  };

  return (
    <Screen bg={isRegister ? "register" : "login"}>
      <Header navigation={navigation} back />
      <View style={[styles.panel, isRegister ? styles.registerPanel : styles.authPanel]}>
        <Image source={assets.logo} style={styles.bigLogo} />
        <Text style={styles.formHeading}>{isRegister ? "Register here" : "Enter your profile"}</Text>
        <View style={isRegister ? styles.registerFields : styles.loginFields}>
          {isRegister ? <Input value={name} onChangeText={setName} placeholder="Name" style={styles.authInput} /> : null}
          <Input value={email} onChangeText={setEmail} placeholder="Email" keyboardType="email-address" style={styles.authInput} />
          <Input value={password} onChangeText={setPassword} placeholder="Password" secureTextEntry style={styles.authInput} />
          {isRegister ? <Input value={confirm} onChangeText={setConfirm} placeholder="Confirm password" secureTextEntry style={styles.authInput} /> : null}
        </View>
      </View>
      <TouchableOpacity style={isRegister ? styles.registerButton : styles.loginButton} activeOpacity={0.85} onPress={submit}>
        <Text style={styles.loginButtonText}>{loading ? "Saving..." : isRegister ? "Register" : "Login"}</Text>
      </TouchableOpacity>
    </Screen>
  );
}

function HomeButton({ title, onPress }) {
  return (
    <TouchableOpacity style={styles.homeButton} activeOpacity={0.85} onPress={onPress}>
      <Text style={styles.homeButtonText}>{title}</Text>
    </TouchableOpacity>
  );
}

function DashboardScreen({ navigation }) {
  return (
    <Screen bg="dashboard" scroll>
      <Header navigation={navigation} tab="Dashboard" />
      <View style={styles.dashboardStack}>
        <Image source={assets.logo} style={styles.dashboardLogo} />
      </View>
      <PageTitle title="Dashboard" subtitle="Welcome to the dashboard" />
      <View style={styles.tileList}>
        <Tile title="Characters" image={assets.sidebar.characters} onPress={() => navigation.navigate("Characters")} />
        <Tile title="Cities" image={assets.sidebar.cities} onPress={() => navigation.navigate("Cities")} />
        <Tile title="Teams" image={assets.sidebar.teams} onPress={() => navigation.navigate("Teams")} />
      </View>
    </Screen>
  );
}

function ProfileScreen({ navigation }) {
  const { profile, setProfile, logout } = useData();
  const [draft, setDraft] = useState(profile);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setDraft(profile);
  }, [profile]);

  const handleUpdate = async () => {
    setSaving(true);
    try {
      await setProfile(draft);
      await delay(1800);
    } catch (error) {
      Alert.alert("Error", error.message || "No se pudo actualizar el perfil.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Screen bg="profile" scroll>
      <Header navigation={navigation} tab="Profile" />
      <View style={styles.profileAvatar}>
        <Text style={styles.profileAvatarText}>{(draft.name || draft.username || draft.email || "U").charAt(0).toUpperCase()}</Text>
      </View>
      <PageTitle title="My Profile" subtitle="Welcome to my profile" />
      <View style={[styles.panel, styles.profileForm]}>
        <Input value={draft.username} onChangeText={(value) => setDraft((current) => ({ ...current, username: value }))} placeholder="Username" style={styles.profileInput} />
        <Input value={draft.name} onChangeText={(value) => setDraft((current) => ({ ...current, name: value }))} placeholder="Name" style={styles.profileInput} />
        <Input value={draft.email} onChangeText={(value) => setDraft((current) => ({ ...current, email: value }))} placeholder="Email" keyboardType="email-address" style={styles.profileInput} />
        <Input value={draft.phone} onChangeText={(value) => setDraft((current) => ({ ...current, phone: value }))} placeholder="Phone" keyboardType="phone-pad" style={styles.profileInput} />
      </View>
      <View style={styles.profileActions}>
        <ActionButton title="Update" dark onPress={handleUpdate} />
        <ActionButton title="Logout" onPress={() => { logout(); navigation.replace("Welcome"); }} />
      </View>
      <SavingOverlay visible={saving} label="Saving profile..." />
    </Screen>
  );
}

function CharactersScreen({ navigation }) {
  const { characters, deleteCharacter } = useData();
  return (
    <Screen bg="characters" scroll>
      <Header navigation={navigation} tab="Characters" />
      <IconButton icon={assets.icons.plus} style={styles.floatingAdd} onPress={() => navigation.navigate("CharacterForm")} />
      <SectionHead title="Characters" icon={assets.icons.characters} />
      <View style={styles.listPanel}>
        {characters.length ? characters.map((character) => {
          const city = findCity(character.city);
          return (
            <ListCard
              key={character.id}
              image={city.image}
              avatar={sourceFrom(character.photo_url, assets.icons.characters)}
              accent={city.color}
              title={character.name || "Character"}
              onDetails={() => navigation.navigate("CharacterDetails", { id: character.id })}
              onEdit={() => navigation.navigate("CharacterForm", { id: character.id })}
              onDelete={() => deleteCharacter(character.id)}
            />
          );
        }) : <Empty text="No characters yet. Add one with the plus button." />}
      </View>
    </Screen>
  );
}

function CharacterDetailsScreen({ navigation, route }) {
  const { characters } = useData();
  const character = characters.find((item) => String(item.id) === String(route.params?.id));
  const city = findCity(character?.city);
  return (
    <Screen bg="characters" scroll>
      <Header navigation={navigation} back />
      {character ? (
        <>
          <View style={styles.heroStrip}>
            <Image source={city.image} style={styles.cover} />
            <Image source={sourceFrom(character.photo_url, assets.icons.characters)} style={[styles.heroAvatar, { borderColor: city.color }]} />
            <Text style={styles.heroName}>{character.name}</Text>
            <Text style={styles.heroRealName}>{character.real_name || ""}</Text>
          </View>
          <DetailPanel
            left={[
              ["Age", character.age || "Unknown"],
              ["Role", character.role || "Unknown"],
              ["Ability", character.ability || "Unknown"],
              ["Alignment", character.alignment || "Unknown"],
              ["Enemy of", character.enemy || "Unknown"],
              ["City", city.name],
              ["Team", character.team || character.group_name || "Unknown"]
            ]}
            history={character.history || "No history registered."}
          />
        </>
      ) : <Empty text="Character not found." />}
    </Screen>
  );
}

function CharacterFormScreen({ navigation, route }) {
  const { characters, cities, saveCharacter, teams } = useData();
  const current = characters.find((item) => String(item.id) === String(route.params?.id));
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    id: current?.id,
    photo: null,
    name: current?.name || "",
    photo_url: current?.photo_url || "",
    real_name: current?.real_name || "",
    age: current?.age?.toString() || "",
    role: current?.role || "",
    ability: current?.ability || "",
    alignment: current?.alignment || "",
    enemy: current?.enemy || "",
    city: current?.city || cities[0]?.name || cityPresets[0].name,
    team: current?.team || current?.group_name || teams[0]?.name || "",
    history: current?.history || ""
  });
  const [showCityPicker, setShowCityPicker] = useState(false);
  const [showTeamPicker, setShowTeamPicker] = useState(false);

  const set = (key, value) => setForm((state) => ({ ...state, [key]: value }));
  const pickImage = async () => {
    const photo = await pickLocalImage("character");
    if (photo?.uri) {
      setForm((state) => ({
        ...state,
        photo_url: photo.uri,
        photo
      }));
    }
  };
  const submit = async () => {
    if (!form.name.trim()) return Alert.alert("Error", "Name is required.");
    setSaving(true);
    try {
      await saveCharacter({ ...form, age: form.age ? Number(form.age) : null, city: form.city || null, team: form.team || null });
      await delay(1800);
      navigation.navigate("Characters");
    } catch (error) {
      Alert.alert("Error", error.message || "No se pudo guardar el personaje.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : undefined}>
      <Screen bg="characters" scroll>
        <Header navigation={navigation} back />
        <Text style={[styles.pageTitle, styles.largeTitle]}>{current ? "Update Character" : "Add Character"}</Text>
        <View style={styles.characterForm}>
          <View style={styles.formTop}>
            <TouchableOpacity style={styles.unknownPhoto} onPress={pickImage} activeOpacity={0.86}>
              {form.photo_url ? <Image source={sourceFrom(form.photo_url, assets.icons.characters)} style={styles.photoPreview} /> : <Text style={styles.questionMark}>?</Text>}
            </TouchableOpacity>
            <View style={styles.formTopFields}>
              <FieldLabel>Name:</FieldLabel>
              <Input value={form.name} onChangeText={(value) => set("name", value)} style={styles.miniInput} />
              <FieldLabel>Real Name:</FieldLabel>
              <Input value={form.real_name} onChangeText={(value) => set("real_name", value)} style={styles.miniInput} />
            </View>
          </View>
          <View style={styles.gridForm}>
            <View style={styles.gridCol}>
              <FieldLabel>Age:</FieldLabel>
              <Input value={form.age} onChangeText={(value) => set("age", value)} keyboardType="numeric" style={styles.smallField} />
              <FieldLabel>Role:</FieldLabel>
              <Input value={form.role} onChangeText={(value) => set("role", value)} style={styles.smallField} />
              <FieldLabel>Ability:</FieldLabel>
              <Input value={form.ability} onChangeText={(value) => set("ability", value)} style={styles.smallField} />
              <FieldLabel>Alignment:</FieldLabel>
              <Input value={form.alignment} onChangeText={(value) => set("alignment", value)} style={styles.smallField} />
              <FieldLabel>Enemy of:</FieldLabel>
              <Input value={form.enemy} onChangeText={(value) => set("enemy", value)} style={styles.smallField} />
              <FieldLabel>City:</FieldLabel>
              <SelectField value={form.city} options={cities.map((city) => city.name)} onSelect={(value) => set("city", value)} />
              <FieldLabel>Team:</FieldLabel>
              <SelectField value={form.team} options={teams.map((team) => team.name)} onSelect={(value) => set("team", value)} />
            </View>
            <View style={styles.gridCol}>
              <FieldLabel>Photo:</FieldLabel>
              <TouchableOpacity style={styles.photoUrlButton} onPress={pickImage} activeOpacity={0.86}>
                <Text style={styles.photoUrlText}>{form.photo_url ? "Photo selected" : "Tap to upload"}</Text>
              </TouchableOpacity>
              <Input value={form.photo_url} onChangeText={(value) => setForm((state) => ({ ...state, photo_url: value, photo: null }))} placeholder="Photo URL" style={styles.smallField} />
              <FieldLabel>History:</FieldLabel>
              <Input value={form.history} onChangeText={(value) => set("history", value)} multiline style={styles.historyTextarea} />
            </View>
          </View>
        </View>
        <ActionButton title={current ? "Update" : "Add"} dark onPress={submit} />
        <SavingOverlay visible={saving} label={current ? "Updating character..." : "Saving character..."} />
      </Screen>
    </KeyboardAvoidingView>
  );
}

function CitiesScreen({ navigation }) {
  const { cities, deleteCity } = useData();
  return (
    <Screen bg="cities" scroll>
      <Header navigation={navigation} tab="Cities" />
      <IconButton icon={assets.icons.plus} style={styles.floatingAdd} onPress={() => navigation.navigate("CityForm")} />
      <SectionHead title="Cities" icon={assets.icons.cities} />
      <View style={styles.listPanel}>
        {cities.map((city) => (
          <ListCard
            key={city.id || city.name}
            image={city.image}
            swatch={city.color}
            title={city.name}
            onDetails={() => navigation.navigate("CityDetails", { id: city.id || city.name })}
            onEdit={() => navigation.navigate("CityForm", { id: city.id || city.name })}
            onDelete={() => deleteCity(city.id || city.name)}
          />
        ))}
      </View>
    </Screen>
  );
}

function CityDetailsScreen({ navigation, route }) {
  const { cities, characters } = useData();
  const city = cities.find((item) => String(item.id) === String(route.params?.id) || normalize(item.name) === normalize(route.params?.id)) || findCity(route.params?.id);
  const selectedNames = parseNameList(city.population_characters);
  const residents = characters.filter((character) => normalize(character.city) === normalize(city.name) || selectedNames.some((name) => normalize(name) === normalize(character.name)));
  return (
    <Screen bg="cities" scroll>
      <Header navigation={navigation} back />
      <IconButton icon={assets.icons.edit} style={styles.floatingEdit} onPress={() => navigation.navigate("CityForm", { id: city.id || city.name })} />
      <View style={[styles.panel, styles.detailsPanel]}>
        <Text style={[styles.pageTitle, { color: city.color, fontSize: 36 }]}>{city.name}</Text>
        <Image source={city.image} style={styles.cityArt} />
        <View style={styles.splitRow}>
          <Info label="Country" value={city.country || "USA"} />
          <Info label="State" value={city.state || "Unknown"} />
        </View>
        <Text style={styles.label}>Population</Text>
        <View style={styles.membersGrid}>
          {residents.length ? residents.map((character) => (
            <Member key={character.id} character={character} accent={city.color} />
          )) : <Empty text="No characters in this city." compact />}
        </View>
        <Text style={styles.total}>Total inhabitants: <Text style={styles.totalValue}>{city.population_count || residents.length}</Text></Text>
      </View>
    </Screen>
  );
}

function CityFormScreen({ navigation, route }) {
  const { cities, characters, saveCity } = useData();
  const current = cities.find((item) => String(item.id) === String(route.params?.id) || normalize(item.name) === normalize(route.params?.id));
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    id: current?.id,
    photo: null,
    photo_url: current?.photo_url || "",
    name: current?.name || cityPresets[0].name,
    country: current?.country || cityPresets[0].country,
    state: current?.state || cityPresets[0].state,
    population_characters: current?.population_characters || "",
    population_count: current?.population_count?.toString() || ""
  });
  const preset = findCity(form.name);
  const selectedCharacters = parseNameList(form.population_characters);
  const cityImage = sourceFrom(form.photo_url, preset.image);
  const set = (key, value) => setForm((state) => ({ ...state, [key]: value }));
  const pickImage = async () => {
    const photo = await pickLocalImage("city");
    if (photo?.uri) {
      setForm((state) => ({ ...state, photo_url: photo.uri, photo }));
    }
  };
  const toggleCharacter = (name) => {
    const exists = selectedCharacters.some((item) => normalize(item) === normalize(name));
    const next = exists ? selectedCharacters.filter((item) => normalize(item) !== normalize(name)) : [...selectedCharacters, name];
    set("population_characters", next.join(", "));
    set("population_count", String(next.length));
  };
  const submit = async () => {
    setSaving(true);
    try {
      await saveCity({ ...form, population_count: Number(form.population_count) || 0 });
      await delay(1800);
      navigation.navigate("Cities");
    } catch (error) {
      Alert.alert("Error", error.message || "No se pudo guardar la ciudad.");
    } finally {
      setSaving(false);
    }
  };
  return (
    <Screen bg="cities" scroll>
      <Header navigation={navigation} back />
      <PageTitle title="City" subtitle={preset.name} />
      <View style={styles.cityFormCard}>
        <Image source={cityImage} style={StyleSheet.absoluteFillObject} />
        <View style={styles.formShade} />
        <View style={styles.formStack}>
          <TouchableOpacity style={styles.uploadBanner} onPress={pickImage} activeOpacity={0.86}>
            <Image source={cityImage} style={styles.uploadBannerImage} />
            <View style={styles.uploadBannerShade} />
            <Text style={styles.uploadBannerText}>{form.photo_url ? "Change image" : "Upload image"}</Text>
          </TouchableOpacity>
          <FieldLabel>Name:</FieldLabel>
          <Input value={form.name} onChangeText={(value) => {
            const next = findCity(value);
            setForm({ ...form, name: value, country: next.country, state: next.state, photo_url: form.photo ? form.photo_url : next.photo_url });
          }} placeholder="Name" />
          <FieldLabel>Country:</FieldLabel>
          <Input value={form.country} onChangeText={(value) => set("country", value)} placeholder="Country" />
          <FieldLabel>State:</FieldLabel>
          <Input value={form.state} onChangeText={(value) => set("state", value)} placeholder="State" />
          <FieldLabel>Population characters:</FieldLabel>
          <View style={styles.photoChoiceGrid}>
            {characters.length ? characters.map((character) => {
              const selected = selectedCharacters.some((name) => normalize(name) === normalize(character.name));
              return (
                <TouchableOpacity key={character.id || character.name} style={[styles.photoChoice, selected && styles.photoChoiceSelected]} activeOpacity={0.86} onPress={() => toggleCharacter(character.name)}>
                  <Image source={sourceFrom(character.photo_url, assets.icons.characters)} style={styles.photoChoiceImage} />
                  <Text style={styles.photoChoiceText} numberOfLines={2}>{character.name}</Text>
                </TouchableOpacity>
              );
            }) : <Empty text="No characters yet." compact />}
          </View>
          <FieldLabel>Population count:</FieldLabel>
          <Input value={form.population_count} onChangeText={(value) => set("population_count", value)} placeholder="Population count" keyboardType="numeric" />
        </View>
        <ActionButton title="Save" dark onPress={submit} />
        <SavingOverlay visible={saving} label={current ? "Updating city..." : "Saving city..."} />
      </View>
    </Screen>
  );
}

function TeamsScreen({ navigation }) {
  const { teams, deleteTeam } = useData();
  return (
    <Screen bg="teams" scroll>
      <Header navigation={navigation} tab="Teams" />
      <IconButton icon={assets.icons.plus} style={styles.floatingAdd} onPress={() => navigation.navigate("TeamForm")} />
      <SectionHead title="Teams" icon={assets.icons.teams} />
      <View style={styles.listPanel}>
        {teams.map((team) => (
          <ListCard
            key={team.id}
            image={team.image}
            title={team.name}
            onDetails={() => navigation.navigate("TeamDetails", { id: team.id })}
            onEdit={() => navigation.navigate("TeamForm", { id: team.id })}
            onDelete={() => deleteTeam(team.id)}
          />
        ))}
      </View>
    </Screen>
  );
}

function TeamDetailsScreen({ navigation, route }) {
  const { teams, characters } = useData();
  const team = teams.find((item) => String(item.id) === String(route.params?.id)) || teams[0];
  const memberNames = parseMembers(team?.members);
  const members = characters.filter((character) => normalize(character.team || character.group_name) === normalize(team?.name) || memberNames.some((name) => normalize(name) === normalize(character.name)));
  return (
    <Screen bg="teams" scroll>
      <Header navigation={navigation} back />
      <View style={[styles.panel, styles.detailsPanel]}>
        <Text style={[styles.pageTitle, { fontSize: 36 }]}>{team?.name}</Text>
        <Image source={team?.image || assets.teams.gotham} style={styles.teamBanner} />
        <View style={styles.splitRow}>
          <Info label="Type" value={team?.type || "Unknown"} />
          <Info label="Headquarters" value={team?.headquarters || "Unknown"} />
        </View>
        <Text style={styles.label}>Members</Text>
        <View style={styles.membersGrid}>
          {members.length ? members.map((character) => <Member key={character.id} character={character} />) : [1, 2, 3, 4, 5, 6].map((item) => <EmptySlot key={item} label={item} />)}
        </View>
        <Text style={styles.total}>Total Members: <Text style={styles.totalValue}>{members.length}</Text></Text>
      </View>
    </Screen>
  );
}

function TeamFormScreen({ navigation, route }) {
  const { teams, characters, saveTeam } = useData();
  const current = teams.find((item) => String(item.id) === String(route.params?.id));
  const defaultTeam = current || teamPresets[0];
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    id: defaultTeam?.id,
    image: null,
    image_url: defaultTeam?.image_url || "",
    name: defaultTeam?.name || "",
    type: defaultTeam?.type || "",
    headquarters: defaultTeam?.headquarters || "",
    members: parseMembers(defaultTeam?.members).join(", ")
  });
  const set = (key, value) => setForm((state) => ({ ...state, [key]: value }));
  const setTeamName = (value) => {
    const preset = findTeam(value);
    setForm((state) => ({
      ...state,
      name: value,
      image_url: state.image ? state.image_url : preset.image_url,
      type: preset.type,
      headquarters: preset.headquarters
    }));
  };
  const pickImage = async () => {
    const image = await pickLocalImage("team");
    if (image?.uri) {
      setForm((state) => ({ ...state, image_url: image.uri, image }));
    }
  };
  const submit = async () => {
    if (!form.name.trim()) return Alert.alert("Error", "Name is required.");
    setSaving(true);
    try {
      await saveTeam(form);
      await delay(1800);
      navigation.navigate("Teams");
    } catch (error) {
      Alert.alert("Error", error.message || "No se pudo guardar el equipo.");
    } finally {
      setSaving(false);
    }
  };
  return (
    <Screen bg="teams" scroll>
      <Header navigation={navigation} back />
      <PageTitle title={current ? "Edit Team" : "Add Team"} />
      <View style={[styles.panel, styles.formPanel]}>
        <TouchableOpacity style={styles.uploadBanner} onPress={pickImage} activeOpacity={0.86}>
          <Image source={sourceFrom(form.image_url, defaultTeam?.image || assets.teams.gotham)} style={styles.uploadBannerImage} />
          <View style={styles.uploadBannerShade} />
          <Text style={styles.uploadBannerText}>{form.image_url ? "Change image" : "Upload image"}</Text>
        </TouchableOpacity>
        <FieldLabel>Name:</FieldLabel>
        <Input value={form.name} onChangeText={setTeamName} placeholder="Name" />
        <FieldLabel>Image URL:</FieldLabel>
        <Input value={form.image_url} onChangeText={(value) => setForm((state) => ({ ...state, image_url: value, image: null }))} placeholder="Image URL" />
        <FieldLabel>Type:</FieldLabel>
        <Input value={form.type} onChangeText={(value) => set("type", value)} placeholder="Type" />
        <FieldLabel>Headquarters:</FieldLabel>
        <Input value={form.headquarters} onChangeText={(value) => set("headquarters", value)} placeholder="Headquarters" />
        <FieldLabel>Members:</FieldLabel>
        <Input value={form.members} onChangeText={(value) => set("members", value)} placeholder="Members separated by comma" multiline style={styles.textarea} />
        <View style={styles.chipsRow}>
          {characters.slice(0, 3).map((character) => <Image key={character.id} source={sourceFrom(character.photo_url, assets.icons.characters)} style={styles.chip} />)}
          {!characters.length ? [1, 2, 3].map((item) => <Image key={item} source={assets.icons.characters} style={styles.chip} />) : null}
        </View>
        <ActionButton title="Save" dark onPress={submit} />
        <SavingOverlay visible={saving} label={current ? "Updating team..." : "Saving team..."} />
      </View>
    </Screen>
  );
}

function SavingOverlay({ visible, label }) {
  if (!visible) return null;
  return (
    <View style={styles.savingOverlay} pointerEvents="box-none">
      <View style={styles.savingCard}>
        <ActivityIndicator size="large" color="#0785ff" />
        <Text style={styles.savingText}>{label}</Text>
      </View>
    </View>
  );
}

function SelectField({ value, options, onSelect }) {
  const [visible, setVisible] = useState(false);
  return (
    <>
      <Pressable style={styles.selectField} onPress={() => setVisible(true)}>
        <Text style={styles.selectFieldText}>{value || "Select an option"}</Text>
      </Pressable>
      <Modal transparent animationType="fade" visible={visible} onRequestClose={() => setVisible(false)}>
        <Pressable style={styles.selectOverlay} onPress={() => setVisible(false)}>
          <View style={styles.selectSheet}>
            <Text style={styles.selectTitle}>Choose an option</Text>
            <ScrollView style={styles.selectList} contentContainerStyle={styles.selectListContent}>
              {options.map((option) => (
                <TouchableOpacity key={option} style={styles.selectOption} activeOpacity={0.85} onPress={() => { onSelect(option); setVisible(false); }}>
                  <Text style={styles.selectOptionText}>{option}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </Pressable>
      </Modal>
    </>
  );
}

function ActionButton({ title, onPress, dark = false }) {
  return (
    <TouchableOpacity style={[styles.actionButton, dark && styles.actionDark]} activeOpacity={0.85} onPress={onPress}>
      <Text style={[styles.actionText, dark && styles.actionTextDark]}>{title}</Text>
    </TouchableOpacity>
  );
}

function Input(props) {
  const { style, multiline, ...rest } = props;
  return <TextInput placeholderTextColor="#08213d" {...rest} multiline={multiline} style={[styles.input, multiline && styles.inputMultiline, style]} />;
}

function FieldLabel({ children }) {
  return <Text style={styles.fieldLabel}>{children}</Text>;
}

function Tile({ title, image, onPress }) {
  return (
    <TouchableOpacity style={styles.tile} activeOpacity={0.86} onPress={onPress}>
      <ImageBackground source={image} resizeMode="cover" style={styles.tileImage}>
        <View style={styles.tileShade} />
        <Text style={styles.tileText}>{title}</Text>
      </ImageBackground>
    </TouchableOpacity>
  );
}

function SectionHead({ title, icon }) {
  return (
    <View style={styles.sectionHead}>
      <Image source={icon} style={styles.sectionIcon} />
      <Text style={styles.pageTitle}>{title}</Text>
    </View>
  );
}

function ListCard({ image, avatar, swatch, title, onDetails, onEdit, onDelete }) {
  return (
    <View style={styles.listCard}>
      <Image source={image} style={styles.cover} />
      <View style={styles.cardGradient} />
      {avatar ? <Image source={avatar} style={[styles.listAvatar, { borderColor: swatch || "#8f5dff" }]} /> : null}
      {swatch && !avatar ? <View style={[styles.citySwatch, { backgroundColor: swatch }]} /> : null}
      <Text style={[styles.listName, !avatar && !swatch && { left: 30 }]} numberOfLines={1}>{title}</Text>
      <View style={styles.cardTools}>
        <IconButton icon={assets.icons.details} onPress={onDetails} />
        {onEdit ? <IconButton icon={assets.icons.edit} onPress={onEdit} /> : null}
        {onDelete ? <IconButton icon={assets.icons.delete} onPress={onDelete} /> : null}
      </View>
    </View>
  );
}

function DetailPanel({ left, history }) {
  return (
    <View style={[styles.panel, styles.detailCard]}>
      <View style={styles.splitRow}>
        <View style={styles.detailColumn}>
          {left.map(([label, value]) => <Info key={label} label={label} value={value} />)}
        </View>
        <View style={styles.detailColumn}>
          <Text style={styles.infoLabel}>History</Text>
          <Text style={styles.history}>{history}</Text>
        </View>
      </View>
    </View>
  );
}

function Info({ label, value }) {
  return (
    <View style={styles.infoBlock}>
      <Text style={styles.infoLabel}>{label}:</Text>
      <Text style={styles.infoValue}>{value}</Text>
    </View>
  );
}

function Member({ character, accent = "#0785ff" }) {
  return (
    <View style={styles.member}>
      <Image source={sourceFrom(character.photo_url, assets.icons.characters)} style={[styles.memberImage, { borderColor: accent }]} />
      <Text style={styles.memberName} numberOfLines={2}>{character.name}</Text>
    </View>
  );
}

function EmptySlot({ label }) {
  return (
    <View style={styles.member}>
      <View style={styles.emptySlot}><Text style={styles.emptySlotText}>{label}</Text></View>
      <Text style={styles.memberName}>Empty slot</Text>
    </View>
  );
}

function Empty({ text, compact = false }) {
  return <Text style={[styles.empty, compact && { width: 300 }]}>{text}</Text>;
}

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#ffffff",
        tabBarInactiveTintColor: "#c7d8eb",
        tabBarIconStyle: { display: "none" },
        tabBarItemStyle: styles.tabItem,
        tabBarLabelStyle: styles.tabLabel,
        tabBarStyle: styles.tabBar
      }}
    >
      <Tab.Screen name="Dashboard" component={DashboardScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} options={{ title: "My profile" }} />
      <Tab.Screen name="Characters" component={CharactersScreen} />
      <Tab.Screen name="Cities" component={CitiesScreen} />
      <Tab.Screen name="Teams" component={TeamsScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  const [fontsLoaded] = useFonts({
    DcTitle: require("./assets/dc/Fuentes/gotham/Gotham.ttf"),
    DcText: require("./assets/dc/Fuentes/gotham/gotham_nights/Gotham Nights Bold Italic.otf")
  });

  if (!fontsLoaded) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator color="#0785ff" />
      </View>
    );
  }

  return (
    <DataProvider>
      <NavigationContainer>
        <StatusBar style="light" />
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Welcome" component={WelcomeScreen} />
          <Stack.Screen name="Login">{(props) => <AuthScreen {...props} mode="login" />}</Stack.Screen>
          <Stack.Screen name="Register">{(props) => <AuthScreen {...props} mode="register" />}</Stack.Screen>
          <Stack.Screen name="MainTabs" component={MainTabs} />
          <Stack.Screen name="CharacterForm" component={CharacterFormScreen} />
          <Stack.Screen name="CharacterDetails" component={CharacterDetailsScreen} />
          <Stack.Screen name="CityForm" component={CityFormScreen} />
          <Stack.Screen name="CityDetails" component={CityDetailsScreen} />
          <Stack.Screen name="TeamForm" component={TeamFormScreen} />
          <Stack.Screen name="TeamDetails" component={TeamDetailsScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </DataProvider>
  );
}

const styles = StyleSheet.create({
  loader: { flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: "#06111d" },
  screen: { flex: 1, backgroundColor: "#06111d" },
  tint: { ...StyleSheet.absoluteFillObject, backgroundColor: "rgba(4, 12, 20, 0.22)" },
  screenContent: { flexGrow: 1, alignItems: "center", paddingHorizontal: 24, paddingTop: 60, paddingBottom: 118 },
  logoButton: { position: "absolute", zIndex: 30, top: 8, left: 7, width: 48, height: 48, alignItems: "center", justifyContent: "center" },
  logoImage: { width: "100%", height: "100%", resizeMode: "contain" },
  backIcon: { width: 28, height: 28, resizeMode: "contain" },
  bigLogo: { width: 166, height: 166, resizeMode: "contain", marginBottom: 10 },
  panel: { width: "100%", maxWidth: 364, alignItems: "center", borderRadius: 18, padding: 24, backgroundColor: "rgba(4, 33, 59, 0.82)", borderWidth: 1, borderColor: "rgba(255,255,255,0.12)" },
  welcomeCard: { width: 316, minHeight: 444, marginTop: 23, paddingTop: 17, paddingHorizontal: 20, paddingBottom: 28, borderRadius: 10 },
  brandTitle: { color: "#0785ff", fontFamily: "DcTitle", fontSize: 42, textTransform: "uppercase", textAlign: "center" },
  copy: { width: 274, marginTop: 38, color: "#ffffff", fontFamily: "DcText", fontSize: 24, lineHeight: 33, textTransform: "uppercase", textAlign: "center", transform: [{ scaleX: 0.82 }] },
  loginActions: { width: 284, flexDirection: "row", justifyContent: "space-between", gap: 54, marginTop: 70 },
  homeButton: { width: 116, height: 65, alignItems: "center", justifyContent: "center", borderRadius: 10, backgroundColor: "rgba(224,238,250,0.94)", shadowColor: "#000c1a", shadowOpacity: 0.32, shadowRadius: 8, shadowOffset: { width: 0, height: 4 }, elevation: 4 },
  homeButtonText: { color: "#0785ff", fontFamily: "DcText", fontSize: 29, textTransform: "uppercase", textAlign: "center", transform: [{ scaleX: 0.88 }] },
  actionButton: { minWidth: 76, minHeight: 44, alignItems: "center", justifyContent: "center", borderRadius: 10, paddingHorizontal: 16, backgroundColor: "#e6eef6" },
  actionDark: { backgroundColor: "#0785ff" },
  actionText: { color: "#0785ff", fontFamily: "DcText", fontSize: 16, textTransform: "uppercase", textAlign: "center" },
  actionTextDark: { color: "#ffffff" },
  authPanel: { width: 316, minHeight: 420, marginTop: 20, paddingTop: 19, paddingHorizontal: 24, paddingBottom: 34, borderRadius: 10 },
  registerPanel: { width: 316, minHeight: 510, marginTop: 20, paddingTop: 19, paddingHorizontal: 24, paddingBottom: 24, borderRadius: 10 },
  formHeading: { marginTop: 12, color: "#0785ff", fontFamily: "DcText", fontSize: 23, lineHeight: 25, textTransform: "uppercase", textAlign: "center", transform: [{ scaleX: 0.84 }] },
  loginFields: { width: "100%", marginTop: 26, gap: 48 },
  registerFields: { width: "100%", marginTop: 25, gap: 31 },
  input: { width: "100%", minHeight: 46, borderRadius: 24, paddingHorizontal: 16, paddingVertical: 10, color: "#08213d", backgroundColor: "rgba(235,235,235,0.82)", fontFamily: "DcText", fontSize: 20, textAlign: "left", marginBottom: 12 },
  inputMultiline: { minHeight: 96, textAlignVertical: "top", paddingTop: 12, paddingBottom: 12 },
  authInput: { height: 48, minHeight: 48, marginBottom: 0, borderRadius: 9, color: "#111111", backgroundColor: "rgba(246,242,244,0.95)", fontSize: 20, textAlign: "left" },
  loginButton: { width: 118, height: 65, marginTop: 78, alignItems: "center", justifyContent: "center", borderRadius: 10, backgroundColor: "rgba(224,238,250,0.94)", shadowColor: "#000c1a", shadowOpacity: 0.32, shadowRadius: 8, shadowOffset: { width: 0, height: 4 }, elevation: 4 },
  registerButton: { width: 132, height: 65, marginTop: 29, alignItems: "center", justifyContent: "center", borderRadius: 10, backgroundColor: "rgba(4,33,59,0.9)", shadowColor: "#000c1a", shadowOpacity: 0.32, shadowRadius: 8, shadowOffset: { width: 0, height: 4 }, elevation: 4 },
  loginButtonText: { color: "#0785ff", fontFamily: "DcText", fontSize: 29, textTransform: "uppercase", textAlign: "center", transform: [{ scaleX: 0.88 }] },
  textarea: { minHeight: 112, borderRadius: 10, paddingTop: 10, textAlignVertical: "top", textAlign: "left" },
  titleWrap: { width: "100%", alignItems: "center" },
  pageTitle: { color: "#ffffff", fontFamily: "DcTitle", fontSize: 42, lineHeight: 48, textAlign: "center", textTransform: "uppercase", textShadowColor: "rgba(0,0,0,0.75)", textShadowOffset: { width: 0, height: 3 }, textShadowRadius: 5 },
  largeTitle: { marginTop: 14, fontSize: 44, lineHeight: 50 },
  subtitle: { marginTop: 12, color: "#ffffff", fontFamily: "DcText", fontSize: 24, lineHeight: 28, textAlign: "center", textTransform: "uppercase", transform: [{ scaleX: 0.82 }] },
  dashboardStack: { width: "100%", alignItems: "center", marginTop: 24, marginBottom: 22 },
  dashboardLogo: { width: 140, height: 140, resizeMode: "contain" },
  tileList: { width: "100%", maxWidth: 360, gap: 24, marginTop: 46 },
  tile: { width: "100%", height: 96, overflow: "hidden", borderRadius: 18, backgroundColor: "#08213d" },
  tileImage: { flex: 1, alignItems: "center", justifyContent: "center" },
  tileShade: { ...StyleSheet.absoluteFillObject, backgroundColor: "rgba(4,33,59,0.22)" },
  tileText: { color: "#ffffff", fontFamily: "DcTitle", fontSize: 30, textTransform: "uppercase", textShadowColor: "#08213d", textShadowOffset: { width: 2, height: 2 }, textShadowRadius: 1 },
  sidebarLayer: { ...StyleSheet.absoluteFillObject, zIndex: 35 },
  sidebarShade: { ...StyleSheet.absoluteFillObject, backgroundColor: "rgba(4,33,59,0.46)" },
  sidebar: { position: "absolute", left: 0, top: 0, bottom: 0, width: 297, paddingTop: 101, paddingHorizontal: 13, backgroundColor: "rgba(4,33,59,0.95)", gap: 28 },
  sidebarLogo: { position: "absolute", top: 8, right: 11, width: 48, height: 48 },
  sideOption: { width: 270, height: 96, overflow: "hidden", borderRadius: 18, backgroundColor: "#08213d" },
  sideOptionActive: { borderWidth: 2, borderColor: "#0785ff" },
  sideImage: { width: "100%", height: "100%", resizeMode: "cover" },
  sideOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: "rgba(4,33,59,0.18)" },
  sideText: { position: "absolute", inset: 0, color: "#ffffff", fontFamily: "DcTitle", fontSize: 29, textAlign: "center", textAlignVertical: "center", textTransform: "uppercase", textShadowColor: "#08213d", textShadowOffset: { width: 2, height: 2 }, textShadowRadius: 1 },
  profileAvatar: { width: 130, height: 130, marginTop: 0, marginBottom: 14, borderWidth: 4, borderColor: "#ffffff", borderRadius: 65, alignItems: "center", justifyContent: "center", backgroundColor: "rgba(7,133,255,0.2)" },
  profileAvatarText: { color: "#ffffff", fontFamily: "DcTitle", fontSize: 54, textTransform: "uppercase" },
  profileForm: { width: 364, marginTop: 21, paddingTop: 23, paddingHorizontal: 10, paddingBottom: 28, borderRadius: 18 },
  profileInput: { marginBottom: 35, textAlign: "left" },
  profileActions: { width: "100%", maxWidth: 320, flexDirection: "row", justifyContent: "center", gap: 12, marginTop: 12 },
  floatingAdd: { position: "absolute", top: 171, right: 54, zIndex: 10 },
  floatingEdit: { position: "absolute", top: 130, right: 34, zIndex: 10, backgroundColor: "#dce6ef" },
  iconButton: { width: 28, height: 28, alignItems: "center", justifyContent: "center", borderRadius: 14, borderWidth: 2, borderColor: "#0785ff", backgroundColor: "#dce6ef" },
  iconImage: { width: 17, height: 17, resizeMode: "contain" },
  sectionHead: { width: "100%", alignItems: "center", paddingTop: 64 },
  sectionIcon: { width: 118, height: 118, resizeMode: "contain", marginBottom: 16 },
  listPanel: { width: "100%", maxWidth: 364, marginTop: 22, padding: 10, borderRadius: 18, backgroundColor: "rgba(4,33,59,0.76)", gap: 18 },
  listCard: { position: "relative", width: "100%", height: 66, overflow: "hidden", borderRadius: 33, backgroundColor: "#08213d" },
  cover: { width: "100%", height: "100%", resizeMode: "cover" },
  cardGradient: { ...StyleSheet.absoluteFillObject, backgroundColor: "rgba(4,33,59,0.32)" },
  listAvatar: { position: "absolute", top: 6, left: 11, width: 53, height: 53, borderWidth: 3, borderRadius: 27, resizeMode: "cover", backgroundColor: "#08213d" },
  citySwatch: { position: "absolute", top: 17, left: 17, width: 32, height: 32, borderWidth: 3, borderColor: "#08213d", borderRadius: 16 },
  listName: { position: "absolute", left: 79, right: 94, top: 22, color: "#ffffff", fontFamily: "DcText", fontSize: 15, textTransform: "uppercase", textShadowColor: "#08213d", textShadowOffset: { width: 1, height: 1 }, textShadowRadius: 1 },
  cardTools: { position: "absolute", top: 19, right: 12, flexDirection: "row", gap: 5 },
  empty: { padding: 18, color: "#ffffff", fontFamily: "DcText", fontSize: 17, lineHeight: 24, textAlign: "center", textTransform: "uppercase" },
  heroStrip: { width: "100%", maxWidth: 344, height: 102, marginTop: 28, overflow: "hidden", borderRadius: 18, backgroundColor: "#08213d" },
  heroAvatar: { position: "absolute", left: 12, top: 15, width: 72, height: 72, borderRadius: 36, borderWidth: 3, resizeMode: "cover" },
  heroName: { position: "absolute", top: 24, left: 104, right: 12, color: "#ffffff", fontFamily: "DcText", fontSize: 26, textTransform: "uppercase", textShadowColor: "#08213d", textShadowOffset: { width: 2, height: 2 }, textShadowRadius: 1 },
  heroRealName: { position: "absolute", top: 58, left: 108, right: 12, color: "#ffffff", fontFamily: "DcText", fontSize: 13, textTransform: "uppercase" },
  detailCard: { marginTop: 18, alignItems: "stretch" },
  splitRow: { width: "100%", flexDirection: "row", gap: 14, justifyContent: "space-between" },
  detailColumn: { flex: 1 },
  infoBlock: { marginBottom: 8 },
  infoLabel: { color: "#ffffff", fontFamily: "DcText", fontSize: 23, lineHeight: 26, textTransform: "uppercase" },
  infoValue: { color: "#49a8ff", fontFamily: "DcText", fontSize: 17, lineHeight: 21, textTransform: "uppercase" },
  history: { color: "#49a8ff", fontFamily: "DcText", fontSize: 13, lineHeight: 19, textTransform: "uppercase" },
  characterForm: { width: 364, marginTop: 24, paddingTop: 18, paddingHorizontal: 14, paddingBottom: 24, borderRadius: 18, backgroundColor: "rgba(4,33,59,0.78)" },
  formTop: { width: "100%", minHeight: 118, flexDirection: "row", gap: 18, alignItems: "center", padding: 8, borderRadius: 18, backgroundColor: "rgba(235,235,235,0.62)" },
  formTopFields: { flex: 1 },
  unknownPhoto: { width: 86, height: 86, alignItems: "center", justifyContent: "center", borderWidth: 4, borderColor: "#000000", borderRadius: 43, backgroundColor: "#ffffff", overflow: "hidden" },
  questionMark: { width: 40, height: 40, color: "#ffffff", backgroundColor: "#19212b", borderRadius: 20, fontFamily: "DcText", fontSize: 30, lineHeight: 40, textAlign: "center" },
  photoPreview: { width: "100%", height: "100%", resizeMode: "cover" },
  gridForm: { flexDirection: "row", gap: 18, marginTop: 24 },
  gridCol: { flex: 1 },
  fieldLabel: { marginTop: 8, marginBottom: 6, color: "#ffffff", fontFamily: "DcText", fontSize: 24, lineHeight: 26, textAlign: "left", textTransform: "uppercase" },
  miniInput: { height: 40, minHeight: 40, marginBottom: 6, borderRadius: 14, fontSize: 15, textAlign: "left", paddingHorizontal: 12, paddingVertical: 8 },
  smallField: { height: 40, minHeight: 40, marginBottom: 12, borderRadius: 14, fontSize: 15, textAlign: "left", paddingHorizontal: 12, paddingVertical: 8 },
  selectField: { width: "100%", minHeight: 28, marginBottom: 12, paddingHorizontal: 10, paddingVertical: 8, borderRadius: 14, backgroundColor: "rgba(235,235,235,0.82)", justifyContent: "center" },
  selectFieldText: { color: "#08213d", fontFamily: "DcText", fontSize: 14, textTransform: "uppercase" },
  selectOverlay: { flex: 1, justifyContent: "center", backgroundColor: "rgba(4,33,59,0.66)", padding: 24 },
  selectSheet: { maxHeight: 360, borderRadius: 18, backgroundColor: "#f3f7fb", padding: 16 },
  selectTitle: { color: "#08213d", fontFamily: "DcText", fontSize: 18, marginBottom: 12, textTransform: "uppercase" },
  selectList: { maxHeight: 260 },
  selectListContent: { gap: 8 },
  selectOption: { paddingVertical: 10, paddingHorizontal: 12, borderRadius: 10, backgroundColor: "#eaf2fb" },
  selectOptionText: { color: "#08213d", fontFamily: "DcText", fontSize: 15, textTransform: "uppercase" },
  photoUrlButton: { height: 28, alignItems: "center", justifyContent: "center", marginBottom: 12, borderRadius: 14, backgroundColor: "rgba(235,235,235,0.82)" },
  photoUrlText: { color: "#08213d", fontFamily: "DcText", fontSize: 12, textTransform: "uppercase" },
  formStack: { width: "100%", gap: 4, zIndex: 2 },
  savingOverlay: { ...StyleSheet.absoluteFillObject, alignItems: "center", justifyContent: "center", backgroundColor: "rgba(4,33,59,0.7)", zIndex: 50 },
  savingCard: { width: 220, paddingVertical: 24, paddingHorizontal: 18, borderRadius: 18, backgroundColor: "rgba(255,255,255,0.95)", alignItems: "center", gap: 10 },
  savingText: { color: "#08213d", fontFamily: "DcText", fontSize: 16, textTransform: "uppercase", textAlign: "center" },
  historyTextarea: { height: 126, minHeight: 126, borderRadius: 10, paddingTop: 12, paddingHorizontal: 12, textAlignVertical: "top", textAlign: "left", fontSize: 15 },
  detailsPanel: { marginTop: 80, minHeight: 560 },
  cityArt: { width: "100%", height: 210, marginTop: 14, marginBottom: 12, borderWidth: 4, borderColor: "#08213d", borderRadius: 18, resizeMode: "cover" },
  label: { marginTop: 18, marginBottom: 12, color: "#ffffff", fontFamily: "DcText", fontSize: 28, textTransform: "uppercase", textAlign: "center" },
  membersGrid: { width: "100%", flexDirection: "row", flexWrap: "wrap", justifyContent: "center", gap: 14 },
  member: { width: 82, alignItems: "center", marginBottom: 8 },
  memberImage: { width: 55, height: 55, borderRadius: 28, borderWidth: 3, resizeMode: "cover", backgroundColor: "#08213d" },
  memberName: { marginTop: 6, color: "#ffffff", fontFamily: "DcText", fontSize: 11, lineHeight: 14, textAlign: "center", textTransform: "uppercase" },
  total: { marginTop: 20, color: "#ffffff", fontFamily: "DcText", fontSize: 15, textAlign: "center", textTransform: "uppercase" },
  totalValue: { color: "#49a8ff" },
  cityFormCard: { position: "relative", width: "100%", maxWidth: 356, minHeight: 532, marginTop: 20, padding: 28, overflow: "hidden", borderWidth: 4, borderColor: "#08213d", borderRadius: 18, justifyContent: "center" },
  formShade: { ...StyleSheet.absoluteFillObject, backgroundColor: "rgba(4,33,59,0.46)" },
  uploadBanner: { width: "100%", height: 104, marginBottom: 12, overflow: "hidden", borderRadius: 18, borderWidth: 3, borderColor: "#0785ff", backgroundColor: "#08213d", alignItems: "center", justifyContent: "center" },
  uploadBannerImage: { width: "100%", height: "100%", resizeMode: "cover" },
  uploadBannerShade: { ...StyleSheet.absoluteFillObject, backgroundColor: "rgba(4,33,59,0.28)" },
  uploadBannerText: { position: "absolute", color: "#ffffff", fontFamily: "DcText", fontSize: 18, textAlign: "center", textTransform: "uppercase", textShadowColor: "#08213d", textShadowOffset: { width: 1, height: 1 }, textShadowRadius: 1 },
  teamBanner: { width: "100%", height: 132, marginTop: 14, marginBottom: 14, borderRadius: 18, resizeMode: "cover" },
  formPanel: { marginTop: 24, gap: 8 },
  photoChoiceGrid: { width: "100%", maxHeight: 184, flexDirection: "row", flexWrap: "wrap", justifyContent: "center", gap: 10, marginBottom: 12, paddingVertical: 6 },
  photoChoice: { width: 76, minHeight: 92, alignItems: "center", padding: 5, borderRadius: 12, borderWidth: 2, borderColor: "rgba(255,255,255,0.32)", backgroundColor: "rgba(235,235,235,0.72)" },
  photoChoiceSelected: { borderColor: "#0785ff", backgroundColor: "rgba(7,133,255,0.78)" },
  photoChoiceImage: { width: 48, height: 48, borderRadius: 24, resizeMode: "cover", backgroundColor: "#08213d" },
  photoChoiceText: { marginTop: 5, color: "#08213d", fontFamily: "DcText", fontSize: 10, lineHeight: 12, textAlign: "center", textTransform: "uppercase" },
  chipsRow: { width: "100%", height: 66, flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 17, marginVertical: 10, borderRadius: 31, backgroundColor: "rgba(235,235,235,0.76)" },
  chip: { width: 55, height: 55, borderRadius: 28, borderWidth: 3, borderColor: "#0785ff", resizeMode: "cover" },
  emptySlot: { width: 55, height: 55, alignItems: "center", justifyContent: "center", borderRadius: 28, borderWidth: 3, borderColor: "#0785ff", backgroundColor: "rgba(235,235,235,0.78)" },
  emptySlotText: { color: "#08213d", fontFamily: "DcText", fontSize: 20 },
  tabBar: { height: 89, paddingTop: 16, paddingBottom: 17, paddingHorizontal: 5, backgroundColor: "rgba(4,33,59,0.96)", borderTopWidth: 0 },
  tabItem: { height: 43, marginHorizontal: 2, borderRadius: 9, backgroundColor: "rgba(2,11,22,0.94)" },
  tabLabel: { fontFamily: "DcText", fontSize: 15, lineHeight: 17, textTransform: "uppercase", textAlign: "center" }
});
