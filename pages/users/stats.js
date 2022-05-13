import HomeLayout from "../../components/Layouts/HomeLayout";
import Stats from "../../components/Stats/Stats";
import { getStats } from "../../Services/app/user/userService";

const StatsPage = ({ types, data }) => {
    return (
        <HomeLayout>
            <Stats data={data} />
        </HomeLayout>
    );
}

StatsPage.getInitialProps = async () => {

    const res = await getStats()
    return {

        types: res.types,
        data: res.data

    }
}

export default StatsPage;