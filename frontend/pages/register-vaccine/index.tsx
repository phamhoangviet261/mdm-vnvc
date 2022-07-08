import type { NextPage } from "next";
import axios from "axios";
import {
    InjectorInfo,
    RelatedInfo,
    Title,
    Item,
    Packages,
    Vaccines,
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

const Home: NextPage = ({
    listCate,
    listPackage,
    listVaccines,
}: RegisterVaccinesInterface) => {
    const [tabTypeRegis, setTabTypeRegis] = useState(true);
    const [tabTypeVaccine, setTabTypeVaccine] = useState(true);
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

    const regisVcContext = useContext(RegisVcContext);

    useEffect(() => {
        axios({
            method: "GET",
            url: "http://localhost:5000/center",
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
            listPackages: regisVcContext.listPackages,
            listVaccines: regisVcContext.listVaccines,
        };
        console.log("full data:", data);

        // axios({
        //     method: "POST",
        //     url: "localhost:5000/registervaccine/add",
        //     data: data,
        // })
        //     .then(function (res) {
        //         console.log(res);
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
        if (tabTypeVaccine) {
            regisVcContext.updateListPackages([]);
        } else {
            regisVcContext.updateListVaccines([]);
        }
    }, [tabTypeVaccine]);

    useEffect(() => {
        regisVcContext.updateServiceInfo(serviceInfoData);
    }, [serviceInfoData]);

    return (
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
                                <h2>ĐĂNG KÝ TIÊM CHỦNG</h2>
                            </div>
                            <p className="text">
                                Đăng ký thông tin tiêm chủng để tiết kiệm thời
                                gian khi đến làm thủ tục tại quầy Lễ tân cho Quý
                                Khách hàng, việc đăng ký thông tin tiêm chủng
                                chưa hỗ trợ đặt lịch hẹn chính xác theo giờ.
                            </p>
                        </TopContent>
                        <MainContent>
                            <TabWrapper>
                                <span className="tab-title">ĐĂNG KÝ CHO:</span>
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
                                <Grid item xs={6}>
                                    <Item>
                                        <label
                                            className="label-required"
                                            htmlFor="gender"
                                        >
                                            Loại vắc xin muốn đăng ký
                                        </label>
                                        <TabWrapper>
                                            {tabTypeVaccine ? (
                                                <>
                                                    <div className="tab-item active-tab">
                                                        Vắc xin gói
                                                    </div>
                                                    <div
                                                        className="tab-item"
                                                        onClick={() =>
                                                            setTabTypeVaccine(
                                                                !tabTypeVaccine
                                                            )
                                                        }
                                                    >
                                                        Vắc xin lẻ
                                                    </div>
                                                </>
                                            ) : (
                                                <>
                                                    <div
                                                        className="tab-item"
                                                        onClick={() =>
                                                            setTabTypeVaccine(
                                                                !tabTypeVaccine
                                                            )
                                                        }
                                                    >
                                                        Vắc xin gói
                                                    </div>
                                                    <div className="tab-item active-tab">
                                                        Vắc xin lẻ
                                                    </div>
                                                </>
                                            )}
                                        </TabWrapper>
                                    </Item>
                                </Grid>
                            </Grid>
                            {tabTypeVaccine ? (
                                <Packages
                                    listCate2={listCate}
                                    listPackage2={listPackage}
                                />
                            ) : (
                                <Vaccines vaccines={listVaccines} />
                            )}
                        </ServiceContent>
                        <SubmitButton onClick={handleSubmit}>
                            Hoàn thành đăng ký
                        </SubmitButton>
                    </Container>
                </Section>
            </Main>
            <Footer />
        </Layout>
    );
};

interface TargetInterface {
    targetId: string;
    targetName: string;
}

interface VaccineInterface {
    vcid: string;
    numOfInjection: string;
}

interface PackagesListInterface {
    target: TargetInterface;
    vaccines: VaccineInterface[];
    _id: string;
    id: string;
    name: string;
    totalPrice: number;
    totalNumOfInjection: number;
    description: string[];
}

interface RegisterVaccinesInterface {
    listCate: TargetInterface[];
    listPackage: PackagesListInterface[];
    listVaccines: VaccinePropsInterface[];
}

interface VaccinePropsInterface {
    id: string;
    title: string;
    description: string;
    price: number;
}

function uniqueTarget(arr: PackagesListInterface[]) {
    let newArr = [];
    let temp = 0;
    arr.forEach(function (item) {
        temp = 0;
        for (let item2 of newArr) {
            if (item.target.targetId == item2.target.targetId) {
                temp = 1;
                break;
            }
        }
        if (temp == 0) {
            newArr.push(item);
        }
    });

    let result: TargetInterface[] = [];
    result = newArr.map((item) => item.target);
    return result;
}

export async function getStaticProps() {
    let listCate: TargetInterface[] = [];
    let listPackage: PackagesListInterface[] = [];
    let listVaccines: VaccinePropsInterface[] = [];
    await axios({
        method: "GET",
        url: "http://localhost:5000/package/",
        data: null,
    })
        .then(function (res) {
            console.log("hello");
            listCate = uniqueTarget(res.data.data);
            listPackage = res.data.data;
        })
        .catch(function (err) {
            console.log(err);
        });
    await axios({
        method: "GET",
        url: "http://localhost:5000/vaccine/",
        data: null,
    })
        .then(function (res) {
            listVaccines = res.data.data.map((item: any) => ({
                id: item.id,
                title: item.name,
                description: item.prevention,
                price: item.preorderPrice,
            }));
        })
        .catch(function (err) {
            console.log(err);
        });
    return {
        props: {
            title: "Tìm trung tâm",
            description: "This is a description for homepage",
            listCate,
            listPackage,
            listVaccines,
        },
    };
}

export default Home;
