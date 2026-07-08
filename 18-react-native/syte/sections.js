const appWidth = 412;
const appHeight = 917;

function keepAndroidCompactSize() {
    const scale = Math.min(
        window.innerWidth / appWidth,
        window.innerHeight / appHeight,
        1
    );

    document.documentElement.style.setProperty("--app-scale", scale);
}

keepAndroidCompactSize();
window.addEventListener("resize", keepAndroidCompactSize);

const screen = document.querySelector(".screen");
const smallLogo = document.querySelector(".small-logo");
const sidebarLogo = document.querySelector(".sidebar-logo");
const sidebarShade = document.querySelector(".sidebar-shade");
const sidebarLinks = document.querySelectorAll(".sidebar-option");

if (smallLogo) {
    smallLogo.addEventListener("click", () => {
        screen.classList.toggle("sidebar-open");
    });
}

if (sidebarLogo) {
    sidebarLogo.addEventListener("click", () => {
        screen.classList.remove("sidebar-open");
    });
}

if (sidebarShade) {
    sidebarShade.addEventListener("click", () => {
        screen.classList.remove("sidebar-open");
    });
}

sidebarLinks.forEach((link) => {
    link.addEventListener("click", () => {
        screen.classList.remove("sidebar-open");
    });
});

const API_URL = "http://localhost:3000";
const TOKEN_KEY = "dcToken";
const LOCAL_CHARACTERS_KEY = "dcLocalCharacters";
const LOCAL_CITIES_KEY = "dcLocalCities";
const LOCAL_TEAMS_KEY = "dcLocalTeams";

const cityPresets = [
    { name: "Coast City", color: "#87FC7C", photo_url: "../imgs/cities/CoastCity.png", country: "USA", state: "California" },
    { name: "Bludhaven", color: "#7EFEFF", photo_url: "../imgs/cities/bludhaven.avif", country: "USA", state: "New Jersey" },
    { name: "Gotham City", color: "#9D7DFE", photo_url: "../imgs/cities/Gotham.jpg", country: "USA", state: "New Jersey" },
    { name: "Star City", color: "#FE7BFF", photo_url: "../imgs/cities/StarCity.webp", country: "USA", state: "Washington" },
    { name: "Central City", color: "#FEB4BD", photo_url: "../imgs/cities/CentralCity.png", country: "USA", state: "Missouri" },
    { name: "Metropolis", color: "#FEDAA4", photo_url: "../imgs/cities/Metropolis.jpg", country: "USA", state: "Delaware" },
    { name: "Themyscira", color: "#FFF495", photo_url: "../imgs/cities/Themyscira.png", country: "Greece", state: "Aegean Sea" },
    { name: "Atlantis", color: "#7DFECA", photo_url: "../imgs/cities/Atlantis.avif", country: "Atlantic Ocean", state: "Undersea Kingdom" }
];

const defaultCharacterPhoto = "../imgs/icons/characters.png";
const defaultTeamPhoto = "../imgs/teams/Profile - copia.webp";
const teamPresets = [
    { id: "justice-league", name: "Justice League", type: "Superheroes", headquarters: "Hall of Justice", photo_url: "../imgs/teams/liga_De_La_Justicia.jpg", members: [] },
    { id: "birds-of-prey", name: "Birds of Prey", type: "Superheroes", headquarters: "Clock Tower", photo_url: "../imgs/teams/aves-de_presa.webp", members: [] },
    { id: "teen-titans", name: "Teen Titans", type: "Superheroes", headquarters: "Titans Tower", photo_url: "../imgs/teams/Los_Jovenes_Titanes.avif", members: [] },
    { id: "gotham-knights", name: "Gotham Knights", type: "Superheroes", headquarters: "The Bell Tower", photo_url: "../imgs/teams/Profile - copia.webp", members: [] },
    { id: "suicide-squad", name: "Suicide Squad", type: "Antiheroes", headquarters: "Belle Reve", photo_url: "../imgs/teams/Escuadron_Suicida_2.jpg", members: [] }
];

const normalizeName = (value) => (value || "").toString().trim().toLowerCase().replace(/\s+/g, " ");
const getToken = () => localStorage.getItem(TOKEN_KEY) || localStorage.getItem("token") || "";
const getParams = () => new URLSearchParams(window.location.search);

