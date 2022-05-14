import http from "../../http";
import config from "../../config.json";

export const getMoods = async (page = 1, lastID = "", followers = false, orderBy = "") => {
    console.log("hap");
    try {
        const { data, status } = await http.get(`${config['base_url']}/api/moods?page=${page}&last_id=${lastID}&followers=${followers}&order_by=${orderBy}`);

        if (status == 200) {
            return data
        }
    } catch (e) {
        let error = Object.assign(e)

        console.log(error);
    }

}

export const storeMood = async (mood) => {
    try {
        const { data, status } = await http.post(`${config['base_url']}/api/moods/store`, JSON.stringify(mood));

        if (status == 200) {
            return data.mood
        }
    } catch (e) {
        let error = Object.assign(e)

        console.log(error);
    }
}

export const likeMood = async (mood_id) => {
    try {
        const { data, status } = await http.get(`${config['base_url']}/api/moods/${mood_id}/like`);

        if (status == 200) {
            return data.mood
        }
    } catch (e) {
        let error = Object.assign(e)

        console.log(error);

    }
}
export const unlikeMood = async (mood_id) => {
    try {
        const { data, status } = await http.get(`${config['base_url']}/api/moods/${mood_id}/unlike`);

        if (status == 200) {
            return data.mood
        }
    } catch (e) {
        let error = Object.assign(e)

        console.log(error);

    }
}
export const deleteMood = async (mood_id) => {
    try {
        const { status } = await http.get(`${config['base_url']}/api/moods/${mood_id}/destroy`);

        if (status == 200) {
            return true
        }
    } catch (e) {
        let error = Object.assign(e)

        console.log(error);

    }
}
export const reportMood = async (mood_id) => {
    try {
        const { status } = await http.get(`${config['base_url']}/api/report/${mood_id}`);

        if (status == 200) {
            return true
        }
    } catch (e) {
        let error = Object.assign(e)

        console.log(error);

    }
}
