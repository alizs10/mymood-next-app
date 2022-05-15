import { AnimatePresence } from "framer-motion";
import { useRouter } from "next/router";
import { useState } from "react";
import AuthLayout from "../../components/Auth/AuthLayout";
import PasswordForm from "../../components/Auth/PasswordForm";
import ResetPasswordForm from "../../components/Auth/RestPasswordForm";
import ResultMessage from "../../components/Auth/ResultMessage";
import { resetPassword } from "../../Services/app/auth/authServices";
import { passwordWithConfirmationValidator } from "../../Services/app/validators/authValidator";

const ResetPasswordPage = () => {

    const router = useRouter()

    const [errors, setErrors] = useState({})
    const [loading, setLoading] = useState(false)
    const [resetPasswordRes, setResetPasswordRes] = useState(false)
    const [password, setPassword] = useState("")
    const [passwordConfirmation, setPasswordConfirmation] = useState("")
    const [resMessage, setResMessage] = useState("")

    const handleResetPassword = async (e) => {
        e.preventDefault()
        if (loading) return

        setLoading(true)
        const validator = passwordWithConfirmationValidator({ password, password_confirmation: passwordConfirmation })

        if (validator.success) {
            setErrors({})
            let postData = new FormData;

            postData.append("email", router.query.email)
            postData.append("password", password)
            postData.append("password_confirmation", passwordConfirmation)
            postData.append("token", router.query.token)

            try {

                const { data, status } = await resetPassword(postData)

                if (status == 200) {
                    if (data.status) {
                        setLoading(false)
                        setPassword("")
                        setPasswordConfirmation("")
                        setResMessage("کلمه عبور شما با موفقیت تغییر کرد")
                        setResetPasswordRes(true)
                    } else {
                        setLoading(false)
                        setResMessage("لینک شما منقضی شده و یا نامعتبر است")
                    }
                }


            } catch (e) {
                setLoading(false)
                var error = Object.assign({}, e);
                console.log(error);
            }
        } else {
            setLoading(false)
            setErrors(validator.errors)
        }



    }

    const goToLogin = () => {
        router.push("/login")
    }

    return (
        <AuthLayout handleBack={goToLogin}>
            <AnimatePresence>
                {!resetPasswordRes ? (
                    <div className="flex flex-col gap-y-2">
                        <ResultMessage message={resMessage} />
                        <ResetPasswordForm loading={loading} errors={errors} handleSubmit={handleResetPassword} password={password} setPassword={setPassword} passwordConfirmation={passwordConfirmation} setPasswordConfirmation={setPasswordConfirmation} />
                    </div>
                ) : (
                    <div className="flex flex-col gap-y-2">
                        <ResultMessage message={resMessage} />
                        <button className="btn bg-amber-300 text-slate-900 flex-center mt-2" onClick={() => goToLogin()}>
                            برو به صفحه ورود
                        </button>
                    </div>
                )}
            </AnimatePresence>
        </AuthLayout>
    );
}

export default ResetPasswordPage;