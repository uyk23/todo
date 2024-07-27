import { LoginFormData } from "./pages/Login";
import { RegisterFormData} from "./pages/Register";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

export const register = async (formData: RegisterFormData) => {
    const response = await fetch(`${API_BASE_URL}/api/users/register`, {
        method: 'POST',
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(formData),
    });

    const responseBody = await response.json();
    if(!response.ok) {
        throw new Error(responseBody.message);
    }
};

export const login = async (formData: LoginFormData) => {
    const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: 'POST',
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(formData),
    });

    const responseBody = await response.json();
    if(!response.ok) {
        throw new Error(responseBody.message);
    }
};

export const logOut = async() => {
    const response = await fetch(`${API_BASE_URL}/api/auth/logout`, {
        credentials: "include",
        method: "POST"
    });

    if (!response.ok) {
        throw new Error("error during log out, please try again");
    }
}

export const validateToken = async () => {
    const response = await fetch(`${API_BASE_URL}/api/auth/validate-token`, {
        credentials: "include"
    });
    
    if (!response.ok) {
        throw new Error("token invalid");
    }
    
    return response.json();
}