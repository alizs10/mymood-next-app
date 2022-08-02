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


export const updateBio = async (bio) => {

    try {
        const { data, status } = await http.post(`${config['base_url']}/api/profile/update`, JSON.stringify(bio));

        if (status == 200) {
            return data
        }
    } catch (e) {
        let error = Object.assign(e)

        console.log(error);
    }
}

export const getUsersIds = async () => {
    try {
        const { data, status } = await http.get(`${config['base_url']}/api/users`);

        if (status == 200) {
            return data.users
        }

    } catch (e) {
        let error = Object.assign(e)

        console.log(error);
    }
}

export const getUserProfileInfo = async (reqCookies = null, query = "") => {

    let token;
    if (reqCookies !== null) {
        token = cookie.parse(reqCookies)._token
    } else {
        token = Cookies.get("_token")
    }

    try {
        const { data, status } = await http.get(`${config['base_url']}/api/profile${query}`, {
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


export const getUserInfos = async (user_id, reqCookies = null, query = "") => {
    let token;
    if (reqCookies !== null) {
        token = cookie.parse(reqCookies)._token
    } else {
        token = Cookies.get("_token")
    }
    try {
        const { data, status } = await http.get(`${config['base_url']}/api/users/${user_id}${query}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        if (status == 200) {
            return data
        }

    } catch (e) {
        let error = Object.assign(e)

        console.log(error);
    }
}

export const follow = async (user_followed_id) => {
    try {
        const { data, status } = await http.get(`${config['base_url']}/api/users/${user_followed_id}/follow`);

        if (status == 200) {
            return data
        }

    } catch (e) {
        let error = Object.assign(e)

        console.log(error);
    }
}

export const unfollow = async (user_unfollowed_id) => {
    try {
        const { data, status } = await http.get(`${config['base_url']}/api/users/${user_unfollowed_id}/unfollow`);

        if (status == 200) {
            return data
        }

    } catch (e) {
        let error = Object.assign(e)

        console.log(error);
    }
}

export const getStats = async () => {
    try {
        const { data, status } = await http.get(`${config['base_url']}/api/users/stats`);

        if (status == 200) {
            return data
        }

    } catch (e) {
        let error = Object.assign(e)

        console.log(error);
    }
}
