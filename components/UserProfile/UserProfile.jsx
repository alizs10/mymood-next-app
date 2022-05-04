const UserProfile = ({ pageType }) => {
    return (
        <section className="grid grid-cols-5 gap-x-2 sm:grid-cols-10 md:grid-cols-6 lg:grid-cols-12 text-slate-700 mx-2">

            <div className="col-span-1 sm:col-span-2 md:col-span-1 lg:col-span-2 flex items-center">
                <div className="rounded-full w-full flex-center bg-slate-200 drop-shadow-lg p-4 sm:p-5 md:p-6">
                    <i className="fa-light fa-face-meh-blank text-4xl sm:text-6xl md:text-7xl"></i>
                </div>
            </div>

            <div className="col-span-4 sm:col-span-8 md:col-span-5 lg:col-span-10 grid grid-rows-2 lg:grid-rows-3 mt-4">
                <div className="row-span-1 flex justify-between gap-y-2 lg:gap-y-4">
                    <span className="text-sm lg:text-base font-bold">کاربر 7</span>
                    {pageType == "0" ? (
                        <button className="btn border-2 h-fit border-amber-400 text-amber-500 flex-center text-xs">
                            <i className="fa-light fa-pen text-base"></i>
                            <span className="mr-2 hidden md:block">ویرایش</span>
                        </button>
                    ) : (
                        <button className="btn border-2 h-fit border-amber-400 text-amber-500 flex-center text-xs">
                            <i className="fa-light fa-user-plus text-base"></i>
                            <span className="mr-2 hidden md:block">دنبال کردن</span>
                        </button>
                    )}


                </div>
                <span className="row-span-1 text-xs lg:text-sm text-gray-500">جهنم یخ زده تو دلم ...</span>
            </div>

        </section>
    );
}

export default UserProfile;