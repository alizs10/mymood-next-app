import { motion } from "framer-motion";
import Link from "next/link";

const Sidebar = ({ user }) => {
    return (
        <motion.aside animate={{ x: [250, 0] }} exit={{ x: [0, 250] }} className="fixed top-16 flex flex-col gap-y-6 w-1/3 lg:w-1/6 h-screen py-2 bg-slate-100 z-20">
            <Link href="/">
                <a href=""
                    className="relative mt-16 flex-center gap-x-4 self-center rounded-full h-16 w-16 md:w-fit md:px-6 hover:bg-slate-50 hover-transition gap-2 text-xs">
                    <i className="fa-light fa-home text-2xl"></i>
                    <span className="hidden md:block">خانه</span>
                </a>
            </Link>
            {user && (
                <Link href="/my-profile">
                    <a
                        className="relative flex-center gap-x-4 self-center rounded-full h-16 w-16 md:w-fit md:px-6 hover:bg-slate-50 hover-transition gap-2 text-xs">
                        <i className="fa-light fa-user text-2xl"></i>
                        <span className="hidden md:block">پروفایل من</span>
                    </a>
                </Link>
            )}
            <Link href="/users/stats">
                <a
                    className="flex-center gap-x-4 self-center rounded-full h-16 w-16 md:w-fit md:px-6 hover:bg-slate-50 hover-transition gap-2 text-xs">
                    <i className="fa-light fa-chart-mixed text-2xl"></i>
                    <span className="hidden md:block">آمار کاربران</span>
                </a>
            </Link>
            <Link href="/about">
                <a
                    className="flex-center gap-x-4 self-center rounded-full h-16 w-16 md:w-fit md:px-6 hover:bg-slate-50 hover-transition gap-2 text-xs">
                    <i className="fa-light fa-info text-2xl"></i>
                    <span className="hidden md:block">درباره مای مود</span>
                </a>
            </Link>

        </motion.aside>
    );
}

export default Sidebar;