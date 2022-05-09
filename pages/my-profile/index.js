
import { AnimatePresence } from "framer-motion";
import { isEmpty } from "lodash";
import { useState } from "react";
import HomeContext from "../../components/Context/HomeContext";
import BlurBackgtuond from "../../components/Layouts/BlurBackground";
import HomeLayout from "../../components/Layouts/HomeLayout";
import Moods from "../../components/Moods/Moods";
import UserProfile from "../../components/UserProfile/UserProfile";
import UserSettingsWindow from "../../components/UserProfile/UserSettingsWindow";
import { getUserProfileInfo, updateBio } from "../../Services/app/user/userService";
import { SwalNotify } from "../../Services/lib/alerts";

export default function MyProfilePage({ loggedUser, moods, followers, followings }) {

    const [user, setUser] = useState(loggedUser)
    const [bio, setBio] = useState(isEmpty(loggedUser.bio) ? "" : loggedUser.bio)
    const [userSettingsWindowVisibility, setUserSettingsVisibility] = useState(false)

    const handleUpdateBio = async () => {

        let newBio = {
            bio, _method: "PUT"
        }

        const res = await updateBio(newBio)
        if (res) {
            setUser({...loggedUser, bio})
            setUserSettingsVisibility(false)
            SwalNotify("بروزرسانی پروفایل", "پروفایل کاربری شما با موفقیت بروزرسانی شد", "success")
        }
    }

    return (
        <HomeContext.Provider value={{ user, setUser }}>
            <HomeLayout>
                <UserProfile pageType="0" user={user} followers={followers} followings={followings} moodLength={moods.length} setUserSettingsVisibility={setUserSettingsVisibility} />
                <Moods moods={moods} pageType={0} />
            </HomeLayout>

            <AnimatePresence
                initial={false}
                exitBeforeEnter={true}
                onExitComplete={() => null}
            >
                {userSettingsWindowVisibility && (
                    <BlurBackgtuond setUserSettingsVisibility={setUserSettingsVisibility}>
                        <UserSettingsWindow handleUpdateBio={handleUpdateBio} setUserSettingsVisibility={setUserSettingsVisibility} bio={bio} setBio={setBio} />
                    </BlurBackgtuond>
                )}
            </AnimatePresence>

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
            moods: res.moods,
            followers: res.followers,
            followings: res.followings
        }
    }
}