import { AnimatePresence } from "framer-motion";
import { Fragment, useState } from "react";
import Header from "./Header";
import Nav from "./Nav";

const HomeLayout = ({ children }) => {

    const [navbarVisibility, setNavbarVisibility] = useState(false)

    const toggleNav = () => {
        setNavbarVisibility(!navbarVisibility)
    }

    return (
        <Fragment>
            <Header toggleNav={toggleNav} />
            <AnimatePresence>
                {navbarVisibility && (<Nav />)}
            </AnimatePresence>

            <main className="mt-16 lg:mx-56">

                {children}

            </main>

            <footer className="w-full py-2">
                <p className="text-slate-700 text-xs lg:text-sm w-full text-center">copyright 2022</p>
            </footer>
        </Fragment>
    );
}

export default HomeLayout;