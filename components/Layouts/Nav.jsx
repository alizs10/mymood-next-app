const Nav = () => {
    return (
        <nav className="mt-16 w-full py-2 drop-shadow-md bg-slate-200 justify-evenly">
            <a href="" className="btn hover:bg-slate-300 hover-transition flex flex-col gap-2 text-xs w-fit">
                <i className="fa-light fa-user text-2xl"></i>
                <span>پروفایل من</span>
            </a>
            <a href="" className="btn hover:bg-slate-300 hover-transition flex flex-col gap-2 text-xs w-fit">
                <i className="fa-light fa-chart-mixed text-2xl"></i>
                <span>آمار کاربران</span>
            </a>
            <a href="" className="btn hover:bg-slate-300 hover-transition flex flex-col gap-2 text-xs w-fit">
                <i className="fa-light fa-info text-2xl"></i>
                <span>درباره مای مود</span>
            </a>

        </nav>
    );
}

export default Nav;