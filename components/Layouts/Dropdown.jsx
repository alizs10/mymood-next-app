import OutsideClickHandler from "react-outside-click-handler";
import { motion } from "framer-motion";

const Dropdown = ({ setUserDropdownVisibility, handleLogout }) => {

    const closeAndLogout = () => {
        setUserDropdownVisibility(false)
        handleLogout()
    }

    return (
        <OutsideClickHandler onOutsideClick={() => setUserDropdownVisibility(false)}>
            <motion.div animate={{ y: [-200, 0] }} exit={{ y: [0, -200] }} className="absolute top-8 lg:top-12 left-0 z-20 w-fit bg-slate-100 rounded-lg drop-shadow-lg p-2" onClick={() => closeAndLogout()}>
                <button className="text-xs w-full flex text-right gap-x-2 hover:text-red-500 hover-transition">
                    <i className="fa-light fa-key-skeleton text-base"></i>
                    <span>تغییر کلمه عبور</span>
                </button>
                <button className="text-xs w-full flex text-right gap-x-2 hover:text-red-500 hover-transition">
                    <i className="fa-light fa-door-open text-base"></i>
                    <span>خروج</span>
                </button>
            </motion.div>
        </OutsideClickHandler>
    );
}

export default Dropdown;