import HomeLayout from "../components/Layouts/HomeLayout";
import Moods from "../components/Moods/Moods";
import SendMood from "../components/SendMood/SendMood";

export default function Home() {
  return (
    <HomeLayout>
      <SendMood />
      <Moods />
    </HomeLayout>
  )
}
