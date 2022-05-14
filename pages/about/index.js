import { useState } from "react";
import About from "../../components/About/About";
import HomeContext from "../../components/Context/HomeContext";
import HomeLayout from "../../components/Layouts/HomeLayout";
import { isLoggedIn } from "../../Services/app/user/userService";

export default function AboutPage({ loggedUser }) {

    const [user, setUser] = useState(loggedUser)

    return (
        <HomeContext.Provider value={{ user, setUser }}>

            <HomeLayout>
                <About />
            </HomeLayout>
        </HomeContext.Provider>

    )
}

export async function getServerSideProps(ctx) {

    const loggedUser = await isLoggedIn(ctx.req.headers.cookie)
    return {
        props: {
            loggedUser
        }, // will be passed to the page component as props
    }
}