import { motion } from "framer-motion";
import { AnimatePresence, MotionConfig } from "framer-motion";
import { useState } from "react";
import { useEffect } from "react";
import Dropdown from "./Dropdown";
import Link from "next/dist/client/link";

const Header = ({ toggleNav, sidebarVisibility, setSidebarVisibility, user, handleLogout }) => {

    const [userDropdownVisibility, setUserDropdownVisibility] = useState(false)
    const [dropdownStatus, setDropdownStatus] = useState(false)

    const handleDropdownToggle = () => {

        if (userDropdownVisibility !== dropdownStatus) return;

        setDropdownStatus(1)
        setSidebarVisibility(false)
        setUserDropdownVisibility(true)
    }


    useEffect(() => {

        setDropdownStatus(userDropdownVisibility)

    }, [userDropdownVisibility])

    
    return (

        <header className="fixed top-0 drop-shadow-md z-20 h-16 w-full p-3 flex justify-between bg-slate-100 items-center">

            <div className="flex gap-x-2 items-center w-fit">

                <button className={`text-slate-900 text-lg lg:text-2xl h-12 w-12 rounded-full hover-transition ${sidebarVisibility ? "bg-slate-200" : "hover:bg-slate-200"}`} onClick={toggleNav}>
                    <i className="fa-regular fa-bars-staggered"></i>
                </button>

                <span className="text-base font-bold flex items-center gap-x-1">
                    مای مود
                    <i className="fa-regular fa-face-grin-wink text-amber-400 text-2xl"></i>
                </span>

            </div>

            <div className="flex gap-x-1 relative w-fit">

                {
                    !user ? (
                        <Link href="/login">
                            <button className="text-blue-600 text-xl  h-12 w-12 rounded-full hover-transition hover:bg-blue-100">
                                <i className="fa-solid fa-arrow-right-to-bracket"></i>
                            </button>
                        </Link>
                    ) : (
                        <span className="flex-center gap-x-2 text-xs lg:text-base text-slate-700 cursor-pointer hover:text-black hover-transition" onClick={() => handleDropdownToggle()}>
                            <span>{`سلام، ${user.name}`}</span>
                            {
                                userDropdownVisibility ? (
                                    <span key={1}>
                                        <i className="fa-light fa-angle-up"></i>
                                    </span>
                                ) : (
                                    <span key={0}>
                                        <i className="fa-light fa-angle-down"></i>
                                    </span>
                                )
                            }
                        </span>
                    )
                }
                <AnimatePresence>
                    {userDropdownVisibility && (<Dropdown handleLogout={handleLogout} setUserDropdownVisibility={setUserDropdownVisibility} />)}
                </AnimatePresence>

            </div>


        </header>
    );
}

export default Header;

