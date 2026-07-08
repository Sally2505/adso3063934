import Constants from "expo-constants";
import { Platform } from "react-native";

const resolveApiHosts = () => {
  const candidates = [];
  const debuggerHost = Constants.expoConfig?.hostUri || Constants.manifest?.debuggerHost || Constants.manifest2?.extra?.expoGo?.debuggerHost;
  if (typeof debuggerHost === "string" && debuggerHost) {
    candidates.push(debuggerHost.split(":")[0]);
  }

  if (Platform.OS === "android") {
    candidates.push("10.0.2.2", "192.168.1.16", "localhost");
  } else if (Platform.OS === "ios") {
    candidates.push("localhost", "127.0.0.1", "192.168.1.16");
  } else {
    candidates.push("localhost", "127.0.0.1", "192.168.1.16");
  }

  return Array.from(new Set(candidates.filter(Boolean)));
};

const API_HOSTS = resolveApiHosts();
let apiBaseUrl = null;
let authToken = null;

const defaultHeaders = () => {
  const headers = { "Content-Type": "application/json" };
  if (authToken) headers.Authorization = `Bearer ${authToken}`;
  return headers;
};

const requestJson = async (path, options = {}) => {
  const { method = "GET", headers = {}, body, ...rest } = options;
  const requestHeaders = { ...defaultHeaders(), ...headers };
  if (typeof FormData !== "undefined" && body instanceof FormData) {
    delete requestHeaders["Content-Type"];
  }

  const attempts = apiBaseUrl ? [apiBaseUrl, ...API_HOSTS.filter((item) => item !== apiBaseUrl)] : API_HOSTS;
  let lastError = null;

  for (const host of attempts) {
    try {
      const response = await fetch(`http://${host}:3000/api${path}`, {
        method,
        headers: requestHeaders,
        body,
        ...rest
      });
      const payload = await response.json().catch(() => ({}));
      if (!response.ok) {
        const error = payload.error || payload.message || "Server error";
        throw new Error(error);
      }
      apiBaseUrl = `http://${host}:3000/api`;
      return payload;
    } catch (error) {
      lastError = error;
      if (error?.message && !error.message.includes("Network request failed") && !error.message.includes("Failed to fetch")) {
        throw error;
      }
    }
  }

  throw lastError || new Error("No se pudo conectar con el servidor");
};

const pickDefined = (data, fields) => {
  const payload = {};
  fields.forEach((field) => {
    if (data[field] !== undefined) payload[field] = data[field];
  });
  return payload;
};

const characterFields = ["photo_url", "name", "real_name", "age", "role", "ability", "alignment", "enemy", "city", "team", "history"];
const cityFields = ["photo_url", "name", "state", "country", "population_characters", "population_count"];
const teamFields = ["image_url", "name", "type", "headquarters", "members"];

export const setAuthToken = (token) => {
  authToken = token;
};

export const clearAuthToken = () => {
  authToken = null;
};

export const register = async ({ name, email, password }) => {
  return requestJson("/register", {
    method: "POST",
    body: JSON.stringify({ name, email, password })
  });
};

export const login = async ({ email, password }) => {
  return requestJson("/login", {
    method: "POST",
    body: JSON.stringify({ email, password })
  });
};

export const fetchMe = async () => {
  return requestJson("/me", { method: "GET" });
};

export const updateMe = async (profile) => {
  return requestJson("/me", {
    method: "PUT",
    body: JSON.stringify(pickDefined(profile, ["username", "name", "email", "phone"]))
  });
};

export const fetchCharacters = async () => {
  return requestJson("/characters", { method: "GET" });
};

export const fetchCharacterById = async (id) => {
  return requestJson(`/characters/${id}`, { method: "GET" });
};

const isLocalFile = (file) => {
  if (!file || !file.uri) return false;
  return file.uri.startsWith("file:") || file.uri.startsWith("content:");
};

const buildFormData = (data) => {
  const formData = new FormData();

  Object.entries(data).forEach(([key, value]) => {
    if (value === undefined || value === null) return;
    if (key === "photo" && value) {
      formData.append("photo", value);
      return;
    }
    if (typeof value === "object" && value !== null && !value?.uri && !(typeof File !== "undefined" && value instanceof File)) {
      formData.append(key, JSON.stringify(value));
    } else {
      formData.append(key, String(value));
    }
  });

  return formData;
};

export const addCharacter = async (character) => {
  const payload = pickDefined(character, characterFields);
  if (character.photo && character.photo.uri && isLocalFile(character.photo)) {
    const formData = buildFormData({ ...payload, photo: character.photo });
    return requestJson("/characters", {
      method: "POST",
      headers: authToken ? { Authorization: `Bearer ${authToken}` } : {},
      body: formData
    });
  }

  return requestJson("/characters", {
    method: "POST",
    body: JSON.stringify(payload)
  });
};

export const updateCharacter = async (id, character) => {
  const payload = pickDefined(character, characterFields);
  if (character.photo && character.photo.uri && isLocalFile(character.photo)) {
    const formData = buildFormData({ ...payload, photo: character.photo });
    return requestJson(`/characters/${id}`, {
      method: "PUT",
      headers: authToken ? { Authorization: `Bearer ${authToken}` } : {},
      body: formData
    });
  }

  return requestJson(`/characters/${id}`, {
    method: "PUT",
    body: JSON.stringify(payload)
  });
};

export const deleteCharacter = async (id) => {
  return requestJson(`/characters/${id}`, { method: "DELETE" });
};

export const fetchCities = async () => {
  return requestJson("/cities", { method: "GET" });
};

export const fetchCityById = async (id) => {
  return requestJson(`/cities/${id}`, { method: "GET" });
};

export const addCity = async (city) => {
  return requestJson("/cities", {
    method: "POST",
    body: JSON.stringify(pickDefined(city, cityFields))
  });
};

export const updateCity = async (id, city) => {
  return requestJson(`/cities/${id}`, {
    method: "PUT",
    body: JSON.stringify(pickDefined(city, cityFields))
  });
};

export const deleteCity = async (id) => {
  return requestJson(`/cities/${id}`, { method: "DELETE" });
};

export const fetchTeams = async () => {
  return requestJson("/teams", { method: "GET" });
};

export const fetchTeamById = async (id) => {
  return requestJson(`/teams/${id}`, { method: "GET" });
};

export const addTeam = async (team) => {
  return requestJson("/teams", {
    method: "POST",
    body: JSON.stringify(pickDefined(team, teamFields))
  });
};

export const updateTeam = async (id, team) => {
  return requestJson(`/teams/${id}`, {
    method: "PUT",
    body: JSON.stringify(pickDefined(team, teamFields))
  });
};

export const deleteTeam = async (id) => {
  return requestJson(`/teams/${id}`, { method: "DELETE" });
};
