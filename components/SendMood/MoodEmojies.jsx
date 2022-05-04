const MoodEmojies = ({ moodEmoji, setMoodEmoji }) => {
    return (
        <div className="flex py-2 gap-x-4 overflow-x-scroll no-scrollbar text-3xl text-slate-700">
            <span className={`cursor-pointer hover-transition ${moodEmoji == 0 && "mood-emoji-active"}`} onClick={() => setMoodEmoji(0)}>
                <i className="fa-light fa-face-laugh"></i>
            </span>
            <span className={`cursor-pointer hover-transition ${moodEmoji == 1 && "mood-emoji-active"}`} onClick={() => setMoodEmoji(1)}>
                <i className="fa-light fa-face-frown-slight"></i>
            </span>
            <span className={`cursor-pointer hover-transition ${moodEmoji == 2 && "mood-emoji-active"}`} onClick={() => setMoodEmoji(2)}>
                <i className="fa-light fa-face-angry"></i>
            </span>
            <span className={`cursor-pointer hover-transition ${moodEmoji == 3 && "mood-emoji-active"}`} onClick={() => setMoodEmoji(3)}>
                <i className="fa-light fa-face-meh"></i>
            </span>
            <span className={`cursor-pointer hover-transition ${moodEmoji == 4 && "mood-emoji-active"}`} onClick={() => setMoodEmoji(4)}>
                <i className="fa-light fa-face-anxious-sweat"></i>
            </span>
            <span className={`cursor-pointer hover-transition ${moodEmoji == 5 && "mood-emoji-active"}`} onClick={() => setMoodEmoji(5)}>
                <i className="fa-light fa-face-expressionless"></i>
            </span>

            <span className={`cursor-pointer hover-transition ${moodEmoji == 6 && "mood-emoji-active"}`} onClick={() => setMoodEmoji(6)}>
                <i className="fa-light fa-face-sleeping"></i>
            </span>

            <span className={`cursor-pointer hover-transition ${moodEmoji == 7 && "mood-emoji-active"}`} onClick={() => setMoodEmoji(7)}>
                <i className="fa-light fa-face-mask"></i>
            </span>

        </div>
    );
}

export default MoodEmojies;