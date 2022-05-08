const UserSettingsWindow = () => {
    return (
        <section className="centered-axis-x p-4 top-0 left-0 bottom-0 md:bottom-auto w-full md:top-16 md:rounded-lg md:drop-shadow-lg md:w-3/5 z-30 bg-slate-300">

            <div className="w-12 h-12 flex-center">
                <button className="rounded-full w-full h-full hover-transition hover:bg-white">
                    <i className="fa-regular fa-xmark text-lg text-gray-500"></i>
                </button>
            </div>

            <div className="flex flex-col gap-y-2 mt-4">

                <div className="flex flex-col gap-y-1 border p-2 rounded-lg">
                    <label className="text-gray-700 text-xs" for="">درباره شما</label>
                    <input type="email" className="form-control block w-full px-3 py-2 text-base font-normal text-gray-700 bg-white bg-clip-padding border-2 border-solid rounded-lg transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-amber-400 focus:outline-none placeholder:text-xxs" placeholder="چند کلمه درمورد خودت ..." />

                </div>

                <button className="btn text-sm bg-emerald-400">ثبت</button>
                <button className="btn border-2 text-red-500 border-red-500 text-xs">حذف حساب کاربری</button>
            </div>


        </section>
    );
}

export default UserSettingsWindow;