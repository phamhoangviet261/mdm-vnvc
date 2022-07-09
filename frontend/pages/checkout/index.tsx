import type { NextPage } from "next";
import axios from "axios";
import {
    InjectorInfo,
    RelatedInfo,
    Title,
    Item,
    exampleAnotherData,
    exampleSelfData,
} from "components";
import {
    OneCenterInterface,
    ListCenterInterface,
} from "components/pages/find-center/NearestCenter";
import Footer from "layouts/Footer";
import Header from "layouts/Header";
import Main from "layouts/Main";
import { Layout, Section } from "styles/global.styled";
import Image from "next/image";
import { Container, Grid } from "@mui/material";
import styled from "styled-components";
import { theme } from "styles/theme";
import { useEffect, useState, useContext } from "react";
import { RegisVcContext } from "components";
import myUrl from "components/config/config";
import BuyItem from "components/pages/buy-vaccine/BuyItem";
const TopContent = styled.div`
    margin-bottom: 30px;
    .heading-container {
        display: flex;
        background-color: ${theme?.colors?.grey8};
        padding: 30px 26px;
        margin-bottom: 20px;

        .logo-container {
            position: relative;
            height: 30px;
            width: 90px;
        }

        h2 {
            font-size: 22px;
            font-weight: 500;
            color: ${theme?.colors?.text};
            text-transform: uppercase;
        }

        .separate {
            font-size: 22px;
            transform: scale(1.5);
            display: inline-block;
            padding: 0 50px;
            font-weight: 300;
            color: #ddd;
        }
    }

    p {
        font-size: 15px;
        color: ${theme?.colors?.text};
    }
`;

const MainContent = styled.div``;
const ServiceContent = styled.div``;
const SubHeading = styled.div`
    font-size: 16px;
    font-weight: 500;
    color: #444;
    margin-top: 16px;
`;

const TabWrapper = styled.div`
    display: flex;
    align-items: center;
    margin-top: 10px;
    margin-bottom: 30px;
    .tab-title {
        display: inline-block;
        margin-right: 20px;
        color: black;
        font-weight: 600;
    }
    .tab-item {
        padding: 10px 20px;
        cursor: pointer;
        border-radius: 4px;
    }
    .active-tab {
        color: white;
        background-color: ${theme?.colors?.blue0};
    }
`;

const SubmitButton = styled.div`
    margin-top: 40px;
    border-radius: 6px;
    background-color: ${theme?.colors?.blue0};
    padding: 12px 26px;
    cursor: pointer;
    color: #fff;
    width: fit-content;
    transition: all 0.2s linear;
    &:hover {
        opacity: 0.9;
    }
`;

const ResultWrapper = styled.div`
    padding: 100px 100px 120px;
    background-color: ${theme?.colors?.blue0};
    position: relative;
    left: 50%;
    top: 160px;
    transform: translateX(-50%);
    width: 40%;
    border-radius: 10px;
    h2 {
        font-size: 24px;
        font-weight: 500;
        color: white;
        text-align: center;
    }
    .btn-result {
        margin-top: 20px;
        background-color: white;
        color: black;
        width: 40%;
        position: relative;
        left: 50%;
        transform: translateX(-50%);
        border-radius: 4px;
        cursor: pointer;
        text-align: center;
        font-size: 20px;
        padding: 12px 0;
        transition: all 0.2s linear;
        &:hover {
            background-color: ${theme?.colors?.pink4};
            color: white;
        }
    }
`;

const ChoosedVxContainer = styled.div`
    margin-top: 30px;
    background-color: #f2f3f7;
    padding: 10px 0 50px;
    border-radius: 10px;
    h2 {
        padding: 20px;
        font-size: 20px;
        text-transform: uppercase;
        font-weight: bold;
    }
    & > div {
        padding: 0 20px;
    }
`;

