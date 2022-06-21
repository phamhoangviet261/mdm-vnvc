import type { NextPage } from "next";
import { LoginForm } from "components";
import Footer from "layouts/Footer";
import Header from "layouts/Header";
import Main from "layouts/Main";
import { Layout } from "styles/global.styled";

const Home: NextPage = () => {
    return (
        <Layout>
            <Header />
            <Main>
                <LoginForm />
            </Main>
            <Footer />
        </Layout>
    );
};

export async function getStaticProps() {
    return {
        props: {
            title: "Đăng nhập",
            description: "This is a description for login page",
        },
    };
}

export default Home;
