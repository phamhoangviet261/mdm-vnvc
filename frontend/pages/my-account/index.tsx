import type { NextPage } from "next";
import React, { useState, useEffect, useContext } from "react";
import { Information, VcInjected, VcRecommend } from "components";
import Footer from "layouts/Footer";
import Header from "layouts/Header";
import Main from "layouts/Main";
import { Layout } from "styles/global.styled";
import styled from "styled-components";
import { Container } from "@mui/material";
import { theme } from "styles/theme";
import axios from "axios";
import myUrl from "components/config/config";
import Loading from "components/Loading";
const Title = styled.div`
    margin-top: 30px;
    padding-bottom: 10px;
    font-size: 16px;
    color: ${theme?.colors?.text};
    text-transform: uppercase;
    font-weight: 700;
`;

const Wrap = styled.div`
    padding: 20px;
    display: grid;
    grid-template-columns: 1fr 4fr;
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
        text-align: center;
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

export const Item = styled.div`
    margin-top: 10px;
    font-size: 16px;
    color: ${theme?.colors?.text};
    label {
        display: block;
        font-size: 14px;
        font-weight: 700;
        color: #000;
    }
    .label-required:before {
        content: "*";
        color: red;
    }
    input, select {
      margin-top: 10px;
      display: inline-block;
      height: 42px;
      line-height: 42px
      outline: none;
      border-radius: 4px;
      border: 1px solid #dcdfe6;
      padding: 0 15px;
      width: 100%;
    }
`;

const LoadingComponent = styled.div`
    margin: 20px auto;
    display: flex;
    justify-content: center;
    align-items: center;
    h2 {
        padding-left: 14px;
        font-size: 16px;
    }
`;
const Home: NextPage = () => {
    const [selectedOption, setSelectedOption] = useState("1");
    const [username, setUsername] = useState("");
    const [firstName, setFirstName] = useState("Danh");
    const [userData, setUserData] = useState<MyAccountInterface>({});
    useEffect(() => {
        let un = localStorage.getItem("username");
        setUsername(JSON.parse(un));
    }, []);

    useEffect(() => {
        if (username != "") {
            let url = `${myUrl}/customer/${username}`;
            axios({
                method: "GET",
                url: url,
                data: null,
            })
                .then(function (res) {
                    setUserData(res.data.data);
                    setFirstName(res.data.data.name);
                })
                .catch(function (err) {
                    console.log(err);
                });
        }
    }, [username]);

    useEffect(() => {
        console.log(userData);
    }, [userData]);
    if (userData.address && username) {
        return (
            <Layout>
                <Header />
                <Main>
                    <Container>
                        <Wrap>
                            <Left>
                                <h1>
                                    Xin ch??o <br /> {firstName}
                                </h1>
                                <ul>
                                    {selectedOption == "1" ? (
                                        <>
                                            <li className="active">
                                                Th??ng tin kh??ch h??ng
                                            </li>
                                            <li
                                                onClick={() =>
                                                    setSelectedOption("2")
                                                }
                                            >
                                                V???c xin ???? ti??m
                                            </li>
                                        </>
                                    ) : (
                                        <>
                                            <li
                                                onClick={() =>
                                                    setSelectedOption("1")
                                                }
                                            >
                                                Th??ng tin kh??ch h??ng
                                            </li>
                                            <li className="active">
                                                V???c xin ???? ch??ch
                                            </li>
                                        </>
                                    )}
                                </ul>
                            </Left>
                            <Right>
                                {selectedOption == "1" ? (
                                    <Information userData={userData} />
                                ) : (
                                    <>
                                        <Title>V???c xin ???? ti??m</Title>
                                        <VcInjected
                                            vaccines={userData.vaccinesDetail}
                                        />
                                        <Title>G???i ?? v???c xin</Title>
                                        <VcRecommend customerId={username} />
                                    </>
                                )}
                            </Right>
                        </Wrap>
                    </Container>
                </Main>
                <Footer />
            </Layout>
        );
    } else {
        return (
            <LoadingComponent>
                <Loading />
                <h2>Loading...</h2>
            </LoadingComponent>
        );
    }
};

interface MyAccountInterface {
    id?: string;
    phoneNumber?: string;
    name?: string;
    address?: string;
    addressDetail?: string;
    invoices?: [];
    registerVaccine?: [];
    vaccinesDetail?: [];
    ccid?: string;
    gender?: string;
    dob?: string;
}

export async function getStaticProps() {
    return {
        props: {
            title: "Th??ng tin c???a t??i",
            description: "This is a description for my account",
        },
    };
}

export default Home;
