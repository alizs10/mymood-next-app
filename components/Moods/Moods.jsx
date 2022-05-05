import Mood from "./Mood";

const Moods = ({ moods }) => {
    return (
        <section className="flex flex-col gap-y-4 mx-2 pb-4">

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
                                aria-label="Default select example">

                                <option value="1">جدیدترین</option>
                                <option value="1">دنبال کنندگان</option>
                                <option value="2">مودترین</option>

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

            </div>


        </section>
    );
}

export default Moods;