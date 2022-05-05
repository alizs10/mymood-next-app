import { AnimatePresence } from "framer-motion";
import { Fragment, useState } from "react";
import { logoutUser } from "../../Services/app/user/userService";
import SendMood from "../SendMood/SendMood";
import Header from "./Header";
import Nav from "./Nav";

const HomeLayout = ({ children, loggedUser }) => {

    const [user, setUser] = useState(loggedUser)
    const [navbarVisibility, setNavbarVisibility] = useState(false)

    const toggleNav = () => {
        setNavbarVisibility(!navbarVisibility)
    }

    const handleLogout = async () => {
        const loggedOut = await logoutUser()
        if (loggedOut) {
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
            {user && (<SendMood />)}
                {children}

            </main>

            <footer className="w-full py-2">
                <p className="text-slate-700 text-xs lg:text-sm w-full text-center">copyright 2022</p>
            </footer>
        </Fragment>
    );
}

export default HomeLayout;