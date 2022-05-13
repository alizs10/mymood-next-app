import { useState, useEffect, useContext } from "react";
import HomeContext from "../components/Context/HomeContext";
import { MoodsContext } from "../components/Context/MoodsContext";
import HomeLayout from "../components/Layouts/HomeLayout";
import Moods from "../components/Moods/Moods";
import MoodsComponentWithContext from "../components/Moods/MoodsComponntWithContext";
import SendMood from "../components/SendMood/SendMood";
import { getMoods, storeMood } from "../Services/app/moods/moodsServices";
import { isLoggedIn } from "../Services/app/user/userService";
import { moodValidator } from "../Services/app/validators/moodValidator";

const Home = ({ loggedUser, init_moods, lastID }) => {

  const { loadingMore, setLoadingMore, moods, setMoods, lastId, setLastId, moodestPage, setMoodestPage, filter, setFilter, moodsRef, getFilteredMoods, loadMoreMoods, trackScrolling } = useContext(MoodsContext);


  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({})

  const [user, setUser] = useState(loggedUser)

  const [mood, setMood] = useState("")
  const [moodEmoji, setMoodEmoji] = useState(1)

  const moodLimit = 700;
  const [charLeft, setCharLeft] = useState(moodLimit)
  const [charLeftStatus, setCharLeftStatus] = useState("")

  useEffect(() => {
    document.addEventListener('scroll', trackScrolling);

    return () => document.removeEventListener('scroll', trackScrolling);

  }, [])

  useEffect(() => {
    if (loadingMore) {
      loadMoreMoods(filter)
    }

  }, [loadingMore])

  const handleSendMood = async (mood) => {
    if (loading) return
    setLoading(true)
    let newMood = mood

    const validator = moodValidator(mood)
    if (validator.success) {
      setErrors({})
      let res = await storeMood(newMood)
      setMood("")
      setCharLeft(moodLimit)
      setCharLeftStatus("0")
      setMoodEmoji(1)
      if (filter != 0) {
        setFilter("0")
        await getFilteredMoods("0")
      } else {
        setMoods(prevState => ([
          res, ...prevState
        ]))
      }
    } else {
      setErrors(validator.errors)
    }


    setLoading(false)
  }
  return (
    <MoodsComponentWithContext init_moods={init_moods} lastID={lastID}>
      <HomeContext.Provider value={{ mood, setMood, moodEmoji, setMoodEmoji, user, setUser, charLeft, setCharLeft, charLeftStatus, setCharLeftStatus, moodLimit }}>
        <HomeLayout handleSendMood={handleSendMood} loggedUser={loggedUser}>
          {user && (<SendMood errors={errors} handleSendMood={handleSendMood} />)}
          <Moods init_moods={init_moods}/>
        </HomeLayout>
      </HomeContext.Provider>
    </MoodsComponentWithContext>

  );
}

export async function getServerSideProps({ req }) {

  const loggedUser = await isLoggedIn(req.headers.cookie)
  const paginate = await getMoods(null, null, false, "latest")

  return {
    props: {
      loggedUser,
      init_moods: paginate.data,
      lastID: paginate.last_id
    },
  }
}

export default Home;