function getCityPreset(name) {
    const normalized = normalizeName(name);
    return cityPresets.find((city) => normalizeName(city.name) === normalized) || cityPresets[0];
}

function getCityColor(name) {
    return getCityPreset(name).color;
}

function safeJsonParse(value, fallback = []) {
    if (Array.isArray(value)) return value;
    if (!value) return fallback;

    try {
        return JSON.parse(value);
    } catch (error) {
        return value.split(",").map((item) => item.trim()).filter(Boolean);
    }
}

function slugify(value) {
    return normalizeName(value).replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

function getLocalItems(key) {
    return safeJsonParse(localStorage.getItem(key), []);
}

function setLocalItems(key, items) {
    localStorage.setItem(key, JSON.stringify(items));
}

async function apiRequest(path, options = {}) {
    const token = getToken();
    const headers = { "Content-Type": "application/json", ...(options.headers || {}) };

    if (token) headers.Authorization = `Bearer ${token}`;

    const response = await fetch(`${API_URL}${path}`, { ...options, headers });
    if (!response.ok) throw new Error(`API ${response.status}`);
    return response.json();
}

async function getCollection(resource, localKey) {
    try {
        if (getToken()) return await apiRequest(`/${resource}`);
    } catch (error) {
        console.warn(error);
    }

    return getLocalItems(localKey);
}

async function saveItem(resource, localKey, item, id) {
    try {
        if (getToken()) {
            return await apiRequest(id ? `/${resource}/${id}` : `/${resource}`, {
                method: id ? "PUT" : "POST",
                body: JSON.stringify(item)
            });
        }
    } catch (error) {
        console.warn(error);
    }

    const items = getLocalItems(localKey);
    if (id) {
        const index = items.findIndex((current) => String(current.id) === String(id));
        if (index >= 0) items[index] = { ...items[index], ...item, id };
    } else {
        items.push({ ...item, id: Date.now() });
    }
    setLocalItems(localKey, items);
    return item;
}

async function deleteItem(resource, localKey, id) {
    try {
        if (getToken()) {
            await apiRequest(`/${resource}/${id}`, { method: "DELETE" });
            return;
        }
    } catch (error) {
        console.warn(error);
    }

    setLocalItems(localKey, getLocalItems(localKey).filter((item) => String(item.id) !== String(id)));
}

async function findItem(resource, localKey, id, name) {
    const items = await getCollection(resource, localKey);
    return items.find((item) => String(item.id) === String(id)) || items.find((item) => normalizeName(item.name) === normalizeName(name));
}

function imageForCharacter(character) {
    return character.photo_url || defaultCharacterPhoto;
}

function cityImage(name) {
    return getCityPreset(name).photo_url;
}

function fillCitySelect(selected) {
    const select = document.querySelector("#citySelect");
    if (!select) return;

    select.innerHTML = cityPresets.map((city) => `<option value="${city.name}">${city.name}</option>`).join("");
    select.value = selected && getCityPreset(selected) ? getCityPreset(selected).name : cityPresets[0].name;
}

function formToObject(form) {
    const data = Object.fromEntries(new FormData(form).entries());
    Object.keys(data).forEach((key) => {
        if (typeof data[key] === "string") data[key] = data[key].trim();
        if (data[key] === "") data[key] = null;
    });
    if (data.age) data.age = Number(data.age);
    if (data.population_count) data.population_count = Number(data.population_count);
    if (data.members) data.members = safeJsonParse(data.members, []);
    return data;
}

async function renderCharactersList() {
    const list = document.querySelector("#charactersList");
    if (!list) return;

    const characters = await getCollection("characters", LOCAL_CHARACTERS_KEY);

    if (!characters.length) {
        list.innerHTML = `<p class="empty-state">No characters yet. Add one with the + button.</p>`;
        return;
    }

    list.innerHTML = characters.map((character) => {
        const city = getCityPreset(character.city);
        return `
            <article class="list-card">
                <img src="${city.photo_url}" alt="">
                <span class="avatar" style="border-color:${city.color}"><img src="${imageForCharacter(character)}" alt=""></span>
                <span class="name">${character.name || "Character"}</span>
                <span class="tools">
                    <a class="tool-dot details" href="character-details.html?id=${character.id}" aria-label="Detalles">Detalles</a>
                    <a class="tool-dot edit" href="character-update.html?id=${character.id}" aria-label="Editar">Editar</a>
                    <button class="tool-dot delete" data-delete-character="${character.id}" type="button" aria-label="Eliminar">Eliminar</button>
                </span>
            </article>
        `;
    }).join("");

    list.querySelectorAll("[data-delete-character]").forEach((button) => {
        button.addEventListener("click", async () => {
            await deleteItem("characters", LOCAL_CHARACTERS_KEY, button.dataset.deleteCharacter);
            renderCharactersList();
        });
    });
}

async function renderCharacterDetails() {
    const target = document.querySelector("#characterDetails");
    if (!target) return;

    const params = getParams();
    const character = await findItem("characters", LOCAL_CHARACTERS_KEY, params.get("id"), params.get("name"));

    if (!character) {
        target.innerHTML = `<p class="empty-state">Character not found.</p>`;
        return;
    }

    const city = getCityPreset(character.city);
    target.innerHTML = `
        <div class="hero-strip">
            <img src="${city.photo_url}" alt="">
            <span class="round-icon" style="border-color:${city.color}"><img src="${imageForCharacter(character)}" alt=""></span>
            <span class="hero-name">${character.name || "Character"}</span>
            <span class="real-name">${character.real_name || ""}</span>
        </div>
        <div class="detail-card" style="margin-top:18px">
            <div class="split">
                <div>
                    <p class="info-label">Age:</p><p class="info-value">${character.age || "Unknown"}</p>
                    <p class="info-label">Role:</p><p class="info-value">${character.role || "Unknown"}</p>
                    <p class="info-label">Ability:</p><p class="info-value">${character.ability || "Unknown"}</p>
                    <p class="info-label">Alignment:</p><p class="info-value">${character.alignment || "Unknown"}</p>
                    <p class="info-label">Enemy of:</p><p class="info-value">${character.enemy || "Unknown"}</p>
                    <p class="info-label">City:</p><p class="info-value">${city.name}</p>
                    <p class="info-label">Team:</p><p class="info-value">${character.team || character.group_name || "Unknown"}</p>
                </div>
                <div><p class="info-label">History:</p><p class="history">${character.history || "No history registered."}</p></div>
            </div>
        </div>
    `;
}

async function bindCharacterForm() {
    const form = document.querySelector("#characterForm");
    if (!form || !document.body.innerHTML.includes("Character")) return;

    const id = getParams().get("id");
    let current = null;
    fillCitySelect();

    if (id) {
        current = await findItem("characters", LOCAL_CHARACTERS_KEY, id);
        if (current) {
            Object.entries(current).forEach(([key, value]) => {
                const field = form.elements[key];
                if (field && value !== null && value !== undefined) field.value = value;
            });
            fillCitySelect(current.city);
            const preview = document.querySelector("#characterPreview");
            if (preview && current.photo_url) preview.innerHTML = `<img src="${current.photo_url}" alt="" style="width:100%;height:100%;object-fit:cover;border-radius:50%">`;
        }
    }

    form.addEventListener("submit", async (event) => {
        event.preventDefault();
        const item = formToObject(form);
        const city = getCityPreset(item.city);
        item.city = city.name;
        if (!item.photo_url) item.photo_url = defaultCharacterPhoto;
        if (!item.group_name && item.team) item.group_name = item.team;
        await saveItem("characters", LOCAL_CHARACTERS_KEY, item, id);
        window.location.href = "characters.html";
    });
}

async function renderCitiesList() {
    const list = document.querySelector("#citiesList");
    if (!list) return;

    const apiCities = await getCollection("cities", LOCAL_CITIES_KEY);
    const cityMap = new Map(cityPresets.map((city) => [normalizeName(city.name), { ...city, population_count: 0 }]));

    apiCities.forEach((city) => {
        const preset = getCityPreset(city.name);
        cityMap.set(normalizeName(preset.name), { ...preset, ...city, name: preset.name, photo_url: city.photo_url || preset.photo_url });
    });

    const cities = Array.from(cityMap.values());
    list.innerHTML = cities.map((city) => `
        <article class="list-card">
            <img src="${city.photo_url}" alt="">
            <span class="city-swatch" style="background:${city.color}"></span>
            <span class="name" style="left:62px">${city.name}</span>
            <span class="tools">
                <a class="tool-dot details" href="city-details.html?name=${encodeURIComponent(city.name)}" aria-label="Detalles">Detalles</a>
                <a class="tool-dot edit" href="city-update.html?name=${encodeURIComponent(city.name)}" aria-label="Editar">Editar</a>
            </span>
        </article>
    `).join("");
}

async function renderCityDetails() {
    const target = document.querySelector("#cityDetails");
    if (!target) return;

    const name = getParams().get("name") || cityPresets[0].name;
    const saved = await findItem("cities", LOCAL_CITIES_KEY, getParams().get("id"), name);
    const city = { ...getCityPreset(name), ...(saved || {}) };
    const characters = (await getCollection("characters", LOCAL_CHARACTERS_KEY)).filter((character) => normalizeName(character.city) === normalizeName(city.name));

    target.innerHTML = `
        <a class="edit-floating" href="city-update.html?name=${encodeURIComponent(city.name)}" style="top:130px;right:34px;width:43px;height:43px;border-radius:50%;background:#dce6ef;color:#08213d;font-size:28px">Edit</a>
        <div class="detail-card" style="margin-top:24px;min-height:638px;text-align:center">
            <h2 class="page-title" style="font-size:38px;color:${city.color}">${city.name}</h2>
            <div class="city-art" style="width:300px;height:210px;margin-top:14px"><img src="${city.photo_url}" alt=""></div>
            <div class="split" style="margin-top:12px"><p class="info-label">Country: <span class="info-value">${city.country || "USA"}</span></p><p class="info-label">State: <span class="info-value">${city.state || "Unknown"}</span></p></div>
            <h3 class="label" style="margin-top:20px">Population</h3>
            <div class="members-grid">
                ${characters.map((character) => `<div class="member"><span class="round-icon" style="border-color:${city.color}"><img src="${imageForCharacter(character)}" alt=""></span><p class="member-name">${character.name}</p></div>`).join("") || `<p class="empty-state">No characters in this city.</p>`}
            </div>
            <p class="total">Total inhabitants: <span>${city.population_count || characters.length}</span></p>
        </div>
    `;
}

async function bindCityForm() {
    const form = document.querySelector("#cityForm");
    if (!form) return;

    const params = getParams();
    const selectedName = params.get("name") || cityPresets[0].name;
    fillCitySelect(selectedName);

    const saved = await findItem("cities", LOCAL_CITIES_KEY, params.get("id"), selectedName);
    const preset = getCityPreset(selectedName);
    const current = { ...preset, ...(saved || {}) };

    Object.entries(current).forEach(([key, value]) => {
        const field = form.elements[key];
        if (field && value !== null && value !== undefined) field.value = value;
    });

    const title = document.querySelector("#cityFormTitle");
    const image = document.querySelector("#cityFormImage");
    if (title) title.textContent = current.name;
    if (image) image.src = current.photo_url || preset.photo_url;

    const select = form.elements.name;
    if (select) {
        select.addEventListener("change", () => {
            const next = getCityPreset(select.value);
            if (title) title.textContent = next.name;
            if (image) image.src = next.photo_url;
            if (form.elements.country) form.elements.country.value = next.country;
            if (form.elements.state) form.elements.state.value = next.state;
        });
    }

    form.addEventListener("submit", async (event) => {
        event.preventDefault();
        const item = formToObject(form);
        const city = getCityPreset(item.name);
        item.name = city.name;
        item.photo_url = city.photo_url;
        await saveItem("cities", LOCAL_CITIES_KEY, item, saved?.id || params.get("id"));
        window.location.href = "cities.html";
    });
}

async function getTeams() {
    const savedTeams = await getCollection("teams", LOCAL_TEAMS_KEY);
    const map = new Map(teamPresets.map((team) => [normalizeName(team.name), { ...team }]));

    savedTeams.forEach((team) => {
        const key = normalizeName(team.name);
        map.set(key, {
            ...(map.get(key) || {}),
            ...team,
            id: team.id || slugify(team.name),
            photo_url: team.photo_url || map.get(key)?.photo_url || defaultTeamPhoto,
            members: safeJsonParse(team.members, [])
        });
    });

    return Array.from(map.values());
}

async function findTeam(id, name) {
    const teams = await getTeams();
    return teams.find((team) => String(team.id) === String(id)) || teams.find((team) => normalizeName(team.name) === normalizeName(name)) || teams[0];
}

function renderMember(character, border = "#9D7DFE") {
    return `
        <div class="member">
            <span class="round-icon" style="border-color:${border}"><img src="${imageForCharacter(character)}" alt=""></span>
            <p class="member-name">${character.name || "Character"}</p>
        </div>
    `;
}

function emptyMembers(count = 3) {
    return Array.from({ length: count }, (_, index) => `
        <div class="member empty-member">
            <span class="round-icon">${index + 1}</span>
            <p class="member-name">Empty slot</p>
        </div>
    `).join("");
}

function emptyChips(count = 3) {
    return Array.from({ length: count }, () => `<span class="round-icon"><img src="../imgs/icons/characters.png" alt=""></span>`).join("");
}

async function renderTeamsList() {
    const list = document.querySelector("#teamsList");
    if (!list) return;

    const teams = await getTeams();
    list.innerHTML = teams.map((team) => `
        <article class="list-card">
            <img src="${team.photo_url || defaultTeamPhoto}" alt="">
            <span class="name" style="left:30px">${team.name}</span>
            <span class="tools">
                <a class="tool-dot details" href="team-details.html?id=${encodeURIComponent(team.id || slugify(team.name))}" aria-label="Detalles">Detalles</a>
                <a class="tool-dot edit" href="team-update.html?id=${encodeURIComponent(team.id || slugify(team.name))}" aria-label="Editar">Editar</a>
                <button class="tool-dot delete" data-delete-team="${team.id || slugify(team.name)}" type="button" aria-label="Eliminar">Eliminar</button>
            </span>
        </article>
    `).join("");

    list.querySelectorAll("[data-delete-team]").forEach((button) => {
        button.addEventListener("click", async () => {
            await deleteItem("teams", LOCAL_TEAMS_KEY, button.dataset.deleteTeam);
            renderTeamsList();
        });
    });
}

async function renderTeamDetails() {
    const target = document.querySelector("#teamDetails");
    if (!target) return;

    const params = getParams();
    const team = await findTeam(params.get("id"), params.get("name"));
    const characters = await getCollection("characters", LOCAL_CHARACTERS_KEY);
    const memberNames = safeJsonParse(team.members, []);
    const members = characters.filter((character) => memberNames.some((name) => normalizeName(name) === normalizeName(character.name)) || normalizeName(character.team || character.group_name) === normalizeName(team.name));
    const memberMarkup = members.length ? members.map((character) => renderMember(character)).join("") : emptyMembers(6);

    target.innerHTML = `
        <div class="detail-card team-detail-panel">
            <h2 class="page-title" style="font-size:38px">${team.name}</h2>
            <div class="split">
                <p class="info-label">Type: <span class="info-value">${team.type || "Unknown"}</span></p>
                <p class="info-label">Headquarters: <span class="info-value">${team.headquarters || "Unknown"}</span></p>
            </div>
            <h3 class="label">Members</h3>
            <div class="members-grid">${memberMarkup}</div>
            <p class="total">Total Members: <span>${members.length}</span></p>
        </div>
    `;
}

async function bindTeamForm() {
    const form = document.querySelector("#teamForm");
    if (!form) return;

    const id = getParams().get("id");
    const team = id ? await findTeam(id) : null;
    const title = document.querySelector("#teamFormTitle");
    const characters = await getCollection("characters", LOCAL_CHARACTERS_KEY);

    if (team) {
        Object.entries(team).forEach(([key, value]) => {
            const field = form.elements[key];
            if (field && value !== null && value !== undefined) field.value = Array.isArray(value) ? value.join(", ") : value;
        });
        if (title) title.textContent = team.name;
    }

    const chips = document.querySelector("#teamCharacterChips");
    if (chips) {
        chips.innerHTML = characters.slice(0, 3).map((character) => `
            <span class="round-icon"><img src="${imageForCharacter(character)}" alt=""></span>
        `).join("") || emptyChips(3);
    }

    form.addEventListener("submit", async (event) => {
        event.preventDefault();
        const item = formToObject(form);
        item.id = id || slugify(item.name);
        item.photo_url = item.photo_url || team?.photo_url || defaultTeamPhoto;
        await saveItem("teams", LOCAL_TEAMS_KEY, item, id);
        window.location.href = "teams.html";
    });
}

renderCharactersList();
renderCharacterDetails();
bindCharacterForm();
renderCitiesList();
renderCityDetails();
bindCityForm();
renderTeamsList();
renderTeamDetails();
bindTeamForm();
