import { isNull } from "lodash";
import { FadeLoader } from "react-spinners";
import { useContext, useEffect, useState } from "react";
import { MoodsContext } from "../Context/MoodsContext";
import Mood from "./Mood";
import HomeContext from "../Context/HomeContext";
import { useRouter } from "next/router";

const Moods = ({ pageType = null }) => {
    const router = useRouter()

    const [pathname, setPathName] = useState(router.pathname)

    const { moods, filter, setFilter, moodsRef, getFilteredMoods, loadingMore, trackScrolling } = useContext(MoodsContext)
    const { user } = useContext(HomeContext)
    const handleChange = val => {
        setFilter(val)
        getFilteredMoods(val, pageType)
    }


    useEffect(() => {

        if (pathname !== "/users/[userId]" && pathname !== "/my-profile") {
            document.addEventListener('scroll', trackScrolling);
        }

        return () => document.removeEventListener('scroll', trackScrolling);

    }, [])


    return (
        <section ref={moodsRef} className="flex flex-col gap-y-4 mx-2 pb-4">

            <div className="flex justify-between items-center">
                <span className="text-xs text-slate-700">حال کاربرای مای مود چطوره</span>

                <div className="flex gap-x-2 items-center">

                    <div className="flex justify-centerr">
                        <div className="xl:w-36">
                            <select className="form-select 
                        block
                        w-full
                        px-3
                        py-1.5
                        lg:text-base
                        text-xs
                        font-normal
                        text-gray-700
                        bg-white bg-clip-padding bg-no-repeat
                        border-2 border-solid border-gray-300
                        rounded-lg
                        transition
                        ease-in-out
                        m-0
                        focus:text-gray-700 focus:bg-white focus:border-amber-400 focus:outline-none"
                                aria-label="Default select example"
                                value={filter.toString()} onChange={event => handleChange(event.target.value)}
                            >

                                <option value={0}>جدیدترین</option>
                                <option value={1}>مودترین</option>
                                {(user && pageType === null) && (
                                    <option value={2}>دنبال کنندگان</option>
                                )}

                            </select>
                        </div>
                    </div>
                    <i className="fa-light fa-arrow-down-wide-short text-sm lg:text-xl"></i>
                </div>
            </div>
            <div className="flex flex-col gap-y-3">


                {moods.map(mood => (
                    <Mood key={mood.id} mood={mood} />
                ))}

                {(moods.length === 0 && pageType === null && filter != 2) && (
                    <span className="text-xs">در به اشتراک گذاشتن مود خود اولین نفر باشید :)</span>
                )}

                {(moods.length === 0 && pageType == 0) && (
                    <span className="text-xs">هنوز مودی به اشتراک نذاشتی ...</span>
                )}
                {(moods.length === 0 && pageType == 1) && (
                    <span className="text-xs">هنوز مودی به اشتراک نذاشته ...</span>
                )}
                {(moods.length === 0 && pageType === null && filter == 2) && (
                    <span className="text-xs">هنوز کسی رو دنبال نکردی...</span>
                )}

            </div>

            {loadingMore && (
                <section className="w-full flex justify-center py-12">
                    <FadeLoader color={"#334155"} loading={loadingMore} />
                </section>
            )}


        </section>
    );
}

export default Moods;