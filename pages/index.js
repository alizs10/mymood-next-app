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

  const [lastId, setLastId] = useState(lastID)
  const moodsRef = useRef()

  const [filter, setFilter] = useState("0")
  const [moodestPage, setMoodestPage] = useState("1")



  useEffect(() => {
    document.addEventListener('scroll', trackScrolling);

    return () => document.removeEventListener('scroll', trackScrolling);

  }, [])
  useEffect(() => {
    if (loadingMore) {
      loadMoreMoods(filter)
    }

  }, [loadingMore])


  const isBottom = (el) => {
    return el.getBoundingClientRect().bottom <= window.innerHeight;
  }

  const trackScrolling = () => {
    const wrappedElement = moodsRef.current;
    if (isBottom(wrappedElement)) {
      setLoadingMore(true)
      document.removeEventListener('scroll', trackScrolling);
    }
  };

  // useEffect(() => {
  //   setLastId("")
  //   getFilteredMoods();
  //   document.addEventListener('scroll', trackScrolling);

  // }, [moodsFilter])

  const getFilteredMoods = async (filter) => {

    document.addEventListener('scroll', trackScrolling);

    let paginate;
    switch (filter) {
      case "0":
        paginate = await getMoods(null, null, false, "latest")
        setMoods(paginate.data)
        setLastId(paginate.last_id)
        break;
      case "1":
        paginate = await getMoods(1, null, false, "moodest")
        setMoodestPage(1)
        setMoods(paginate.data)
        break;
      case "2":
        paginate = await getMoods(null, null, true, "latest")
        setMoods(paginate.data)
        setLastId(paginate.last_id)
        break;

      default:
        break;
    }
  }

  const loadMoreMoods = async (filter) => {

    let moodsIns = structuredClone(moods);;
    let paginate = [];
    switch (filter.toString()) {
      case "0":
        paginate = await getMoods(null, lastId, false, "latest")
        setLastId(paginate.last_id)
        setMoods([...moodsIns, ...paginate.data])
        break;
      case "1":
        let reqPage = parseInt(moodestPage) + 1;
        paginate = await getMoods(reqPage, null, false, "moodest")
        console.log(moods, paginate.data);
        setMoodestPage(paginate.page)
        setMoods([...moodsIns, ...paginate.data])

        break;
      case "2":
        paginate = await getMoods(null, lastId, true, "latest")
        setLastId(paginate.last_id)
        setMoods([...moodsIns, ...paginate.data])
        break;

      default:
        break;
    }

    setLoadingMore(false)

    if (paginate.total_pages == 1 && filter != 1) {
      document.removeEventListener('scroll', trackScrolling);
    } else if (filter == 1 && moodestPage === paginate.total_pages) {
      document.removeEventListener('scroll', trackScrolling);
    }

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
        <Moods loadingMore={loadingMore} getFilteredMoods={getFilteredMoods} filter={filter} setFilter={setFilter} moodsRef={moodsRef} moods={moods} />

      </HomeLayout>
    </HomeContext.Provider>

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
