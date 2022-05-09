import http from "../../http";
import config from "../../config.json";

export const checkEmail = async (form) => {

    return await http.get(`${config["base_url"]}/sanctum/csrf-cookie`).then(async response => {
        return await http.post(`${config["base_url"]}/api/check-email`, form)
    });
}
export const checkVCode = async (form) => {

    return await http.get(`${config["base_url"]}/sanctum/csrf-cookie`).then(async response => {
        return await http.post(`${config["base_url"]}/api/check-verification-code`, form)
    });
}

export const register = async (form) => {

    return await http.get(`${config["base_url"]}/sanctum/csrf-cookie`).then(async response => {
        return await http.post(`${config["base_url"]}/api/set-password`, form)
    });
}


export const login = async (form) => {

    return await http.get(`${config["base_url"]}/sanctum/csrf-cookie`).then(async response => {
        return await http.post(`${config["base_url"]}/api/login`, form)
    });
}

export const getUser = async (token) => {
    return await http.get(`${config['base_url']}/api/user`, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });
}


export const logout = async () => {
    return await http.get(`${config["base_url"]}/api/logout`)
}