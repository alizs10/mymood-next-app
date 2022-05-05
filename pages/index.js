import { Router } from "next/router";
import HomeLayout from "../components/Layouts/HomeLayout";
import Moods from "../components/Moods/Moods";
import { getMoods } from "../Services/app/moods/moodsServices";
import { isLoggedIn } from "../Services/app/user/userService";

const Home = ({ loggedUser, moods }) => {

  setInterval(() => {
    Router.replace(Router.asPath);
  }, 60000)

  return (
    <HomeLayout loggedUser={loggedUser}>

      <Moods moods={moods} />
    </HomeLayout>
  );
}

export async function getServerSideProps({ req }) {

  const loggedUser = await isLoggedIn(req.headers.cookie)
  const moods = await getMoods()

  return {
    props: {
      loggedUser, moods
    },
  }
}

export default Home;
