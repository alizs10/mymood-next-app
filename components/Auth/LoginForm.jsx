import { Fragment } from "react";
import { BeatLoader } from "react-spinners";


const LoginForm = ({ errors, loading, email, setEmail, handleCheckEmail }) => {

    const googleLogo = require("./google.svg")

    return (
        <Fragment>
            <button href=""
                className="btn mt-4 bg-white w-3/4 lg:w-2/5 border-2 self-center flex justify-between items-center">
                <span className="text-xs lg:text-sm">ورود با گوگل</span>
                <img src={googleLogo.default.src} className="w-6" alt="google logo" />
            </button>
            <form className="flex flex-col w-3/4 lg:w-2/5 mt-4 self-center" onSubmit={e => handleCheckEmail(e)}>
                <label className="text-xs text-gray-500 mb-2" htmlFor="">ایمیل</label>
                <input type="email" value={email} className="form-control block w-full px-3 py-2 text-base font-normal text-gray-700 bg-white bg-clip-padding border-2 border-solid rounded-lg transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-amber-400 focus:outline-none" id="exampleFormControlInput1" placeholder="abc@example.com" onChange={event => setEmail(event.target.value)} />
                {errors.email && (<span className="text-xxs text-red-500 mt-2">{errors.email}</span>)}
                {loading ? (
                    <button className="btn bg-amber-300 text-slate-900 mt-2 flex-center">
                        <BeatLoader color={"#000"} loading={loading} size={5} />
                    </button>

                ) : (
                    <button className="btn bg-amber-300 text-slate-900 mt-2">ورود</button>
                )}
            </form>
        </Fragment>
    );
}

export default LoginForm;