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
import myUrl from "components/config/config";
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
        city: "Th??nh ph??? H??? Ch?? Minh",
        center: "VNVC qu???n 1",
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
            listPackages: regisVcContext.listPackages,
            listVaccines: regisVcContext.listVaccines,
        };
        console.log("full data:", data);

        axios({
            method: "POST",
            url: `${myUrl}/registervaccine/add`,
            data: data,
        })
            .then(function (res) {
                console.log("handle result:", res);
                if (res.status === 200) {
                    console.log("ccc");
                    setResult(true);
                }
            })
            .catch(function (err) {
                console.log(err);
            });
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
                                <h2>????NG K?? TI??M CH???NG</h2>
                            </div>
                            <p className="text">
                                ????ng k?? th??ng tin ti??m ch???ng ????? ti???t ki???m th???i
                                gian khi ?????n l??m th??? t???c t???i qu???y L??? t??n cho Qu??
                                Kh??ch h??ng, vi???c ????ng k?? th??ng tin ti??m ch???ng
                                ch??a h??? tr??? ?????t l???ch h???n ch??nh x??c theo gi???.
                            </p>
                        </TopContent>
                        <MainContent>
                            <TabWrapper>
                                <span className="tab-title">????NG K?? CHO:</span>
                                {tabTypeRegis ? (
                                    <>
                                        <div className="tab-item active-tab">
                                            B???N TH??N
                                        </div>
                                        <div
                                            className="tab-item"
                                            onClick={handleClickTabRegis}
                                        >
                                            NG?????I KH??C
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div
                                            className="tab-item"
                                            onClick={handleClickTabRegis}
                                        >
                                            B???N TH??N
                                        </div>
                                        <div className="tab-item active-tab">
                                            NG?????I KH??C
                                        </div>
                                    </>
                                )}
                            </TabWrapper>
                            {tabTypeRegis ? <InjectorInfo /> : <RelatedInfo />}
                        </MainContent>
                        <ServiceContent>
                            <Title>TH??NG TIN D???CH V???</Title>
                            <SubHeading>
                                Trung t??m VNVC mong mu???n ti??m
                            </SubHeading>
                            <Grid container rowSpacing={2} columnSpacing={12}>
                                <Grid item xs={6}>
                                    <Item>
                                        <label
                                            className="label-required"
                                            htmlFor="city"
                                        >
                                            T???nh th??nh
                                        </label>
                                        <select
                                            onChange={(e) =>
                                                handleChangeCity(e.target.value)
                                            }
                                            id="city"
                                        >
                                            <option value="TP.HCM">
                                                TP H??? Ch?? Minh
                                            </option>
                                            <option value="TP.H?? N???i">
                                                H?? N???i
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
                                            Trung t??m VNVC
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
                                            Ng??y mong mu???n ti??m
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
                                            Lo???i v???c xin mu???n ????ng k??
                                        </label>
                                        <TabWrapper>
                                            {tabTypeVaccine ? (
                                                <>
                                                    <div className="tab-item active-tab">
                                                        V???c xin g??i
                                                    </div>
                                                    <div
                                                        className="tab-item"
                                                        onClick={() =>
                                                            setTabTypeVaccine(
                                                                !tabTypeVaccine
                                                            )
                                                        }
                                                    >
                                                        V???c xin l???
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
                                                        V???c xin g??i
                                                    </div>
                                                    <div className="tab-item active-tab">
                                                        V???c xin l???
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
                            Ho??n th??nh ????ng k??
                        </SubmitButton>
                    </Container>
                </Section>
            </Main>
            <Footer />
        </Layout>
    ) : (
        <Layout>
            <ResultWrapper>
                <h2>B???n ???? ????ng k?? th??nh c??ng</h2>
                <div className="btn-result" onClick={() => setResult(false)}>
                    OK
                </div>
            </ResultWrapper>
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
        url: `${myUrl}/package/`,
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
        url: `${myUrl}/vaccine/`,
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
            title: "????ng k?? v???c xin",
            description: "This is a description for homepage",
            listCate,
            listPackage,
            listVaccines,
        },
    };
}

export default Home;
