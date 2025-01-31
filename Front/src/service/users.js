import axios from 'axios';

const API_URL = 'http://localhost:3000/api/v1/users';

// Obtener todos los usuarios
export const getUsers = async () => {
    try {
        const response = await axios.get(`${API_URL}/`, {
        });
        return response.data;
    } catch (error) {
        console.error(error.message);
        throw new Error(error.response?.data?.message || 'Error en la petición');
    }
};

// Obtener un usuario por id
export const getUser = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/${id}`, {
        });
        return response.data;
    } catch (error) {
        console.error(error.message);
        throw new Error(error.response?.data?.message || 'Error en la petición');
    }
};

// Agregar un nuevo usuario
export const createUser = async (data) => {
    try {
        const response = await axios.post(`${API_URL}/`, data);
        return response.data;
    } catch (error) {
        console.error(error.message);
        throw new Error(error.response?.data?.message || 'Error en la petición');
    }
};

// Actualizar un usuario
export const updateUser = async (id, data) => {
    try {
        const response = await axios.patch(`${API_URL}/${id}`, data);
        return response.data;
    } catch (error) {
        console.error(error.message);
        throw new Error(error.response?.data?.message || 'Error en la petición');
    }
};

// Eliminar un usuario
export const deleteUser = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error(error.message);
        throw new Error(error.response?.data?.message || 'Error en la petición');
    }
};