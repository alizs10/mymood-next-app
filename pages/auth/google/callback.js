import { serialize } from "cookie";
import { googleCallback } from "../../../Services/app/auth/authServices";

const GoogleCallbackPage = () => {}

GoogleCallbackPage.getInitialProps = async ({ query, res }) => {

    const { data, status } = await googleCallback(query)

    if (status == 200) {
        res.setHeader('Set-Cookie', serialize('_token', data.token, { path: '/' }));
        res.writeHead(301, { Location: '/' })
        res.end()
    }
    return {}
}
export default GoogleCallbackPage;
