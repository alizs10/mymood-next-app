import { AnimatePresence } from "framer-motion";
import { useRouter } from "next/router";
import { Fragment, useState } from "react";
import { useContext } from "react";
import { ToastContainer } from "react-toastify";
import Head from "./Head";


const HomeLayout = ({ children }) => {

    return (
        <Fragment>
            <Head />
            

            <main className="mt-20 lg:mx-56 relative flex flex-col gap-y-2">

                {children}

            </main>

            <footer className="w-full py-2">
                <p className="text-slate-700 text-xs lg:text-sm w-full text-center">copyright 2022</p>
            </footer>
            <ToastContainer />

        </Fragment>
    );
}

export default HomeLayout;