const Checkout: NextPage = () => {
    const [tabTypeRegis, setTabTypeRegis] = useState(true);
    const [center, setCenter] = useState("");
    const [injectDate, setInjectDate] = useState("");
    const [city, setCity] = useState("TP.HCM");
    const [centers, setCenters] = useState<OneCenterInterface[]>([]);
    const [listCenter, setListCenter] = useState<ListCenterInterface>();
    const [serviceInfoData, setServiceInfoData] = useState({
        city: "Thành phố Hồ Chí Minh",
        center: "VNVC quận 1",
        injectDate: "",
    });

    const [result, setResult] = useState(false);
    const regisVcContext = useContext(RegisVcContext);

    useEffect(() => {
        axios({
            method: "GET",
            url: `${myUrl}/center`,
            data: null,
        })
            .then(function (res) {
                setListCenter(res.data.data);
            })
            .catch(function (err) {
                console.log(err);
            });
    }, []);

    useEffect(() => {
        let arrCenters: Array<OneCenterInterface>;
        if (city == "TP.HCM") {
            arrCenters = listCenter?.["centerHCM"];
        } else {
            arrCenters = listCenter?.["centerHN"];
        }
        if (arrCenters && arrCenters.length > 0) {
            setCenters(arrCenters);
            setServiceInfoData({
                ...serviceInfoData,
                center: arrCenters[0].id,
            });
        }
    }, [city, listCenter]);

    function handleChangeServiceData(
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) {
        setServiceInfoData({
            ...serviceInfoData,
            [e.target.name]: e.target.value,
        });
    }

    function handleChangeCity(city: string) {
        setCity(city);
        setServiceInfoData({
            ...serviceInfoData,
            city: city,
        });
    }

    function handleSubmit() {
        const data = {
            customerId: regisVcContext.customerId,
            regisAnotherInfo: regisVcContext.regisAnotherInfo,
            serviceInfo: regisVcContext.serviceInfo,
            listVxBuy: regisVcContext.listVxBuy,
        };
        console.log("full data:", data);

        regisVcContext.updateListVxBuy([]);
        // axios({
        //     method: "POST",
        //     url: `${myUrl}/registervaccine/add`,
        //     data: data,
        // })
        //     .then(function (res) {
        //         console.log("handle result:", res);
        //         if (res.status === 200) {
        //             console.log("ccc");
        //             setResult(true);
        //         }
        //     })
        //     .catch(function (err) {
        //         console.log(err);
        //     });
    }

    function handleClickTabRegis() {
        setTabTypeRegis(!tabTypeRegis);
    }

    useEffect(() => {
        if (tabTypeRegis) {
            regisVcContext.updateRegisAnotherInfo(exampleAnotherData);
        }
    }, [tabTypeRegis]);

    useEffect(() => {
        regisVcContext.updateServiceInfo(serviceInfoData);
    }, [serviceInfoData]);

    return !result ? (
        <Layout>
            <Header />
            <Main>
                <Section style={{ paddingTop: "50px" }}>
                    <Container>
                        <TopContent>
                            <div className="heading-container">
                                <div className="logo-container">
                                    <Image
                                        priority
                                        src="/logo-vnvc.svg"
                                        alt="banner"
                                        layout="fill"
                                        objectFit="cover"
                                        objectPosition="left top"
                                    />
                                </div>
                                <span className="separate">|</span>
                                <h2>XÁC NHẬN MUA VẮC XIN</h2>
                            </div>
                        </TopContent>
                        <MainContent>
                            <TabWrapper>
                                <span className="tab-title">
                                    MUA VẮC XIN CHO:
                                </span>
                                {tabTypeRegis ? (
                                    <>
                                        <div className="tab-item active-tab">
                                            BẢN THÂN
                                        </div>
                                        <div
                                            className="tab-item"
                                            onClick={handleClickTabRegis}
                                        >
                                            NGƯỜI KHÁC
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div
                                            className="tab-item"
                                            onClick={handleClickTabRegis}
                                        >
                                            BẢN THÂN
                                        </div>
                                        <div className="tab-item active-tab">
                                            NGƯỜI KHÁC
                                        </div>
                                    </>
                                )}
                            </TabWrapper>
                            {tabTypeRegis ? <InjectorInfo /> : <RelatedInfo />}
                        </MainContent>
                        <ServiceContent>
                            <Title>THÔNG TIN DỊCH VỤ</Title>
                            <SubHeading>
                                Trung tâm VNVC mong muốn tiêm
                            </SubHeading>
                            <Grid container rowSpacing={2} columnSpacing={12}>
                                <Grid item xs={6}>
                                    <Item>
                                        <label
                                            className="label-required"
                                            htmlFor="city"
                                        >
                                            Tỉnh thành
                                        </label>
                                        <select
                                            onChange={(e) =>
                                                handleChangeCity(e.target.value)
                                            }
                                            id="city"
                                        >
                                            <option value="TP.HCM">
                                                TP Hồ Chí Minh
                                            </option>
                                            <option value="TP.Hà Nội">
                                                Hà Nội
                                            </option>
                                        </select>
                                    </Item>
                                </Grid>
                                <Grid item xs={6}>
                                    <Item>
                                        <label
                                            className="label-required"
                                            htmlFor="district"
                                        >
                                            Trung tâm VNVC
                                        </label>
                                        <select
                                            onChange={handleChangeServiceData}
                                            id="district"
                                            name="center"
                                        >
                                            {centers.length > 0 &&
                                                centers.map((item) => (
                                                    <option
                                                        key={item.id}
                                                        value={item.id}
                                                    >
                                                        {item.name}
                                                    </option>
                                                ))}
                                        </select>
                                    </Item>
                                </Grid>
                                <Grid item xs={12}>
                                    <Item>
                                        <label
                                            className="label-required"
                                            htmlFor="injectDate"
                                        >
                                            Ngày mong muốn tiêm
                                        </label>
                                        <input
                                            onChange={handleChangeServiceData}
                                            type="date"
                                            name="injectDate"
                                            id="injectDate"
                                            value={serviceInfoData.injectDate}
                                        />
                                    </Item>
                                </Grid>
                            </Grid>
                        </ServiceContent>
                        <ChoosedVxContainer>
                            <h2>DANH SÁCH VẮC XIN ĐĂNG KÝ</h2>
                            <Grid
                                container
                                rowSpacing={3}
                                columnSpacing={{ xs: 1, sm: 2, md: 4 }}
                            >
                                {regisVcContext.listVxBuy.map((item) => (
                                    <Grid key={item.id} item xs={3}>
                                        <BuyItem
                                            key={item.id}
                                            {...item}
                                            disabledButton={true}
                                        />
                                    </Grid>
                                ))}
                            </Grid>
                        </ChoosedVxContainer>
                        <SubmitButton onClick={handleSubmit}>
                            Xác nhận mua
                        </SubmitButton>
                    </Container>
                </Section>
            </Main>
            <Footer />
        </Layout>
    ) : (
        <Layout>
            <ResultWrapper>
                <h2>Bạn đã mua thành công</h2>
                <div className="btn-result" onClick={() => setResult(false)}>
                    OK
                </div>
            </ResultWrapper>
        </Layout>
    );
};

export async function getStaticProps() {
    return {
        props: {
            title: "Thanh toán",
            description: "This is a description for homepage",
        },
    };
}

export default Checkout;
