import { useState, useEffect, useRef } from "react";
import HomeContext from "../components/Context/HomeContext";
import HomeLayout from "../components/Layouts/HomeLayout";
import Moods from "../components/Moods/Moods";
import SendMood from "../components/SendMood/SendMood";
import { getMoods, storeMood } from "../Services/app/moods/moodsServices";
import { isLoggedIn } from "../Services/app/user/userService";
import { moodValidator } from "../Services/app/validators/moodValidator";

const Home = ({ loggedUser, init_moods, lastID }) => {

  const [loading, setLoading] = useState(false)
  const [loadingMore, setLoadingMore] = useState(false)
  const [errors, setErrors] = useState({})

  const refreshIn = 60000;
  const [user, setUser] = useState(loggedUser)
  const [moods, setMoods] = useState(init_moods)

  const [mood, setMood] = useState("")
  const [moodEmoji, setMoodEmoji] = useState(1)

  const moodLimit = 700;
  const [charLeft, setCharLeft] = useState(moodLimit)
  const [charLeftStatus, setCharLeftStatus] = useState("")

  const [loadMore, setLoadMore] = useState(false)
  const [lastId, setLastId] = useState(lastID)
  const moodsRef = useRef()

  // useEffect(() => {

  //   const interval = setInterval(() => {
  //     handleRefreshData()
  //   }, refreshIn);

  //   return () => clearInterval(interval); // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
  // }, [])
  useEffect(() => {

    document.addEventListener('scroll', trackScrolling);

    return () => {
      document.removeEventListener('scroll', trackScrolling);
    };
  }, [])

  useEffect(() => {

    let unmounted = false
    if (!unmounted) {
      if (loadMore) {
        loadMoreMoods();
      }
    }


    return () => unmounted = true;

  }, [loadMore])

  const loadMoreMoods = async () => {
    const paginate = await getMoods(1, lastId)
    let loadedMoods = paginate.data;

    setLastId(paginate.last_id)
    setLoadingMore(false)
    setLoadMore(false)
    setMoods([...moods, ...loadedMoods])


    if (paginate.last_id !== "") {
      document.addEventListener('scroll', trackScrolling);
    }



  }

  const isBottom = (el) => {
    return el.getBoundingClientRect().bottom <= window.innerHeight;
  }

  const trackScrolling = () => {
    const wrappedElement = moodsRef.current;
    if (isBottom(wrappedElement)) {
      setLoadingMore(true)
      setLoadMore(true)
      document.removeEventListener('scroll', trackScrolling);
    }
  };

  const handleRefreshData = async () => {
    let moods = await getMoods()
    setMoods(moods)

  }

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
      setMoods(prevState => ([
        res, ...prevState
      ]))
    } else {
      setErrors(validator.errors)
    }


    setLoading(false)
  }

  return (
    <HomeContext.Provider value={{ moods, setMoods, mood, setMood, moodEmoji, setMoodEmoji, user, setUser, charLeft, setCharLeft, charLeftStatus, setCharLeftStatus, moodLimit }}>
      <HomeLayout handleSendMood={handleSendMood} loggedUser={loggedUser}>
        {user && (<SendMood errors={errors} handleSendMood={handleSendMood} />)}
        <Moods loadingMore={loadingMore} moodsRef={moodsRef} moods={moods} />
        
      </HomeLayout>
    </HomeContext.Provider>

  );
}

export async function getServerSideProps({ req }) {

  const loggedUser = await isLoggedIn(req.headers.cookie)
  const paginate = await getMoods()

  return {
    props: {
      loggedUser,
      init_moods: paginate.data,
      lastID: paginate.last_id
    },
  }
}

export default Home;
