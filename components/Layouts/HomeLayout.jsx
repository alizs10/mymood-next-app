import { Fragment, useContext, useState } from "react";
import { logoutUser } from "../../Services/app/user/userService";
import HomeContext from "../Context/HomeContext";
import { AnimatePresence } from "framer-motion";
import { useRouter } from "next/router";
import { ToastContainer } from "react-toastify";
import Sidebar from "./Sidebar";
import Header from "./Header";
import SidebarBackdrop from "./SidebarBackdrop";
import Backdrop from "./Backdrop";
import ChangePasswordWindow from "../UserProfile/ChangePassword/ChangePasswordWindow";



const HomeLayout = ({ children }) => {
    const router = useRouter()

    const { user, setUser } = useContext(HomeContext)

    const [sidebarVisibility, setSidebarVisibility] = useState(false)
    const [changePasswordWinVisibility, setChangePasswordWinVisibility] = useState(false)

    const toggleNav = () => {
        setSidebarVisibility(!sidebarVisibility)
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

            <Header handleLogout={handleLogout} user={user} toggleNav={toggleNav} sidebarVisibility={sidebarVisibility} setSidebarVisibility={setSidebarVisibility} setChangePasswordWinVisibility={setChangePasswordWinVisibility} />

            <AnimatePresence>
                {sidebarVisibility && (
                    <SidebarBackdrop onClick={setSidebarVisibility}>
                        <Sidebar user={user} />
                    </SidebarBackdrop>
                )}
            </AnimatePresence>
            <AnimatePresence>
                {changePasswordWinVisibility && (
                    <Backdrop onClick={setChangePasswordWinVisibility}>
                        <ChangePasswordWindow setChangePasswordWinVisibility={setChangePasswordWinVisibility} />
                    </Backdrop>
                )}
            </AnimatePresence>
            <main className="mt-20 lg:mx-56 relative flex flex-col gap-y-2">

                {children}

            </main>

            <footer className="w-full py-2">
                <p className="text-slate-700 text-xs lg:text-sm w-full text-center">Copyright
                    <i className="fa-regular fa-copyright mx-2"></i>
                    2022 All Rights Reserved</p>
            </footer>
            <ToastContainer />

        </Fragment>
    );
}

export default HomeLayout;