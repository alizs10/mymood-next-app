import { useState } from "react";
import { motion } from "framer-motion";
const Mood = ({ mood }) => {

    const [isLiked, setIsLiked] = useState(true)

    const handleLikeBtn = () => {
        setIsLiked(!isLiked)
    }

    const emojies = {
        0: "fa-light fa-face-frown-slight text-gray-400",
        1: "fa-light fa-face-laugh text-emerald-400",
        2: "fa-light fa-face-mask",
        3: "fa-light fa-face-sleeping",
        4: "fa-light fa-face-angry",
        5: "fa-light fa-face-anxious-sweat",
        6: "fa-light fa-face-expressionless",
        7: "fa-light fa-face-meh text-slate-700",
    };


    return (
        <div className="mood">

            <div className="flex justify-between items-center">
                <div className="flex gap-x-2 items-center">
                    <i className={`${emojies[mood.type]} text-4xl`}></i>
                    <a href="" className="text-sm">{`کاربر ${mood.user_id}`}</a>
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
                {mood.mood}
            </p>

        </div>
    );
}

export default Mood;