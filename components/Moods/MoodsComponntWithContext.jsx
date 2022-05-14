import { useState, useRef, useEffect } from "react";
import { getMoods } from "../../Services/app/moods/moodsServices";
import { MoodsContext } from "../Context/MoodsContext";


const MoodsComponentWithContext = ({ children, init_moods, lastID, server_time }) => {

    //states
    const [loadingMore, setLoadingMore] = useState(false)
    const [moods, setMoods] = useState(init_moods)
    const [lastId, setLastId] = useState(lastID)
    const [filter, setFilter] = useState("0")
    const [moodestPage, setMoodestPage] = useState("1")
    const [serverTime, setServerTime] = useState(server_time)

    //refs
    const moodsRef = useRef()

    //use effects
    useEffect(() => {
        if (loadingMore) {
            loadMoreMoods(filter)
        }

    }, [loadingMore])

    //funcs

    const getFilteredMoods = async (filter) => {

        document.addEventListener('scroll', trackScrolling);

        let res;
        switch (filter) {
            case "0":
                res = await getMoods(null, null, false, "latest")
                setServerTime(res.server_time)
                setMoods(res.paginate.data)
                setLastId(res.paginate.last_id)
                break;
            case "1":
                res = await getMoods(1, null, false, "moodest")
                setServerTime(res.server_time)
                setMoodestPage(1)
                setMoods(res.paginate.data)
                break;
            case "2":
                res = await getMoods(null, null, true, "latest")
                setServerTime(res.server_time)
                setMoods(res.paginate.data)
                setLastId(res.paginate.last_id)
                break;

            default:
                break;
        }
    }


    const loadMoreMoods = async (filter) => {

        let moodsIns = structuredClone(moods);
        let res;
        switch (filter.toString()) {
            case "0":
                res = await getMoods(null, lastId, false, "latest")
                setLastId(res.paginate.last_id)
                setServerTime(res.server_time)
                setMoods([...moodsIns, ...res.paginate.data])
                break;
            case "1":
                let reqPage = parseInt(moodestPage) + 1;
                res = await getMoods(reqPage, null, false, "moodest")
                setMoodestPage(res.paginate.page)
                setServerTime(res.server_time)
                setMoods([...moodsIns, ...res.paginate.data])
                break;
            case "2":
                res = await getMoods(null, lastId, true, "latest")
                setLastId(res.paginate.last_id)
                setServerTime(res.server_time)
                setMoods([...moodsIns, ...res.paginate.data])
                break;

            default:
                break;
        }

        setLoadingMore(false)

        if (res.paginate.total_pages == 1 && filter != 1) {
            document.removeEventListener('scroll', trackScrolling);
        } else if (filter == 1 && moodestPage === res.paginate.total_pages) {
            document.removeEventListener('scroll', trackScrolling);
        }

    }

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


    return (
        <MoodsContext.Provider value={{
            loadingMore, setLoadingMore,
            moods, setMoods,
            lastId, setLastId,
            moodestPage, setMoodestPage,
            filter, setFilter,
            moodsRef,
            getFilteredMoods,
            loadMoreMoods,
            trackScrolling,
            serverTime,
            setServerTime
        }}>
            {children}
        </MoodsContext.Provider>
    );
}

export default MoodsComponentWithContext;