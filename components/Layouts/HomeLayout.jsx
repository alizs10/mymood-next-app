import { AnimatePresence } from "framer-motion";
import { useRouter } from "next/router";
import { Fragment, useState } from "react";
import { useContext } from "react";
import { ToastContainer } from "react-toastify";
import { logoutUser } from "../../Services/app/user/userService";
import HomeContext from "../Context/HomeContext";
import Header from "./Header";
import Nav from "./Nav";

const HomeLayout = ({ children }) => {

    const { user, setUser } = useContext(HomeContext)
    const [navbarVisibility, setNavbarVisibility] = useState(false)

    const router = useRouter()

    const toggleNav = () => {
        setNavbarVisibility(!navbarVisibility)
    }

    const handleLogout = async () => {
        const loggedOut = await logoutUser()
        if (loggedOut) {
            router.replace("/")
            setUser(false)
        }
    }

    return (
        <Fragment>

            <Header handleLogout={handleLogout} user={user} toggleNav={toggleNav} setNavbarVisibility={setNavbarVisibility} />
            <AnimatePresence>
                {navbarVisibility && (<Nav user={user} />)}
            </AnimatePresence>

            <main className="mt-16 lg:mx-56">

                {children}

            </main>

            <footer className="w-full py-2">
                <p className="text-slate-700 text-xs lg:text-sm w-full text-center">copyright 2022</p>
            </footer>
            <ToastContainer />
            
        </Fragment>
    );
}

export default HomeLayout;