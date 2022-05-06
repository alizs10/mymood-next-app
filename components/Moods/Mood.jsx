import { useState } from "react";
import { motion } from "framer-motion";
import moment from 'jalali-moment'
import { useEffect } from "react";
import { useContext } from "react";
import HomeContext from "../Context/HomeContext";
import { likeMood, unlikeMood } from "../../Services/app/moods/moodsServices";

const Mood = ({ mood }) => {

    const [isLiked, setIsLiked] = useState(false)
    const [likes, setlikes] = useState(mood.likes_value)
    const { user } = useContext(HomeContext)

    useEffect(() => {

        let unmounted = false;

        if (!unmounted) checkUserLiked()

        return () => {
            unmounted = true;
        }


    }, [])

    useEffect(() => {
        let unmounted = false;
        if (!unmounted) {
            console.log("now");
            checkUserLiked()

        }

        return () => {
            unmounted = true
        }
    }, [user])

    const checkUserLiked = () => {
        let users_likes_ids = mood.users_likes_ids;
        let isLoggedIn = user;

        if (!isLoggedIn) {
            setIsLiked(false)
            return
        }

        let isUserLiked = users_likes_ids.filter(id => user.id === id);
        if (isUserLiked.length > 0) {
            setIsLiked(true)
            return
        }

        setIsLiked(false)
    }

    const handleLikeBtn = async () => {

        if (!user) {
            alert("login first you mother fucker")
            return
        }


        let oldLikes = likes;
        if (!isLiked) {
            setIsLiked(true)
            setlikes(likes += 1)
            const res = await likeMood(mood.id)
            if (!res) {
                setIsLiked(false)
                setlikes(oldLikes)
            }
            return;
        }
        setlikes(likes -= 1)
        setIsLiked(!isLiked)
        const res = await unlikeMood(mood.id)
        if (!res) {
            setIsLiked(true)
            setlikes(oldLikes)
        }

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
                        <span className={`text-xxs hover-transition ${isLiked && "text-red-500"}`}>{likes}</span>

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


                        {(user && user.id === mood.user_id) ? (
                            <button className="text-sm flex-center">

                                <span key={0}>
                                    <i className="fa-light fa-trash"></i>
                                </span>
                            </button>
                        ) : (
                            <button className="text-sm flex-center">

                                <span key={1}>
                                    <i className="fa-light fa-brake-warning"></i>
                                </span>
                            </button>
                        )}
                    </div>
                    <span className="text-xxs text-slate-700">{moment(mood.created_at).locale('fa').fromNow()}</span>
                </div>

            </div>

            <p className="text-xs text-justify">
                {mood.mood}
            </p>

        </div>
    );
}

export default Mood;