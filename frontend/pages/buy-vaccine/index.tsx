import type { NextPage } from "next";
import { Banner } from "components";
import Footer from "layouts/Footer";
import Header from "layouts/Header";
import Main from "layouts/Main";
import styled from "styled-components";
import { Container } from "@mui/material";
import { theme } from "styles/theme";
import BuyVaccines from "components/pages/buy-vaccine/BuyVaccines";
const Wrap = styled.div`
    padding: 20px;
    display: grid;
    grid-template-columns: 4fr 1fr;
    background-color: #f2f3f7;
`;

const Left = styled.div`
    display: flex;
    flex-direction: column;
    border: 1px solid #dcdfe6;
    border-radius: 6px;
    padding: 20px 0;
    & > h5 {
        font-weight: bold;
    }
    h1 {
        padding: 0 10px;
        font-size: 22px;
        font-weight: 500;
        color: ${theme?.colors?.blue0};
    }
    ul {
        padding-top: 16px;
    }
    li {
        padding: 10px;
        cursor: pointer;
        transition: all 0.2s linear;
    }
    .active {
        background-color: ${theme?.colors?.blue0};
        color: white;
    }
`;

const Right = styled.div`
    margin-left: 20px;
    padding: 20px 10px;
`;

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
                <Container>
                    <Wrap>
                        <Left>
                            <BuyVaccines />
                        </Left>
                        <Right>HHello</Right>
                    </Wrap>
                </Container>
            </Main>
            <Footer />
        </div>
    );
};

export async function getStaticProps() {
    return {
        props: {
            title: "Mua vắc xin",
            description: "This is a description for homepage",
        },
    };
}

export default Home;
