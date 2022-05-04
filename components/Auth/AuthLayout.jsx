import { Fragment } from "react";

const AuthLayout = ({children}) => {
    
    

    return (
        <Fragment>
            <main className="mt-16 lg:mx-56">

                <section className="grid grid-rows-6 h-screen">
                    <div className="row-span-1"></div>
                    <div className="row-span-3 flex flex-col justify-center mb-10">
                        <div className="flex flex-col gap-y-2">
                            <i className="fa-regular fa-face-grin-wink text-amber-300 text-7xl"></i>
                            <span className="text-center font-bold text-lg">مای مود</span>
                        </div>

                        {children}
                        
                    </div>



                </section>
            </main>

            <footer className="w-full py-2">
                <p className="text-slate-700 text-xs lg:text-sm w-full text-center">copyright 2022</p>
            </footer>
        </Fragment>
    );
}

export default AuthLayout;