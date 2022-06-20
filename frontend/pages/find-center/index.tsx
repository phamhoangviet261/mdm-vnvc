import type { NextPage } from "next";
import { Girl, Banner } from "components";
import Footer from "layouts/Footer";
import Header from "layouts/Header";
import Main from "layouts/Main";

const Home: NextPage = () => {
    return (
        <div
            style={{
                minHeight: "100vh",
                display: "flex",
                flexDirection: "column",
            }}
        >
            <Header />
            <Main>
                <Banner
                    title="Hiện đại và Đẳng cấp"
                    subTitle="hệ thống tiêm chủng"
                    description="Với hơn 30 phòng khám & phòng tiêm ở mỗi trung tâm"
                    src="/banner/1.png"
                />
            </Main>
            <Footer />
        </div>
    );
};

export async function getStaticProps() {
    return {
        props: {
            title: "Tìm trung tâm",
            description: "This is a description for homepage",
        },
    };
}

export default Home;
