import api from "../api/axios"

export const getPets = () => api.get("/pets/list")

export const getPet = (id) => api.get(`/pets/show/${id}`)

export const createPet = (data) => api.post("/pets/store", data)

export const updatePet = (id, data) => api.post(`/pets/edit/${id}`, data)

export const deletePet = (id) => api.delete(`/pets/destroy/${id}`)