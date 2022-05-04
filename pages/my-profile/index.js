
import HomeLayout from "../../components/Layouts/HomeLayout";
import Moods from "../../components/Moods/Moods";
import UserProfile from "../../components/UserProfile/UserProfile";

export default function MyProfilePage() {
    return (
        <HomeLayout>
            <UserProfile pageType="0" />
            <Moods />
        </HomeLayout>
    )
}