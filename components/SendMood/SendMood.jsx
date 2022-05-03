const SendMood = () => {
    return (
        <section className="flex flex-col mx-2 pb-4">

            <span className="text-xs text-slate-700 mb-2">مودت چیه؟</span>
            <div className="flex py-2 gap-x-4 overflow-x-scroll no-scrollbar text-3xl text-slate-700">

                <span className="cursor-pointer">
                    <i className="fa-light fa-face-meh"></i>
                </span>
                <span className="cursor-pointer">
                    <i className="fa-light fa-face-angry"></i>
                </span>
                <span className="cursor-pointer">
                    <i className="fa-light fa-face-anxious-sweat"></i>
                </span>
                <span className="cursor-pointer">
                    <i className="fa-light fa-face-expressionless"></i>
                </span>
                <span className="cursor-pointer">
                    <i className="fa-light fa-face-frown-slight"></i>
                </span>
                <span className="cursor-pointer mood-emoji-active">
                    <i className="fa-light fa-face-sleeping"></i>
                </span>
                <span className="cursor-pointer">
                    <i className="fa-light fa-face-laugh"></i>
                </span>
                <span className="cursor-pointer">
                    <i className="fa-light fa-face-mask"></i>
                </span>

            </div>
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
            " id="mood" rows="3" placeholder="توی چند کلمه یا جمله بنویس الان چه حسی داری ..."></textarea>

            <div className="flex justify-between mt-2 items-center">
                <span className="text-slate-700 text-xxs">700</span>

                <button className="btn bg-amber-200 text-xs lg:text-base text-slate-700">
                    <i className="fa-light fa-paper-plane"></i>
                </button>
            </div>

        </section>
    );
}

export default SendMood;