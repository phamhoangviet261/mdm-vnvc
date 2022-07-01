import * as React from "react";
import { Container, Grid } from "@mui/material";
import styled from "styled-components";
import { theme } from "styles/theme";
import { useEffect, useState, useContext } from "react";
import { RegisVcContext } from "components/context/RegisVcContext";
import axios from "axios";
export interface InjectorInfoProps {}
const InfoWrapper = styled.div``;
export const Title = styled.div`
    margin-top: 20px;
    font-size: 16px;
    color: ${theme?.colors?.text};
    text-transform: uppercase;
    font-weight: 700;
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

const TabWrapper = styled.div`
    margin-top: 10px;
    display: flex;
    align-items: center;
    .tab-title {
        display: inline-block;
        margin-right: 20px;
    }
    .tab-item {
        padding: 8px 70px;
        cursor: pointer;
        border-radius: 4px;
        border: 1px solid #dcdfe6;
    }
    .active-tab {
        color: white;
        background-color: ${theme?.colors?.blue0};
    }
`;

interface CityInterface {
    city: string;
    districts: string[];
}
const data: Array<CityInterface> = [
    {
        city: "Thành phố Hồ Chí Minh",
        districts: [
            "Quận 1",
            "Quận 3",
            "Quận 4",
            "Quận 5",
            "Quận 6",
            "Quận 7",
            "Quận 8",
            "Quận 10",
            "Quận 11",
            "Quận 12",
            "Quận Bình Tân",
            "Quận Bình Thạnh",
            "Quận Gò Vấp",
            "Quận Phú Nhuận",
            "Quận Tân Bình",
            "Quận Tân Phú",
            "Huyện Bình Chánh",
            "Huyện Cần Giờ",
            "Huyện Củ Chi",
            "Huyện Nhà Bè",
            "Huyện Hóc Môn",
            "Thành phố Thủ Đức ",
        ],
    },
    {
        city: "Thành phố Hà Nội",
        districts: [
            "Quận Ba Đình",
            "Quận Bắc Từ Liêm",
            "Quận Cầu Giấy",
            "Quận Đống Đa",
            "Quận Hà Đông",
            "Quận Hai Bà Trưng",
            "Quận Hoàn Kiếm",
            "Quận Hoàng Mai",
            "Quận Long Biên",
            "Quận Nam Từ Liêm",
            "Quận Tây Hồ",
            "Quận Thanh Xuân",
            "Thị xã Sơn Tây",
            "Huyện Chương Mỹ",
            "Huyện Đan Phượng",
            "Huyện Đông Anh",
            "Huyện Gia Lâm",
            "Huyện Hoài Đức",
            "Huyện Mê Linh",
            "Huyện Mỹ Đức",
            "Huyện Phú Xuyên",
            "Huyện Phúc Thọ",
            "Huyện Quốc Oai",
            "Huyện Sóc Sơn",
            "Huyện Thạch Thất",
            "Huyện Thanh Oai",
            "Huyện Thanh Trì",
            "Huyện Thường Tín",
            "Huyện Ứng Hoà",
        ],
    },
];

export const exampleSelfData = {
    fullname: "",
    birthday: "",
    gender: "",
    city: "",
    district: "",
    address: "",
    ccid: "",
    phoneNumber: "",
};

interface DistrictInterface {
    id: string;
    city: string;
    ward: string;
}

export default function InjectorInfo(props: InjectorInfoProps) {
    const [username, setUsername] = useState("");
    const [gender, setGender] = useState("Nam");
    const [city, setCity] = useState("Hồ Chí Minh");
    const [district, setDistrict] = useState("");
    const [districts, setDistricts] = useState<DistrictInterface[]>([]);
    const [values, setValues] = useState(exampleSelfData);
    const [addressId, setAddressId] = useState("");
    const [listAddress, setListAddress] = useState<DistrictInterface[]>([]);
    const regisVcContext = useContext(RegisVcContext);

    function handleChange(
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) {
        setValues({
            ...values,
            [e.target.name]: e.target.value,
        });
        console.log(values);
    }

    function handleChangeGender(gender: string) {
        setGender(gender);
        setValues({
            ...values,
            gender: gender,
        });
    }

    function handleChangeCity(city: string) {
        setCity(city);
        setValues({
            ...values,
            city: city,
        });
    }

    useEffect(() => {
        let un = JSON.parse(localStorage.getItem("username"));
        setUsername(un);
    }, []);

    useEffect(() => {
        if (username != "") {
            let url = `http://localhost:5000/customer/${username}`;
            console.log(url);
            axios({
                method: "GET",
                url: url,
                data: null,
            })
                .then(function (res) {
                    setValues({
                        ...values,
                        fullname: res.data.data.name,
                        phoneNumber: res.data.data.phoneNumber,
                        address: res.data.data.addressDetail,
                    });
                    setAddressId(res.data.data.address);
                })
                .catch(function (err) {
                    console.log(err);
                });
        }
    }, [username]);

    useEffect(() => {
        axios({
            method: "GET",
            url: "http://localhost:5000/neo4j",
            data: null,
        })
            .then(function (res) {
                setListAddress(res.data.data);
            })
            .catch(function (err) {
                console.log(err);
            });
    }, []);

    // set City, District after have listAddress
    useEffect(() => {
        let tempObj = [];
        if (addressId && listAddress && listAddress.length > 0) {
            tempObj = listAddress.filter((item) => item.id === addressId);
            setDistrict(tempObj[0].ward);
            setCity(tempObj[0].city);
        }
    }, [listAddress, addressId]);

    useEffect(() => {
        setValues({
            ...values,
            city: city,
            district: district,
        });
    }, [city, district]);

    return (
        <InfoWrapper>
            <Title>THÔNG TIN NGƯỜI TIÊM</Title>
            <Grid container rowSpacing={2} columnSpacing={12}>
                <Grid item xs={12}>
                    <Item>
                        <label className="label-required" htmlFor="fullname">
                            Họ và tên người tiêm
                        </label>
                        <input
                            type="text"
                            name="fullname"
                            id="fullname"
                            value={values.fullname}
                            disabled
                        />
                    </Item>
                </Grid>
                <Grid item xs={6}>
                    <Item>
                        <label className="label-required" htmlFor="birthday">
                            Ngày sinh người tiêm
                        </label>
                        <input
                            type="text"
                            name="birthday"
                            id="birthday"
                            value={values.birthday}
                            disabled
                        />
                    </Item>
                </Grid>
                <Grid item xs={6}>
                    <Item>
                        <label className="label-required" htmlFor="gender">
                            Giới tính
                        </label>
                        <TabWrapper>
                            {gender == "Nam" ? (
                                <>
                                    <div className="tab-item active-tab">
                                        Nam
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className="tab-item active-tab">
                                        Nữ
                                    </div>
                                </>
                            )}
                        </TabWrapper>
                    </Item>
                </Grid>
                <Grid item xs={6}>
                    <Item>
                        <label className="label-required" htmlFor="ccid">
                            CMND/CCCD
                        </label>
                        <input
                            type="text"
                            name="ccid"
                            id="ccid"
                            value={values.ccid}
                            disabled
                        />
                    </Item>
                </Grid>
                <Grid item xs={6}>
                    <Item>
                        <label className="label-required" htmlFor="phoneNumber">
                            Số điện thoại
                        </label>
                        <input
                            type="text"
                            name="phoneNumber"
                            id="phoneNumber"
                            value={values.phoneNumber}
                            disabled
                        />
                    </Item>
                </Grid>
                <Grid item xs={6}>
                    <Item>
                        <label className="label-required" htmlFor="city">
                            Tỉnh thành
                        </label>
                        <select id="city" disabled>
                            <option value={city}>Thành phố {city}</option>
                        </select>
                    </Item>
                </Grid>
                <Grid item xs={6}>
                    <Item>
                        <label className="label-required" htmlFor="district">
                            Quận/Huyện
                        </label>
                        <select id="district" name="district" disabled>
                            <option value={district}>{district}</option>
                        </select>
                    </Item>
                </Grid>

                <Grid item xs={12}>
                    <Item>
                        <label className="label-required" htmlFor="address">
                            Số nhà, tên đường, phường/xã
                        </label>
                        <input
                            type="text"
                            name="address"
                            id="address"
                            value={values.address}
                            disabled
                        />
                    </Item>
                </Grid>
            </Grid>
        </InfoWrapper>
    );
}
