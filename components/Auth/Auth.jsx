import { Fragment } from "react";

const Auth = () => {
    
    const googleLogo = require("./google.svg")

    return (
        <Fragment>
            <main className="mt-16 lg:mx-56">

                <section className="grid grid-rows-6 h-screen">
                    <div className="row-span-1"></div>
                    <div className="row-span-3 flex flex-col justify-center mb-10">
                        <div className="flex flex-col gap-y-2">
                            <i className="fa-regular fa-face-grin-wink text-amber-300 text-7xl"></i>
                            <span className="text-center font-bold text-lg">مای مود</span>
                        </div>

                        <button href=""
                            className="btn mt-4 bg-white w-3/4 lg:w-2/5 border-2 self-center flex justify-between items-center">
                            <span className="text-xs lg:text-sm">ورود با گوگل</span>
                            <img src={googleLogo.default.src} className="w-6" alt="google logo"/>
                        </button>


                        <form className="flex flex-col w-3/4 lg:w-2/5 mt-4 self-center" action="">
                            <label className="text-xs text-gray-500 mb-2" htmlFor="">ایمیل</label>
                            <input type="email" className="form-control block w-full px-3 py-2 text-base font-normal text-gray-700 bg-white bg-clip-padding border-2 border-solid rounded-lg transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-amber-400 focus:outline-none" id="exampleFormControlInput1" placeholder="abc@example.com" />

                            <button className="btn bg-amber-300 text-slate-900 mt-2">ورود</button>
                        </form>
                    </div>



                </section>
            </main>

            <footer className="w-full py-2">
                <p className="text-slate-700 text-xs lg:text-sm w-full text-center">copyright 2022</p>
            </footer>
        </Fragment>
    );
}

export default Auth;