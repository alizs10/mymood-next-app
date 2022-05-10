import { useState, useEffect } from "react";
import HomeContext from "../components/Context/HomeContext";
import HomeLayout from "../components/Layouts/HomeLayout";
import Moods from "../components/Moods/Moods";
import SendMood from "../components/SendMood/SendMood";
import { getMoods, storeMood } from "../Services/app/moods/moodsServices";
import { isLoggedIn } from "../Services/app/user/userService";

const Home = ({ loggedUser, init_moods }) => {

  const [loading, setLoading] = useState(false)

  const refreshIn = 60000;
  const [user, setUser] = useState(loggedUser)
  const [moods, setMoods] = useState(init_moods)

  const [mood, setMood] = useState("")
  const [moodEmoji, setMoodEmoji] = useState(1)

  const moodLimit = 700;
  const [charLeft, setCharLeft] = useState(moodLimit)
  const [charLeftStatus, setCharLeftStatus] = useState("")

  useEffect(() => {

    const interval = setInterval(() => {
      handleRefreshData()
    }, refreshIn);

    return () => clearInterval(interval); // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
  }, [])

  const handleRefreshData = async () => {
    let moods = await getMoods()
    setMoods(moods)

  }

  const handleSendMood = async (mood) => {
    if (loading) return
    setLoading(true)
    let newMood = mood
    let res = await storeMood(newMood)
    setMood("")
    setCharLeft(moodLimit)
    setCharLeftStatus("0")
    setMoodEmoji(1)
    setMoods(prevState => ([
      res, ...prevState
    ]))
    setLoading(false)
  }

  return (
    <HomeContext.Provider value={{ moods, setMoods, mood, setMood, moodEmoji, setMoodEmoji, user, setUser, charLeft, setCharLeft, charLeftStatus, setCharLeftStatus, moodLimit }}>
      <HomeLayout handleSendMood={handleSendMood} loggedUser={loggedUser}>
        {user && (<SendMood handleSendMood={handleSendMood} />)}
        <Moods moods={moods} />
      </HomeLayout>
    </HomeContext.Provider>

  );
}

export async function getServerSideProps({ req }) {

  const loggedUser = await isLoggedIn(req.headers.cookie)
  const init_moods = await getMoods()

  return {
    props: {
      loggedUser, init_moods
    },
  }
}

export default Home;
