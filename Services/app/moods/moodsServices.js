import http from "../../http";
import config from "../../config.json";

export const getMoods = async () => {

   try {
    const {data, status} = await http.get(`${config['base_url']}/api/moods`);

    if (status == 200) {
        return data.moods
    }
   } catch (e) {
       let error = Object.assign(e)

       console.log(error);
   }

}