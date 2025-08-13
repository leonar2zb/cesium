import axios from 'axios';
import type {LoginData, LoginResponse, RegisterData, RegisterResponse, UserAvatarResponse} from '../Types/types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://api.kunapak.com/app_dev.php/api/';

export const userLogin = async (emailAddress: string, password: string) => {
    const data: LoginData = {
        emailAddress,
        password
    };
    try {
        const response = await axios.post<LoginResponse>(`${API_BASE_URL}login`, data, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            if (error.response.status === 404) {
                throw {
                    status: error.response.status,
                    message: "Recurso no encontrado"
                };
            } else if (error.response.status === 403) {
                console.error('Error 403: No tienes permiso para acceder');
                throw {
                    status: error.response.status,
                    message: "Usuario o contraseña incorrecta"
                };
            } else {
                console.error(`Error HTTP ${error.response.status}:`, error.response.statusText);
                throw {
                    status: error.response.status,
                    message: error.response.statusText
                };
            }
        } else if (!axios.isAxiosError(error)) {
            console.error('Error inesperado que no proviene de Axios:', error);
            throw {
                status: 500,
                message: 'Error inesperado que no proviene de Axios'
            };
        } else if (!error.response) {
            console.error('Error de red, el servidor no respondió:', error.message);
            throw {
                status: 500,
                message: 'Error de red, el servidor no respondió'
            };
        }
    }
};

export const getUserAvatar = async (token: string) => {
    try {
        const response = await axios.get<UserAvatarResponse>(`${API_BASE_URL}user/avatar`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        console.log(response);
        // return "https://share.streampixel.io/687166890d7c328e4f107159";
        return "https://share.streampixel.io/687166890d7c328e4f107159";
        // return "https://share.streampixel.io/6872e07e0d7c328e4f11e5cb";
        // return "https://share.streampixel.io/6872e07e0d7c328e4f11e5cb";
    } catch (error: any) {
        // Axios error: error.response.status puede contener el código
        if (error.response && error.response.status === 404) {
            // Si es 404, retorna una URL mock
            return "https://en.wikipedia.org/wiki/Avatar";
        }
        console.error('Error al obtener el avatar del usuario:', error);
        throw error;
    }
};

export const registerUser = async (userData: RegisterData) => {
    try {
        return await axios.post<RegisterResponse>(`${API_BASE_URL}register`, userData, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            console.error(`Error HTTP ${error.response.status}:`, error.response.data || error.response.statusText);
            throw {
                status: error.response.status,
                message: error.response.data?.message || error.response.statusText || "Error en el registro"
            };
        } else {
            console.error('Error inesperado durante el registro:', error);
            throw {
                status: 500,
                message: 'Error inesperado durante el registro'
            };
        }
    }
};
