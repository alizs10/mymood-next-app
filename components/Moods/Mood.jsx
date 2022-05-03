const Mood = () => {
    return (
        <div className="mood">

            <div className="flex justify-between items-center">
                <div className="flex gap-x-2 items-center">
                    <i className="fa-light fa-face-frown-slight text-4xl text-gray-400"></i>
                    <a href="" className="text-sm">کاربر 7</a>
                </div>

                <div className="flex gap-x-4 items-center">
                    <div className="flex gap-x-2 items-center text-slate-700">
                        <span className="text-xxs text-red-500">12</span>
                        <button className="text-sm flex-center text-red-500">
                            <i className="fa-solid fa-heart"></i>
                        </button>
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