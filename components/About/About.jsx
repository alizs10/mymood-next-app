const About = () => {
    return ( 
        <section className="flex flex-col gap-y-4 mx-2 pb-4">

        <span className="text-sm lg:text-base font-bold text-slate-700">
            <i className="fa-light fa-info text-2xl ml-2"></i>
            <span>درباره مای مود</span>
        </span>

        <p className="text-xs lg:text-sm text-slate-900 text-justify leading-5">
            شبکه اجتماعی مای مود به جهت ارزیابی حس و حال بخش کوچکی از اجتماع، ساخته شده است. کاربران مای مود می
            توانند با اشتراک گذاری احساسات لحظه ای خود با دیگران، به آنها و خود کمک کنند. حس همدردی، عشق، تلاش،
            شادی، غم و ... می تواند با دیگران تقسیم شود. دیگران را شاد کند، انگیزه دهد و غم و درد را تسکین دهد.
        </p>

        <p className="text-xs lg:text-sm font-bold">
            نظرات، پیشنهادات و انتقادات خود را برای سازنده مای مود ارسال کنید.
        </p>

        <div className="flex justify-evenly">

            <a className="flex flex-col" href="https://t.me/alizs10" target="_blank">
                <i className="fa-brands fa-telegram text-3xl"></i>
                <span className="text-xxs mt-1 text-slate-700 font-bold" style={{ direction: "ltr" }}>@alizs10</span>
            </a>
            <a className="flex flex-col" href="https://instagram.com/alizs10" target="_blank">
                <i className="fa-brands fa-instagram text-3xl"></i>
                <span className="text-xxs mt-1 text-slate-700 font-bold" style={{ direction: "ltr" }}>@alizs10</span>
            </a>

        </div>

    </section>
     );
}
 
export default About;