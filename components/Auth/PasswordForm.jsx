import { BeatLoader } from "react-spinners";

const PasswordForm = ({ errors, loading, checkEmailRes, password, setPassword, passwordConfirmation, setPasswordConfirmation, handleSubmit, handleForgotPassword }) => {


    return (
        <form className="flex flex-col gap-y-2 w-3/4 lg:w-2/5 mt-4 self-center" onSubmit={e => handleSubmit(e)}>
            <label className="text-xs text-gray-500" htmlFor="password">کلمه عبور</label>
            <input type="password" value={password} className="form-control block w-full px-3 py-2 text-base font-normal text-gray-700 bg-white bg-clip-padding border-2 border-solid rounded-lg transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-amber-400 focus:outline-none" id="password" onChange={event => setPassword(event.target.value)} />
            {errors.password && (<span className="text-xxs text-red-500 mt-2">{errors.password}</span>)}

            {
                checkEmailRes ? (
                    <button type="button" className="text-xs text-gray-500 text-right" onClick={() => handleForgotPassword()}>فراموشی کلمه عبور</button>

                ) : (
                    <span className="flex flex-col gap-y-2">
                        <label className="text-xs text-gray-500" htmlFor="password_confirmation">تکرار کلمه عبور</label>
                        <input type="password" value={passwordConfirmation} className="form-control block w-full px-3 py-2 text-base font-normal text-gray-700 bg-white bg-clip-padding border-2 border-solid rounded-lg transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-amber-400 focus:outline-none" id="password_confirmation" onChange={event => setPasswordConfirmation(event.target.value)} />
                        {errors.password_confirmation && (<span className="text-xxs text-red-500 mt-2">{errors.password_confirmation}</span>)}

                    </span>
                )
            }
            {loading ? (
                <button className="btn bg-amber-300 text-slate-900 flex-center mt-2">
                    <BeatLoader color={"#000"} loading={loading} size={5} />
                </button>

            ) : (
                <button className="btn bg-amber-300 text-slate-900 mt-2">{checkEmailRes ? "ورود" : "ثبت نام و ورود"}</button>
            )}
        </form>
    );
}

export default PasswordForm;