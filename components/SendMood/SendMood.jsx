import { useState,useContext } from "react";
import HomeContext from "../Context/HomeContext";
import { MoodsContext } from "../Context/MoodsContext";
import MoodEmojies from "./MoodEmojies";
import { moodValidator } from "../../Services/app/validators/moodValidator";
import { storeMood } from "../../Services/app/moods/moodsServices";
const SendMood = () => {
 
    const { moods, setMoods, filter } = useContext(MoodsContext);


    const { mood, setMood, moodEmoji, setMoodEmoji, charLeft, setCharLeft, charLeftStatus, setCharLeftStatus, moodLimit } = useContext(HomeContext)
    
    const [loading, setLoading] = useState(false)
    const [errors, setErrors] = useState({})
    const handleMoodChange = (mood) => {

        let validMood = mood;
        validMood = validMood.slice(0, moodLimit)

        let moodLen = validMood.length;
        let charLeft = moodLimit - moodLen;
        if (charLeft < 30 && charLeft > 3) {
            setCharLeftStatus("amber")
        } else if (charLeft <= 3) {
            setCharLeftStatus("red")
        } else {
            setCharLeftStatus("")
        }

        setCharLeft(charLeft)
        setMood(validMood)
        return

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
            if (filter != 0) {
                setFilter("0")
                getFilteredMoods("0")
            } else {
                setMoods([
                    res, ...moods
                ])
            }
        } else {
            setErrors(validator.errors)
        }


        setLoading(false)
    }

    return (
        <section className="flex flex-col mx-2 pb-4">

            <span className="text-xs text-slate-700 mb-2">مودت چیه؟</span>

            <MoodEmojies moodEmoji={moodEmoji} setMoodEmoji={setMoodEmoji} />

            <textarea className="
              form-control
              block
              w-full
              px-3
              py-1.5
              text-sm
              lg:text-base
              font-normal
              text-gray-700
              bg-white bg-clip-padding
              border-2 border-solid border-gray-300
              rounded
              transition
              ease-in-out
              m-0
              placeholder:text-xxs
              lg:placeholder:text-xs
              focus:text-gray-700 focus:bg-white focus:border-amber-300 focus:outline-none
            " id="mood" rows="3" placeholder="توی چند کلمه یا جمله بنویس الان چه حسی داری ..." value={mood} onChange={event => handleMoodChange(event.target.value)} />
            {errors.mood && (<span className="text-xxs text-red-500 mt-2">{errors.mood}</span>)}

            <div className="flex justify-between mt-2 items-center">
                <span className={`text-xxs ${charLeftStatus !== "" ? `text-${charLeftStatus}-400` : "text-slate-700"}`}>{charLeft}</span>

                <button className="btn bg-amber-200 text-xs lg:text-base text-slate-700" onClick={() => handleSendMood({ mood, type: moodEmoji })}>
                    <i className="fa-light fa-paper-plane"></i>
                </button>
            </div>

        </section>
    );
}

export default SendMood;