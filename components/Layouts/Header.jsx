const Header = () => {
    return (
        <header className="fixed top-0 w-full bg-slate-100 drop-shadow-md z-20 p-3 flex justify-between items-center">

            <div className="flex gap-x-2 items-center">

                <button className="text-slate-900 text-lg lg:text-2xl">
                    <i className="fa-regular fa-bars-staggered"></i>
                </button>

                <span className="text-base font-bold flex items-center gap-x-1">
                    مای مود
                    <i className="fa-regular fa-face-grin-wink text-amber-400 text-xl"></i>
                </span>

            </div>

            <div className="flex gap-x-1 relative">
                <button className="btn bg-blue-700 text-slate-100 hidden">
                    <i className="fa-regular fa-arrow-right-to-bracket"></i>
                </button>
                <span className="flex-center gap-x-2 text-xs lg:text-base text-slate-700 cursor-pointer hover:text-black hover-transition">
                    <span>سلام، کاربر 7</span>
                    <i className="fa-light fa-angle-down"></i>
                </span>
                <div className="hidden absolute top-8 lg:top-10 left-0 z-20 w-24 bg-slate-100 rounded-lg drop-shadow-lg p-2">
                    <button className="text-xs w-full flex text-right gap-x-2 hover:text-red-500 hover-transition">
                        <i className="fa-light fa-door-open text-base"></i>
                        <span>خروج</span>
                    </button>
                </div>
            </div>


        </header>
    );
}

export default Header;
