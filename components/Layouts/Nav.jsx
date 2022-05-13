import { motion } from "framer-motion";
import Link from "next/link";

const Nav = ({ user }) => {
    return (
        <motion.nav animate={{ y: [-200, 0] }} exit={{ y: [0, -200] }} className="grid grid-cols-3 w-full py-2">
            <Link href="/">
                <span className="col-span-1 btn flex-center hover:bg-slate-200 hover-transition text-xs cursor-pointer flex flex-col gap-2">
                    <i className="fa-light fa-home text-2xl"></i>
                    <span>خانه</span>
                </span>
            </Link>
            {user && (
                <Link href="/my-profile">
                    <span className="col-span-1 btn flex-center hover:bg-slate-200 hover-transition text-xs cursor-pointer flex flex-col gap-2">
                        <i className="fa-light fa-user text-2xl"></i>
                        <span>پروفایل من</span>
                    </span>
                </Link>
            )}
            <Link href="/users/stats">
                <span className="col-span-1 btn flex-center hover:bg-slate-200 hover-transition text-xs cursor-pointer flex flex-col gap-2">
                    <i className="fa-light fa-chart-mixed text-2xl"></i>
                    <span>آمار کاربران</span>
                </span>
            </Link>
            <Link href="/about">
                <span className="col-span-1 btn flex-center hover:bg-slate-200 hover-transition text-xs cursor-pointer flex flex-col gap-2">
                    <i className="fa-light fa-info text-2xl"></i>
                    <span>درباره مای مود</span>
                </span>
            </Link>

        </motion.nav>
    );
}

export default Nav;