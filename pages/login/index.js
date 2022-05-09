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

export default function LoginPage() {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [passwordConfirmation, setPasswordConfirmation] = useState("")

    const [checkEmailRes, setCheckEmailRes] = useState("")
    const [vcodeRes, setVCodeRes] = useState(false)
    const [resMessage, setResMessage] = useState("")

    const router = useRouter();


    const handleCheckEmail = async (e) => {
        e.preventDefault();

        var formData = new FormData();
        formData.append('email', email);

        try {
            const { data, status } = await checkEmail(formData)
            setCheckEmailRes(data.status)
            data.status ? setResMessage("برای ورود به حساب کاربری خود، کلمه عبور را وارد کنید") : setResMessage("کد تایید به ایمیل شما ارسال شد")
        } catch (error) {
            console.log(error);
        }
    }

    const handleSubmit = e => {
        e.preventDefault();
        checkEmailRes ? handleLogin() : handleRegister()
    }

    const handleRegister = async () => {

        var formData = new FormData();
        formData.append('email', email);
        formData.append('password', password);
        formData.append('password_confirmation', passwordConfirmation);

        try {
            const { data, status } = await register(formData)

            if (status == 200) {
                setCheckEmailRes(true)
            }

        } catch (error) {
            console.log(error);
        }

    }

    const handleLogin = async () => {

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

    }

    const handleCheckVCode = async (vcode) => {

        const form = new FormData();
        form.append("email", email);
        form.append("verification_code", vcode);
    
        try {
            const {data, status} = await checkVCode(form)
            if (status == 200) {
                setVCodeRes(true)
            }
        } catch (error) {
            
        }

    }


    return (
        <AuthLayout>
            <AnimatePresence>
                {checkEmailRes === "" ? (
                    <LoginForm email={email} setEmail={setEmail} handleCheckEmail={handleCheckEmail} />
                ) : (
                    !vcodeRes ? (
                        <div className="flex flex-col gap-y-2">
                            <ResultMessage message={resMessage} />
                            <VerificationCodeForm handleCheckVCode={handleCheckVCode} />
                        </div>
                    ) : (
                        <PasswordForm handleSubmit={handleSubmit} password={password} setPassword={setPassword} passwordConfirmation={passwordConfirmation} setPasswordConfirmation={setPasswordConfirmation} checkEmailRes={checkEmailRes} />
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