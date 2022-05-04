import HomeLayout from "../../components/Layouts/HomeLayout";
import Moods from "../../components/Moods/Moods";
import UserProfile from "../../components/UserProfile/UserProfile";

export default function UserProfilePage() { 
    return (
        <HomeLayout>
            <UserProfile pageType="1" />
            <Moods />
        </HomeLayout>
    )
 }