import { useState } from "react";
import HomeContext from "../../components/Context/HomeContext";
import HomeLayout from "../../components/Layouts/HomeLayout";
import Stats from "../../components/Stats/Stats";
import { getStats, isLoggedIn } from "../../Services/app/user/userService";

const StatsPage = ({ types, data, loggedUser }) => {

    const [user, setUser] = useState(loggedUser)
    return (
        <HomeContext.Provider value={{ user, setUser }}>
            <HomeLayout>
                <Stats data={data} />
            </HomeLayout>
        </HomeContext.Provider>
    );
}

export async function getServerSideProps(ctx) {
    const res = await getStats()
    const loggedUser = await isLoggedIn(ctx.req.headers.cookie)
    return {
        props: {
            types: res.types,
            data: res.data,
            loggedUser
        },
    }
}

export default StatsPage;

