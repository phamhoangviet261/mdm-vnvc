import type { NextPage } from "next";
import { LoginForm } from "components";
import Footer from "layouts/Footer";
import Header from "layouts/Header";
import Main from "layouts/Main";
import { Layout } from "styles/global.styled";

const Checkout: NextPage = () => {
    return (
        <Layout>
            <Header />
            <Main>
                <h1>llohe</h1>
            </Main>
            <Footer />
        </Layout>
    );
};

export async function getStaticProps() {
    return {
        props: {
            title: "Thanh toán",
            description: "This is a description for checkout page",
        },
    };
}

export default Checkout;
