import { AnimatePresence } from "framer-motion";
import { useState } from "react";
import AuthLayout from "../../components/Auth/AuthLayout";
import LoginForm from "../../components/Auth/LoginForm";
import PasswordForm from "../../components/Auth/PasswordForm";
import ResultMessage from "../../components/Auth/ResultMessage";
import { checkEmail, login, register } from "../../Services/app/auth/authServices";

export default function LoginPage() {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [passwordConfirmation, setPasswordConfirmation] = useState("")

    const [checkEmailRes, setCheckEmailRes] = useState("")
    const [resMessage, setResMessage] = useState("")

    const handleCheckEmail = async (e) => {
        e.preventDefault();

        var formData = new FormData();
        formData.append('email', email);

        try {
            const { data, status } = await checkEmail(formData)
            setCheckEmailRes(data.status)
            data.status ? setResMessage("برای ورود به حساب کاربری خود، کلمه عبور را وارد کنید") : setResMessage("برای ثبت نام، کلمه عبور خود را تعیین کنید")
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

            if (status == 200 & data.user) {
                console.log(data);
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

            console.log(data);
            
        } catch (error) {
            console.log(error);
        }

    }
    return (
        <AuthLayout>
            <AnimatePresence>
                {checkEmailRes === "" ? (
                    <LoginForm email={email} setEmail={setEmail} handleCheckEmail={handleCheckEmail} />
                ) : (
                    <div className="flex flex-col gap-y-2">
                        <ResultMessage message={resMessage} />
                        <PasswordForm handleSubmit={handleSubmit} password={password} setPassword={setPassword} passwordConfirmation={passwordConfirmation} setPasswordConfirmation={setPasswordConfirmation} checkEmailRes={checkEmailRes} />
                    </div>
                )}
            </AnimatePresence>
        </AuthLayout>
    )
}