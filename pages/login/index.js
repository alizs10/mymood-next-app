import { AnimatePresence } from "framer-motion";
import { useRouter } from "next/router";
import { useState } from "react";
import AuthLayout from "../../components/Auth/AuthLayout";
import LoginForm from "../../components/Auth/LoginForm";
import PasswordForm from "../../components/Auth/PasswordForm";
import ResultMessage from "../../components/Auth/ResultMessage";
import VerificationCodeForm from "../../components/Auth/VerificationCodeForm";
import { checkEmail, checkVCode, login, register } from "../../Services/app/auth/authServices";
import { isLoggedIn, loginUser } from "../../Services/app/user/userService";
import { emailValidator, passwordValidator, passwordWithConfirmationValidator, vcodeValidator } from "../../Services/app/validators/authValidator";

export default function LoginPage() {

    const [loading, setLoading] = useState(false)
    const [errors, setErrors] = useState({})

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [passwordConfirmation, setPasswordConfirmation] = useState("")

    const [checkEmailRes, setCheckEmailRes] = useState("")
    const [vcodeRes, setVCodeRes] = useState(false)
    const [resMessage, setResMessage] = useState("")

    const router = useRouter();


    const handleCheckEmail = async (e) => {
        e.preventDefault();

        if (loading) return;

        setLoading(true)

        const validator = emailValidator({ email })

        if (validator.success) {
            setErrors({})
            var formData = new FormData();
            formData.append('email', email);

            try {
                const { data, status } = await checkEmail(formData)
                setCheckEmailRes(data.status)
                if (data.status) setVCodeRes(true)
                data.status ? setResMessage("برای ورود به حساب کاربری خود، کلمه عبور را وارد کنید") : setResMessage("کد تایید به ایمیل شما ارسال شد")
            } catch (error) {
                console.log(error);
            }
        } else {
            setErrors(validator.errors)
        }



        setLoading(false)
    }

    const handleSubmit = e => {
        e.preventDefault();
        checkEmailRes ? handleLogin() : handleRegister()
    }

    const handleRegister = async () => {

        if (loading) return;

        setLoading(true)

        const validator = passwordWithConfirmationValidator({ password, password_confirmation: passwordConfirmation })

        if (validator.success) {
            setErrors({})
            var formData = new FormData();
            formData.append('email', email);
            formData.append('password', password);
            formData.append('password_confirmation', passwordConfirmation);

            try {
                const { data, status } = await register(formData)

                if (status == 200) {
                    setResMessage("ثبت نام شما با موفقیت انجام شد. می توانید وارد شوید")
                    setCheckEmailRes(true)
                }

            } catch (error) {
                console.log(error);
            }
        } else {
            setErrors(validator.errors)
        }
        setLoading(false)

    }

    const handleLogin = async () => {
        if (loading) return;

        setLoading(true)

        const validator = passwordValidator({ password })

        if (validator.success) {
            setErrors({})
            var formData = new FormData();
            formData.append('email', email);
            formData.append('password', password);

            try {
                const { data, status } = await login(formData)

                if (status == 200) {
                    loginUser(data.token)
                    router.push("/")
                }

            } catch (error) {
                console.log(error);
            }
        } else {
            setErrors(validator.errors)
        }
        setLoading(false)

    }

    const handleCheckVCode = async (vcode) => {
        if (loading) return;

        setLoading(true)
        const validator = vcodeValidator({ verification_code: vcode })

        if (validator.success) {
            setErrors({})
            const form = new FormData();
            form.append("email", email);
            form.append("verification_code", vcode);

            try {
                const { data, status } = await checkVCode(form)
                if (status == 200) {
                    setResMessage("برای تکمیل ثبت نام خود، کلمه عبور را تعیین کنید")
                    setVCodeRes(true)
                }
            } catch (error) {

            }
        } else {
            setErrors(validator.errors)
        }
        setLoading(false)

    }


    return (
        <AuthLayout>
            <AnimatePresence>
                {checkEmailRes === "" ? (
                    <div className="flex flex-col gap-y-2">
                        <ResultMessage message={resMessage} />
                        <LoginForm loading={loading} errors={errors} email={email} setEmail={setEmail} handleCheckEmail={handleCheckEmail} />
                    </div>
                ) : (
                    !vcodeRes ? (
                        <div className="flex flex-col gap-y-2">
                            <ResultMessage message={resMessage} />
                            <VerificationCodeForm loading={loading} errors={errors} handleCheckVCode={handleCheckVCode} />
                        </div>
                    ) : (
                        <div className="flex flex-col gap-y-2">
                            <ResultMessage message={resMessage} />
                            <PasswordForm loading={loading} errors={errors} handleSubmit={handleSubmit} password={password} setPassword={setPassword} passwordConfirmation={passwordConfirmation} setPasswordConfirmation={setPasswordConfirmation} checkEmailRes={checkEmailRes} />
                        </div>
                    )
                )}
            </AnimatePresence>
        </AuthLayout>
    )


}

export async function getServerSideProps({ req }) {
    const user = await isLoggedIn(req.headers.cookie)

    if (user) {
        return {
            redirect: {
                permanent: false,
                destination: '/'
            }
        }
    }

    return { props: {} }

}