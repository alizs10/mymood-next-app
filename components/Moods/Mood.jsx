import { useState } from "react";
import { motion } from "framer-motion";
const Mood = () => {

    const [isLiked, setIsLiked] = useState(true)

    const handleLikeBtn = () => {
        setIsLiked(!isLiked)
    }

    return (
        <div className="mood">

            <div className="flex justify-between items-center">
                <div className="flex gap-x-2 items-center">
                    <i className="fa-light fa-face-frown-slight text-4xl text-gray-400"></i>
                    <a href="" className="text-sm">کاربر 7</a>
                </div>

                <div className="flex gap-x-4 items-center">
                    <div className="flex gap-x-2 items-center text-slate-700">
                        <span className={`text-xxs hover-transition ${isLiked && "text-red-500"}`}>12</span>
                       
                            {
                                isLiked ? (
                                    <motion.button animate={{ scale: [1, 1.2, 1] }} className="text-sm flex-center text-red-500" onClick={() => handleLikeBtn()}>
                                        <span key={0}>
                                            <i className="fa-solid fa-heart"></i>
                                        </span>
                                    </motion.button>
                                ) : (
                                    <motion.button animate={{ scale: [1, 0.8, 1] }} className="text-sm flex-center" onClick={() => handleLikeBtn()}>
                                        <span key={1}>
                                            <i className="fa-light fa-heart"></i>
                                        </span>
                                    </motion.button>
                                )
                            }

                 
                        <button className="text-sm flex-center">
                            <i className="fa-light fa-brake-warning"></i>
                        </button>
                    </div>
                    <span className="text-xxs text-slate-700">3 دقیقه پیش</span>
                </div>

            </div>

            <p className="text-xs text-justify">
                دلم واسش تنگ شده :(
            </p>

        </div>
    );
}

export default Mood;