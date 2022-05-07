import cookie from "cookie";
import Cookies from "js-cookie";
import http from "../../http";
import config from "../../config.json";
import { getUser, logout } from "../auth/authServices";
import axios from "axios";

export const loginUser = (token) => {

    Cookies.set("_token", token)
    axios.defaults.headers['Authorization'] = `Bearer ${token}`;
}

export const isLoggedIn = async (reqCookies = null) => {
    let token;

    if (reqCookies === null) {
        token = Cookies.get("_token");
    } else {
        token = cookie.parse(reqCookies)._token
    }

    if (!token) {
        return false
    }

    try {
        const { status, data } = await getUser(token);
        if (status === 401) {
            return false;
        }
        let user = data;
        return user;

    } catch (e) {
        let error = Object.assign(e)
        if (error.response.status === 401) {
            return false;
        }

    }


}

export const logoutUser = async () => {
    let token = Cookies.get("_token");

    if (token) {
        const { status } = await logout()

        if (status == 200) {
            Cookies.remove("_token")
            return true;
        }
    }

    return false
}

export const getUserProfileInfo = async (reqCookies) => {
    
    let token = cookie.parse(reqCookies)._token

    console.log(token);
    try {
        const { data, status } = await http.get(`${config['base_url']}/api/profile`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        console.log(data);
        if (status == 200) {
            return data
        }
    } catch (e) {
        let error = Object.assign(e)

        console.log(error);
    }
}