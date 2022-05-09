const VerificationCodeForm = () => {
    return (
        <form className="flex flex-col w-3/4 lg:w-2/5 mt-4 self-center" action="">
            <label className="text-xs text-gray-500 mb-2" for="">کد تایید</label>
            <div className="grid grid-cols-6 gap-x-2">
                <input type="text" maxlength="1" className="col-span-1 text-center form-control block w-full px-3 py-2 text-base font-normal text-gray-700 bg-white bg-clip-padding border-2 border-solid rounded-lg transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-amber-400 focus:outline-none" />
                <input type="text" maxlength="1" className="col-span-1 text-center form-control block w-full px-3 py-2 text-base font-normal text-gray-700 bg-white bg-clip-padding border-2 border-solid rounded-lg transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-amber-400 focus:outline-none" />
                <input type="text" maxlength="1" className="col-span-1 text-center form-control block w-full px-3 py-2 text-base font-normal text-gray-700 bg-white bg-clip-padding border-2 border-solid rounded-lg transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-amber-400 focus:outline-none" />
                <input type="text" maxlength="1" className="col-span-1 text-center form-control block w-full px-3 py-2 text-base font-normal text-gray-700 bg-white bg-clip-padding border-2 border-solid rounded-lg transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-amber-400 focus:outline-none" />
                <input type="text" maxlength="1" className="col-span-1 text-center form-control block w-full px-3 py-2 text-base font-normal text-gray-700 bg-white bg-clip-padding border-2 border-solid rounded-lg transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-amber-400 focus:outline-none" />
                <input type="text" maxlength="1" className="col-span-1 text-center form-control block w-full px-3 py-2 text-base font-normal text-gray-700 bg-white bg-clip-padding border-2 border-solid rounded-lg transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-amber-400 focus:outline-none" />

            </div>
            <button className="btn bg-amber-300 text-slate-900 mt-2">تایید</button>
        </form>
    );
}

export default VerificationCodeForm;