import type { NextPage } from "next";
import React, { useState, useEffect, useContext } from "react";
import { Banner, Information, VcInjected, VcRecommend } from "components";
import Footer from "layouts/Footer";
import Header from "layouts/Header";
import Main from "layouts/Main";
import { Layout } from "styles/global.styled";
import styled from "styled-components";
import { Container } from "@mui/material";
import { theme } from "styles/theme";
import axios from "axios";

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
            let url = `http://localhost:5000/customer/${username}`;
            axios({
                method: "GET",
                url: url,
                data: null,
            })
                .then(function (res) {
                    setUserData(res.data.data);
                })
                .catch(function (err) {
                    console.log(err);
                });
        }
    }, [username]);

    useEffect(() => {
        console.log(userData);
    }, [userData]);
    if (userData.address && userData.vaccinesDetail.length > 0 && username) {
        return (
            <Layout>
                <Header />
                <Main>
                    <Container>
                        <Wrap>
                            <Left>
                                <h1>Xin chào, {firstName}</h1>
                                <ul>
                                    {selectedOption == "1" ? (
                                        <>
                                            <li className="active">
                                                Thông tin khách hàng
                                            </li>
                                            <li
                                                onClick={() =>
                                                    setSelectedOption("2")
                                                }
                                            >
                                                Vắc xin đã tiêm
                                            </li>
                                        </>
                                    ) : (
                                        <>
                                            <li
                                                onClick={() =>
                                                    setSelectedOption("1")
                                                }
                                            >
                                                Thông tin khách hàng
                                            </li>
                                            <li className="active">
                                                Vắc xin đã chích
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
                                        <Title>Vắc xin đã tiêm</Title>
                                        <VcInjected
                                            vaccines={userData.vaccinesDetail}
                                        />
                                        <Title>Vắn xin liên quan</Title>
                                        <VcRecommend id={username} />
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
        return <h1>Loading</h1>;
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
}

export async function getStaticProps() {
    return {
        props: {
            title: "My Account",
            description: "This is a description for my account",
        },
    };
}

export default Home;
