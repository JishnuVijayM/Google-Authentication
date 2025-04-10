import axiosInstance from "./axiosConfig";

export const googleAuth = async (credential) => {
    try {
        const response = await axiosInstance.post('/auth/google', {
            token: credential,
        });
        return response;
    } catch (error) {
        console.error("Login error:", error);
        throw error;
    }
};

export const register = async (data) => {
    try {
        const response = await axiosInstance.post('/auth/register', data);
        return response;
    } catch (error) {
        console.error("Register error:", error);
        throw error;
    }
};

export const login = async (data) => {
    try {
        const response = await axiosInstance.post('/auth/login', data);
        return response;
    } catch (error) {
        console.error("Login error:", error);
        throw error;
    }
};