import HomeLayout from "../components/Layouts/HomeLayout";
import Moods from "../components/Moods/Moods";
import SendMood from "../components/SendMood/SendMood";

export const getServerSideProps = async function () {

  // api

  const user = {
    name: "کاربر 15",
    bio: "این جهنم، جای زندگی نیس"
  }

  if (!user) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    }
  }

  return {
    props: { user },
  }
}

export default function Home() {

  return (
    <HomeLayout>
      <SendMood />
      <Moods />
    </HomeLayout>
  )
}

