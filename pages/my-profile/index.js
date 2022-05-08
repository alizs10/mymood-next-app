
import { useState } from "react";
import HomeContext from "../../components/Context/HomeContext";
import HomeLayout from "../../components/Layouts/HomeLayout";
import Moods from "../../components/Moods/Moods";
import UserProfile from "../../components/UserProfile/UserProfile";
import { getUserProfileInfo } from "../../Services/app/user/userService";

export default function MyProfilePage({ loggedUser, moods }) {

    const [user, setUser] = useState(loggedUser)

    return (
        <HomeContext.Provider value={{ user, setUser }}>
            <HomeLayout>
                <UserProfile pageType="0" user={user} />
                <Moods moods={moods} pageType={0} />
            </HomeLayout>
        </HomeContext.Provider>

    )
}

export async function getServerSideProps({ req }) {

    const res = await getUserProfileInfo(req.headers.cookie);
    if (!res) {
        return {
            redirect: {
                permanent: false,
                destination: '/'
            }
        }
    }

    return {
        props: {
            loggedUser: res.user,
            moods: res.moods
        }
    }
}