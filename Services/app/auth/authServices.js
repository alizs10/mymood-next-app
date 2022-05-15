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

export const loginWithGoogle = async () => {
    return await http.get(`${config["base_url"]}/api/auth/google`)
}

export const googleCallback = async (query) => {
    return await http.get(`${config["base_url"]}/api/auth/google/callback?code=${query.code}&scope=${query.scope}&authuser=${query.authuser}$propmpt=${query.propmpt}`)
}


export const forgotPassword = async (forgotPassArr) => {
    return await http.post(`${config['base_url']}/api/forgot-password`, JSON.stringify(forgotPassArr));
}
export const resetPassword = async (formdata) => {
    return await http.get(`${config["base_url"]}/sanctum/csrf-cookie`).then(async response => {
        return await http.post(`${config['base_url']}/api/reset-password`, formdata);
    });
}