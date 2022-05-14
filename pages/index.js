import { useState, useEffect, useContext } from "react";
import HomeContext from "../components/Context/HomeContext";
import { MoodsContext } from "../components/Context/MoodsContext";
import HomeLayout from "../components/Layouts/HomeLayout";
import Moods from "../components/Moods/Moods";
import MoodsComponentWithContext from "../components/Moods/MoodsComponntWithContext";
import SendMood from "../components/SendMood/SendMood";
import { getMoods } from "../Services/app/moods/moodsServices";
import { isLoggedIn } from "../Services/app/user/userService";

const Home = ({ loggedUser, init_moods, lastID, server_time }) => {

  const { loadingMore, filter, loadMoreMoods, trackScrolling } = useContext(MoodsContext);


  const [user, setUser] = useState(loggedUser)

  const [mood, setMood] = useState("")
  const [moodEmoji, setMoodEmoji] = useState(1)

  const moodLimit = 700;
  const [charLeft, setCharLeft] = useState(moodLimit)
  const [charLeftStatus, setCharLeftStatus] = useState("")

 

  


  return (
    <MoodsComponentWithContext init_moods={init_moods} lastID={lastID}  server_time={server_time}>
      <HomeContext.Provider value={{ mood, setMood, moodEmoji, setMoodEmoji, user, setUser, charLeft, setCharLeft, charLeftStatus, setCharLeftStatus, moodLimit }}>
        <HomeLayout>
          {user && (<SendMood />)}
          <Moods init_moods={init_moods} />
        </HomeLayout>
      </HomeContext.Provider>
    </MoodsComponentWithContext>

  );
}

export async function getServerSideProps({ req }) {

  const loggedUser = await isLoggedIn(req.headers.cookie)
  const data = await getMoods(null, null, false, "latest")

  return {
    props: {
      loggedUser,
      init_moods: data.paginate.data,
      lastID: data.paginate.last_id,
      server_time: data.server_time
    },
  }
}

export default Home;
