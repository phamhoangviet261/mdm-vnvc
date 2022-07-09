import type { NextPage } from "next";
import Link from "next/link";
import { Banner } from "components";
import Footer from "layouts/Footer";
import Header from "layouts/Header";
import Main from "layouts/Main";
import styled from "styled-components";
import { Container } from "@mui/material";
import { theme } from "styles/theme";
import BuyVaccines from "components/pages/buy-vaccine/BuyVaccines";
import EventNoteRoundedIcon from "@mui/icons-material/EventNoteRounded";
import { RegisVcContext } from "components/context/RegisVcContext";
import { useState, useContext, useEffect } from "react";

const Wrap = styled.div`
    padding: 20px;
    display: grid;
    grid-template-columns: 3fr 1.5fr;
    background-color: #f2f3f7;
`;

const Left = styled.div`
    display: flex;
    flex-direction: column;
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
    margin-top: 20px;
    margin-left: 10px;
    border-radius: 16px;
    background-color: white;
    .right-title {
        color: #2a388f !important;
        padding: 32px 24px;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        border-bottom: 1px solid #e8e8e8;
        h2 {
            padding-left: 14px;
            font-size: 20px;
            font-weight: bold;
            letter-spacing: 1px;
        }
    }
    .right-body {
        padding: 0 24px;
    }
    .right-bottom {
        margin: 0 24px;
        .btn-register {
            text-transform: uppercase;
            background-color: #f39021;
            padding: 14px 20px;
            font-weight: 500;
            font-size: 18px;
            border-radius: 12px;
            text-align: center;
            cursor: pointer;
            color: white;
        }
        .deactive {
            background-color: #d6d6d6;
            cursor: not-allowed;
        }
    }
`;

const VaccineItem = styled.div`
    display: flex;
    margin-top: 24px;
    border-bottom: 1px dashed rgb(232, 232, 232);
    .item-left {
        flex: 1;
        h1 {
            color: #595959 !important;
            font-weight: bold;
            text-transform: uppercase;
            font-size: 20px;
        }
        p {
            padding-top: 8px;
            font-size: 16px;
            color: #2a388f !important;
        }
        span {
            display: inline-block;
            padding-top: 8px;
            color: #595959 !important;
            font-size: 16px;
        }
        .price {
            padding: 24px 0;
            color: #2a388f !important;
            font-weight: bold;
            text-align: right;
            font-size: 22px;
        }
    }
    .item-right {
        padding-left: 24px;
        span {
            font-size: 24px;
            line-height: 24px;
            cursor: pointer;
            color: #595959;
        }
    }
`;

const Empty = styled.div`
    padding: 40px 20px;
    color: #d6d6d6;
    text-transform: uppercase;
    font-size: 24px;
    font-style: italic;
    text-align: center;
`;

interface VaccineProps {
    createAt?: string;
    id: string;
    name: string;
    prevention: string;
    producingCountry: string;
    retailPrice: number;
    preorderPrice: number;
}

const Home: NextPage = () => {
    const [listVaccinesChoosed, setListVaccinesChoosed] = useState<
        VaccineProps[]
    >([]);
    const regisVcContext = useContext(RegisVcContext);

    useEffect(() => {
        setListVaccinesChoosed(regisVcContext.listVxBuy);
    }, []);

    useEffect(() => {
        console.log("ListVxBuy: ", regisVcContext.listVxBuy);
        setListVaccinesChoosed(regisVcContext.listVxBuy);
    }, [regisVcContext.listVxBuy]);

    function handleDelete(id: string) {
        let tempArr = listVaccinesChoosed.filter((v) => v.id !== id);
        console.log("hello:", tempArr);
        return regisVcContext.updateListVxBuy([...tempArr]);
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
                <Wrap>
                    <Left>
                        <BuyVaccines />
                    </Left>
                    <Right>
                        <div className="right-title">
                            <EventNoteRoundedIcon />
                            <h2>DANH SÁCH VẮC XIN CHỌN MUA</h2>
                        </div>
                        <div className="right-body">
                            {listVaccinesChoosed &&
                                listVaccinesChoosed.length > 0 &&
                                listVaccinesChoosed.map((item) => (
                                    <VaccineItem key={item.id}>
                                        <div className="item-left">
                                            <h1>{item.name}</h1>
                                            <p>Phòng bệnh: {item.prevention}</p>
                                            <span>
                                                Nguồn gốc:{" "}
                                                {item.producingCountry}
                                            </span>
                                            <div className="price">
                                                {item.preorderPrice.toLocaleString(
                                                    "vi"
                                                )}
                                                VNĐ
                                            </div>
                                        </div>
                                        <div className="item-right">
                                            <span
                                                onClick={() =>
                                                    handleDelete(item.id)
                                                }
                                            >
                                                &times;
                                            </span>
                                        </div>
                                    </VaccineItem>
                                ))}
                            {listVaccinesChoosed.length === 0 && (
                                <Empty>Danh sách trống</Empty>
                            )}
                        </div>
                        <div className="right-bottom">
                            {listVaccinesChoosed.length > 0 ? (
                                <Link href="/checkout">
                                    <div className="btn-register">
                                        Đăng ký mũi tiêm
                                    </div>
                                </Link>
                            ) : (
                                <div className="btn-register deactive">
                                    Đăng ký mũi tiêm
                                </div>
                            )}
                        </div>
                    </Right>
                </Wrap>
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
