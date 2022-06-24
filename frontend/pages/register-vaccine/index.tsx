import type { NextPage } from "next";
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

interface CenterInterface {
    city: string;
    centers: string[];
}

const data: Array<CenterInterface> = [
    {
        city: "Thành phố Hồ Chí Minh",
        centers: [
            "VNVC quận 1",
            "VNVC quận 2",
            "VNVC quận 3",
            "VNVC quận 4",
            "VNVC quận 5",
            "VNVC quận 6",
            "VNVC quận 7",
            "VNVC quận 8",
            "VNVC quận 9",
            "VNVC quận 10",
            "VNVC quận 11",
            "VNVC quận 12",
            "VNVC Bình Tân",
            "VNVC Bình Thạnh",
            "VNVC Gò Vấp",
            "VNVC Phú Nhuận",
            "VNVC Tân Bình",
            "VNVC Tân Phú",
            "VNVC Bình Chánh",
            "VNVC Cần Giờ",
            "VNVC Củ Chi",
            "VNVC Nhà Bè",
            "VNVC Hóc Môn",
            "VNVC Thủ Đức ",
        ],
    },
    {
        city: "Thành phố Hà Nội",
        centers: [
            "VNVC Ba Đình",
            "VNVC Bắc Từ Liêm",
            "VNVC Cầu Giấy",
            "VNVC Đống Đa",
            "VNVC Hà Đông",
            "VNVC Hai Bà Trưng",
            "VNVC Hoàn Kiếm",
            "VNVC Hoàng Mai",
            "VNVC Long Biên",
            "VNVC Nam Từ Liêm",
            "VNVC Tây Hồ",
            "VNVC Thanh Xuân",
            "VNVC Sơn Tây",
            "VNVC Chương Mỹ",
            "VNVC Đan Phượng",
            "VNVC Đông Anh",
            "VNVC Gia Lâm",
            "VNVC Hoài Đức",
            "VNVC Mê Linh",
            "VNVC Mỹ Đức",
            "VNVC Phú Xuyên",
            "VNVC Phúc Thọ",
            "VNVC Quốc Oai",
            "VNVC Sóc Sơn",
            "VNVC Thạch Thất",
            "VNVC Thanh Oai",
            "VNVC Thanh Trì",
            "VNVC Thường Tín",
            "VNVC Ứng Hoà",
        ],
    },
];

const Home: NextPage = () => {
    const [tabTypeRegis, setTabTypeRegis] = useState(true);
    const [tabTypeVaccine, setTabTypeVaccine] = useState(true);
    const [center, setCenter] = useState("");
    const [injectDate, setInjectDate] = useState("");
    const [city, setCity] = useState("Thành phố Hồ Chí Minh");
    const [centers, setCenters] = useState<string[]>([]);
    const [serviceInfoData, setServiceInfoData] = useState({
        city: "Thành phố Hồ Chí Minh",
        center: "VNVC quận 1",
        injectDate: "",
    });

    const regisVcContext = useContext(RegisVcContext);

    useEffect(() => {
        let arrCenters: Array<CenterInterface>;
        arrCenters = data.filter((item) => item.city == city);
        setCenters(arrCenters[0].centers);
        setServiceInfoData({
            ...serviceInfoData,
            center: arrCenters[0].centers[0],
        });
    }, [city]);

    function handleChangeServiceData(
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) {
        setServiceInfoData({
            ...serviceInfoData,
            [e.target.name]: e.target.value,
        });
    }

    useEffect(() => {
        console.log("service-data:", serviceInfoData);
    }, [serviceInfoData]);

    function handleChangeCity(city: string) {
        setCity(city);
        setServiceInfoData({
            ...serviceInfoData,
            city: city,
        });
    }

    function handleSubmit() {
        console.log("hehe:", regisVcContext.regisSelfInfo);
        console.log("hihi:", regisVcContext.regisAnotherInfo);
        console.log("huhu:", regisVcContext.listPackages);
        console.log("hoho:", regisVcContext.listVaccines);
    }

    function handleClickTabRegis() {
        setTabTypeRegis(!tabTypeRegis);
    }

    useEffect(() => {
        if (tabTypeRegis) {
            regisVcContext.updateRegisAnotherInfo(exampleAnotherData);
        } else {
            regisVcContext.updateRegisSelfInfo(exampleSelfData);
        }
    }, [tabTypeRegis]);

    useEffect(() => {
        if (tabTypeVaccine) {
            regisVcContext.updateListPackages([]);
        } else {
            regisVcContext.updateListVaccines([]);
        }
    }, [tabTypeVaccine]);

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
                                            <option value="Thành phố Hồ Chí Minh">
                                                TP Hồ Chí Minh
                                            </option>
                                            <option value="Thành phố Hà Nội">
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
                                        >
                                            {centers.length > 0 &&
                                                centers.map((item, index) => (
                                                    <option
                                                        key={index}
                                                        value={item}
                                                    >
                                                        {item}
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
                                            value={injectDate}
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
                            {tabTypeVaccine ? <Packages /> : <Vaccines />}
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

export async function getStaticProps() {
    return {
        props: {
            title: "Tìm trung tâm",
            description: "This is a description for homepage",
        },
    };
}

export default Home;
