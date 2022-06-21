import type { NextPage } from "next";
import { Banner, NearestCenter } from "components";
import Footer from "layouts/Footer";
import Header from "layouts/Header";
import Main from "layouts/Main";
import { Layout, Section } from "styles/global.styled";
import { Container } from "@mui/material";

const Home: NextPage = () => {
    return (
        <Layout>
            <Header />
            <Main>
                <Banner
                    title="Hiện đại và Đẳng cấp"
                    subTitle="hệ thống tiêm chủng"
                    description="Với hơn 30 phòng khám & phòng tiêm ở mỗi trung tâm"
                    src="/banner/1.png"
                />
                <Section>
                    <Container>
                        <NearestCenter/>
                    </Container>
                </Section>
            </Main>
            <Footer />
        </Layout>
    );
};

export async function getStaticProps() {
    return {
        props: {
            title: "Tìm trung tâm",
            description: "This is a description for find center page",
        },
    };
}

export default Home;
