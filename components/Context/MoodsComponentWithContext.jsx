import { useState } from "react";
import { getMoods } from "../../Services/app/moods/moodsServices";

const MoodsComponentWithContext = ({ children }) => {

    //context
    const MoodsContext = React.createContext();

    //states
    const [loadingMore, setLoadingMore] = useState(false)
    const [moods, setMoods] = useState(init_moods)
    const [lastId, setLastId] = useState(lastID)
    const [moodestPage, setMoodestPage] = useState("1")

    //refs
    const moodsRef = useRef()

    //funcs
    const loadMoreMoods = async (filter) => {

        let moodsIns = structuredClone(moods);
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
            moodsRef,
            loadMoreMoods,
        }}>
            {children}
        </MoodsContext.Provider>
    );
}

export default MoodsComponentWithContext;