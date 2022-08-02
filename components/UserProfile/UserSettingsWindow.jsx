import { motion } from "framer-motion";

const UserSettingsWindow = ({ errors,handleUpdateBio, setUserSettingsVisibility, bio, setBio }) => {

    const dropIn = {
        hidden: {
            y: "-100vh",
            opacity: 0,
        },
        visible: {
            y: "0",
            opacity: 1,
            transition: {
                duration: 0.1,
                type: "spring",
                damping: 25,
                stiffness: 500,
            },
        },
        exit: {
            y: "100vh",
            opacity: 0,
        },
    };

    return (
        <motion.div
            onClick={(e) => e.stopPropagation()}
            variants={dropIn}
            initial="hidden"
            animate="visible"
            exit="exit" className="p-4 w-full md:rounded-lg md:drop-shadow-lg md:w-3/5 z-30 bg-slate-300">

            <div className="w-12 h-12 flex-center">
                <button className="rounded-full w-full h-full flex-center hover-transition hover:bg-white" onClick={() => setUserSettingsVisibility(false)}>
                    <i className="fa-regular fa-xmark text-lg text-gray-500"></i>
                </button>
            </div>

            <div className="flex flex-col gap-y-2 mt-4">

                <div className="flex flex-col gap-y-1 border p-2 rounded-lg">
                    <label className="text-gray-700 text-xs" htmlFor="bio">درباره شما</label>
                    <input type="text" value={bio} onChange={(event) => setBio(event.target.value) } className="form-control block w-full px-3 py-2 text-base font-normal text-gray-700 bg-white bg-clip-padding border-2 border-solid rounded-lg transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-amber-400 focus:outline-none placeholder:text-xxs" placeholder="چند کلمه درمورد خودت ..." />
                    {errors.bio && (<span className="text-xxs text-red-500 mt-2">{errors.bio}</span>)}

                </div>

                <button className="btn text-sm bg-emerald-400" onClick={() => handleUpdateBio()}>ثبت</button>
                <button className="btn border-2 text-red-500 border-red-500 text-xs">حذف حساب کاربری</button>
            </div>


        </motion.div>
    );
}

export default UserSettingsWindow;