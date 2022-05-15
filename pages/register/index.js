const RegisterPage = () => { }

RegisterPage.getInitialProps = ({res}) => {
    res.writeHead(301, { Location: '/login' })
    res.end()
}

export default RegisterPage;