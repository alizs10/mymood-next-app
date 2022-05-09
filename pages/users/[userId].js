import { useState } from "react";
import HomeContext from "../../components/Context/HomeContext";
import HomeLayout from "../../components/Layouts/HomeLayout";
import Moods from "../../components/Moods/Moods";
import UserProfile from "../../components/UserProfile/UserProfile";
import { follow, getUserInfos, unfollow } from "../../Services/app/user/userService";
import { SwalNotify } from "../../Services/lib/alerts";

export default function UserProfilePage(props) {

    const [user, setUser] = useState(props.loggedUser)
    const [followStatus, setFollowStatus] = useState(props.isFollowed)
    const [followers, setFollowers] = useState(props.followers)

    const handleFollowUser = async (id) => {
        if (!props.loggedUser) {
            SwalNotify("دنبال کردن", "برای دنبال کردن کابران باید ابتدا وارد حساب کاربری خود شوید و یا ثبت نام کنید", "warning")
            return
        }
        const res = await follow(id)

        if (res) {
            setFollowers(res.followers)
            setFollowStatus(true)
            SwalNotify("دنبال کردن", `${props.user.name} با موفقیت دنبال شد`, "success")
        }
    }
    const handleUnFollowUser = async (id) => {

        const res = await unfollow(id)

        if (res) {
            setFollowers(res.followers)
            setFollowStatus(false)
            SwalNotify("دنبال نکردن", `${props.user.name} با موفقیت آنفالو شد`, "success")
        }
    }

    return (
        <HomeContext.Provider value={{ user, setUser }}>
            <HomeLayout>
                <UserProfile pageType="1" moodLength={props.moods.length} user={props.user} followers={followers} followings={props.followings} isFollowed={followStatus} handleFollowUser={handleFollowUser} handleUnFollowUser={handleUnFollowUser} />
                <Moods moods={props.moods} />
            </HomeLayout>
        </HomeContext.Provider>

    )
}


export async function getServerSideProps(context) {
    const user_id = context.params.userId
    const res = await getUserInfos(user_id, context.req.headers.cookie);

    if (user_id == res.loggedUser.id) {
        return {
            redirect: {
                permanent: false,
                destination: '/my-profile'
            }
        }
    }

    return {
        props: {
            user: res.user,
            moods: res.moods,
            followers: res.followers,
            followings: res.followings,
            isFollowed: res.isFollowed,
            loggedUser: res.loggedUser
        }
    }
}