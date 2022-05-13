
import { AnimatePresence } from "framer-motion";
import { isEmpty } from "lodash";
import { useState } from "react";
import HomeContext from "../../components/Context/HomeContext";
import HomeLayout from "../../components/Layouts/HomeLayout";
import Moods from "../../components/Moods/Moods";
import UserProfile from "../../components/UserProfile/UserProfile";
import UserSettingsWindow from "../../components/UserProfile/UserSettingsWindow";
import { getUserProfileInfo, updateBio } from "../../Services/app/user/userService";
import { bioValidator } from "../../Services/app/validators/userProfileValidator";
import { SwalNotify } from "../../Services/lib/alerts";
import BlurBackground from '../../components/Layouts/BlurBackground';
import MoodsComponentWithContext from "../../components/Moods/MoodsComponntWithContext";

export default function MyProfilePage({ loggedUser, moods, followers, followings }) {
    const [errors, setErrors] = useState({})
    const [user, setUser] = useState(loggedUser)
    const [bio, setBio] = useState(isEmpty(loggedUser.bio) ? "" : loggedUser.bio)
    const [userSettingsWindowVisibility, setUserSettingsVisibility] = useState(false)

    const handleUpdateBio = async () => {

        let newBio = {
            bio, _method: "PUT"
        }

        const validator = bioValidator(newBio)

        if (validator.success) {
            setErrors({})
            const res = await updateBio(newBio)
            if (res) {
                setUser({ ...loggedUser, bio })
                setUserSettingsVisibility(false)
                SwalNotify("بروزرسانی پروفایل", "پروفایل کاربری شما با موفقیت بروزرسانی شد", "success")
            }
        } else {
            setErrors(validator.errors)
        }


    }

    return (
        <MoodsComponentWithContext init_moods={moods}>
            <HomeContext.Provider value={{ user, setUser }}>
                <HomeLayout>
                    <UserProfile pageType="0" user={user} followers={followers} followings={followings} moodLength={moods.length} setUserSettingsVisibility={setUserSettingsVisibility} />
                    <Moods pageType={0} />
                </HomeLayout>

                <AnimatePresence
                    initial={false}
                    exitBeforeEnter={true}
                    onExitComplete={() => null}
                >
                    {userSettingsWindowVisibility && (
                        <BlurBackground setUserSettingsVisibility={setUserSettingsVisibility}>
                            <UserSettingsWindow errors={errors} handleUpdateBio={handleUpdateBio} setUserSettingsVisibility={setUserSettingsVisibility} bio={bio} setBio={setBio} />
                        </BlurBackground>
                    )}
                </AnimatePresence>

            </HomeContext.Provider>
        </MoodsComponentWithContext>

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