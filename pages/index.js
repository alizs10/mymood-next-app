import { useState, useEffect } from "react";
import { useContext } from "react";
import HomeContext from "../components/Context/HomeContext";
import HomeLayout from "../components/Layouts/HomeLayout";
import Moods from "../components/Moods/Moods";
import { getMoods, storeMood } from "../Services/app/moods/moodsServices";
import { isLoggedIn } from "../Services/app/user/userService";

const Home = ({ loggedUser, init_moods }) => {

  const refreshIn = 60000;
  const [user, setUser] = useState(loggedUser)
  const [moods, setMoods] = useState(init_moods)

  const [mood, setMood] = useState("")
  const [moodEmoji, setMoodEmoji] = useState(0)
  

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

    let newMood = mood
    let res = await storeMood(newMood)
    setMood("")
    setMoodEmoji(0)
    setMoods(prevState => ([
      res, ...prevState
    ]))

  }

  return (
    <HomeContext.Provider value={{ moods, setMoods, mood, setMood, moodEmoji, setMoodEmoji, user, setUser }}>
      <HomeLayout handleSendMood={handleSendMood} loggedUser={loggedUser}>

        <Moods />
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
