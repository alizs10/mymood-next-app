import OutsideClickHandler from "react-outside-click-handler";
import { motion } from "framer-motion";

const Dropdown = ({ setUserDropdownVisibility }) => {
    return (
        <OutsideClickHandler onOutsideClick={() => setUserDropdownVisibility(false)}>
            <motion.div animate={{ y: [-100, 0] }} exit={{ y: [0, -100] }} className="absolute top-8 lg:top-10 left-0 z-20 w-24 bg-slate-100 rounded-lg drop-shadow-lg p-2">
                <button className="text-xs w-full flex text-right gap-x-2 hover:text-red-500 hover-transition">
                    <i className="fa-light fa-door-open text-base"></i>
                    <span>خروج</span>
                </button>
            </motion.div>
        </OutsideClickHandler>
    );
}

export default Dropdown;