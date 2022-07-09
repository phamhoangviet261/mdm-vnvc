import type { NextPage } from "next";
import { Girl, Banner } from "components";
import Footer from "layouts/Footer";
import Header from "layouts/Header";
import Main from "layouts/Main";
import HeaderAdvisory from "components/pages/advisory/HeaderAdvisory";
import QuestionCard from "components/pages/advisory/QuestionCard";
import styled from "styled-components";
import QuestionForm from "components/pages/advisory/QuestionForm";
import ListQuestion from "components/pages/advisory/ListQuestion";
import PaginationRounded from "../../components/Pagination";
import { useState } from "react";

const Container = styled.div`
    width: 90%;
    margin: 0 auto;
`

const BodyAdvisory = styled.div`
    display: flex;
    gap: 30px;
`

const AddQuestion = styled.div`
    width: 280px;
`

interface CustomerShortInfo {
    name: string;
    city: string;
}

interface QuestionInterface {
    id: string;
    customerShortInfo: CustomerShortInfo;
    content: string;
}

const Home: NextPage = () => {

    const [newQuestion, setNewQuestion] = useState<QuestionInterface>();

    const updateQuestion = (data: QuestionInterface) => {
        setNewQuestion(data);
    }

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
            <Container>
                <HeaderAdvisory />
                <BodyAdvisory>
                    <ListQuestion />
                    <AddQuestion>
                        <QuestionForm />
                    </AddQuestion>
                </BodyAdvisory>
                
            </Container>
            <Footer />
        </div>
    );
};

export async function getStaticProps() {
    return {
        props: {
            title: "Tư vấn",
            description: "This is a description for Tư vấn page",
        },
    };
}

export default Home;
