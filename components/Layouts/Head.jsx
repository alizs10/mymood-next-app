import { AnimatePresence } from "framer-motion";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import { logoutUser } from "../../Services/app/user/userService";
import HomeContext from "../Context/HomeContext";
import Header from "./Header";
import Nav from "./Nav";

const Head = () => {
    const router = useRouter()

    const { user, setUser } = useContext(HomeContext)

    const [navbarVisibility, setNavbarVisibility] = useState(false)

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

        <div className="fixed top-0 w-full flex flex-col bg-slate-100 drop-shadow-md z-20">
            <Header handleLogout={handleLogout} user={user} toggleNav={toggleNav} navbarVisibility={navbarVisibility} setNavbarVisibility={setNavbarVisibility} />
            <AnimatePresence>
                {navbarVisibility && (<Nav user={user} />)}
            </AnimatePresence>
        </div>

    );
}

export default Head;