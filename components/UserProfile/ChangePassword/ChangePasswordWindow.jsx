import { motion } from "framer-motion";
import { isEmpty } from "lodash";
import { useState } from "react";
import { changePassword } from "../../../Services/app/auth/authServices";
import { changePasswordValidation } from "../../../Services/app/validators/userProfileValidator";
import { SwalNotify } from "../../../Services/lib/alerts";

const ChangePasswordWindow = ({ setChangePasswordWinVisibility }) => {

    const [loading, setLoading] = useState(false)
    const [errors, setErrors] = useState({})
    const [oldPassword, setOldPassword] = useState("")
    const [password, setPassword] = useState("")
    const [passwordConfirmation, setPasswordConfirmation] = useState("")

    const handleChangePassword = async () => {

        if (loading) return;
        setLoading(true)

        let changePassData = {
            old_password: oldPassword,
            password,
            password_confirmation: passwordConfirmation,
        }

        const validator = changePasswordValidation(changePassData);
        if (validator.success) {
            setErrors({})

            try {
                const { data, status } = await changePassword(changePassData)

                if (status == 200) {
                    if (data.status) {
                        setChangePasswordWinVisibility(false)
                        SwalNotify("تغییر کلمه عبور", "کلمه عبور شما با موفقیت تغییر کرد", "success")
                    } else {
                        SwalNotify("تغییر کلمه عبور", "کلمه عبور پیشین شما صحیح نمی باشد", "error")

                    }
                } else {
                    SwalNotify("مشکلی پیش آمده است", "warning")
                }

            } catch (e) {
                var error = Object.assign({}, e);
                if (isEmpty(error.response)) {
                    if (error.isAxiosError) {
                        SwalNotify("تغییر کلمه عبور", 'مشکلی در برقراری ارتباط رخ داده است، از اتصال خود به اینترنت اطمینان حاصل کنید', 'error')
                    }
                } else {
                    if (error.response.status === 422) {
                        let errorsObj = error.response.data.errors;
                        let errorsArr = [];

                        Object.keys(errorsObj).map(key => {
                            errorsArr[key] = errorsObj[key][0]
                        })
                        setErrors(errorsArr)
                        SwalNotify("تغییر کلمه عبور", 'اطلاعات وارد شده صحیح نمی باشد', 'error')
                    } else {
                        SwalNotify("تغییر کلمه عبور", 'مشکلی رخ داده است', 'error')
                    }
                }
            }
        } else {
            setErrors(validator.errors)
        }

        setLoading(false)

    }



    const dropIn = {
        hidden: {
            y: "-100vh",
            opacity: 0,
        },
        visible: {
            y: "0",
            opacity: 1,
            transition: {
                duration: 0.1,
                type: "spring",
                damping: 25,
                stiffness: 500,
            },
        },
        exit: {
            y: "100vh",
            opacity: 0,
        },
    };

    return (
        <motion.div
            onClick={(e) => e.stopPropagation()}
            variants={dropIn}
            initial="hidden"
            animate="visible"
            exit="exit" className="p-4 w-full md:rounded-lg md:drop-shadow-lg md:w-3/5 z-30 bg-slate-300">

            <div className="w-12 h-12 flex-center">
                <button className="rounded-full w-full h-full flex-center hover-transition hover:bg-white" onClick={() => setChangePasswordWinVisibility(false)}>
                    <i className="fa-regular fa-xmark text-lg text-gray-500"></i>
                </button>
            </div>

            <div className="flex flex-col gap-y-2 mt-4">

                <div className="flex flex-col gap-y-1 border p-2 rounded-lg">
                    <label className="text-gray-700 text-xs" htmlFor="oldPassword">کلمه عبور فعلی</label>
                    <input type="password" value={oldPassword} onChange={(event) => setOldPassword(event.target.value)} className="form-control block w-full px-3 py-2 text-base font-normal text-gray-700 bg-white bg-clip-padding border-2 border-solid rounded-lg transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-amber-400 focus:outline-none placeholder:text-xxs" />
                    {errors.old_password && (<span className="text-xxs text-red-500 mt-2">{errors.old_password}</span>)}
                    <label className="text-gray-700 text-xs" htmlFor="password">کلمه عبور جدید</label>
                    <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} className="form-control block w-full px-3 py-2 text-base font-normal text-gray-700 bg-white bg-clip-padding border-2 border-solid rounded-lg transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-amber-400 focus:outline-none placeholder:text-xxs" />
                    {errors.password && (<span className="text-xxs text-red-500 mt-2">{errors.password}</span>)}
                    <label className="text-gray-700 text-xs" htmlFor="password">تکرار کلمه عبور جدید</label>
                    <input type="password" value={passwordConfirmation} onChange={(event) => setPasswordConfirmation(event.target.value)} className="form-control block w-full px-3 py-2 text-base font-normal text-gray-700 bg-white bg-clip-padding border-2 border-solid rounded-lg transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-amber-400 focus:outline-none placeholder:text-xxs" />
                    {errors.password_confirmation && (<span className="text-xxs text-red-500 mt-2">{errors.password_confirmation}</span>)}

                </div>

                <button className="btn text-sm bg-emerald-400" onClick={() => handleChangePassword()}>تغییر کلمه عبور</button>
            </div>


        </motion.div>
    );
}

export default ChangePasswordWindow;