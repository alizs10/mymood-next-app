import { AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useEffect } from "react";
import Dropdown from "./Dropdown";

const Header = ({ toggleNav, setNavbarVisibility }) => {

    const [userDropdownVisibility, setUserDropdownVisibility] = useState(false)
    const [dropdownStatus, setDropdownStatus] = useState(false)

    const handleDropdownToggle = () => {

        if (userDropdownVisibility !== dropdownStatus) return;

        setDropdownStatus(1)
        setNavbarVisibility(false)
        setUserDropdownVisibility(true)
    }

    useEffect(() => {

        setDropdownStatus(userDropdownVisibility)

    }, [userDropdownVisibility])

    return (
        <header className="fixed top-0 w-full bg-slate-100 drop-shadow-md z-20 p-3 flex justify-between items-center">

            <div className="flex gap-x-2 items-center">

                <button className="text-slate-900 text-lg lg:text-2xl" onClick={toggleNav}>
                    <i className="fa-regular fa-bars-staggered"></i>
                </button>

                <span className="text-base font-bold flex items-center gap-x-1">
                    مای مود
                    <i className="fa-regular fa-face-grin-wink text-amber-400 text-xl"></i>
                </span>

            </div>

            <div className="flex gap-x-1 relative">
                <button className="btn bg-blue-700 text-slate-100 hidden">
                    <i className="fa-regular fa-arrow-right-to-bracket"></i>
                </button>
                <span className="flex-center gap-x-2 text-xs lg:text-base text-slate-700 cursor-pointer hover:text-black hover-transition" onClick={() => handleDropdownToggle()}>
                    <span>سلام، کاربر 7</span>
                    <i className="fa-light fa-angle-down"></i>
                </span>
                <AnimatePresence>
                    {userDropdownVisibility && (<Dropdown setUserDropdownVisibility={setUserDropdownVisibility} />)}
                </AnimatePresence>

            </div>


        </header>
    );
}

export default Header;
