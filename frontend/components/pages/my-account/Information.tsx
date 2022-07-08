import * as React from "react";
import { Grid } from "@mui/material";
import styled from "styled-components";
import { theme } from "styles/theme";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import myUrl from "config";

interface MyAccountInterface {
    id?: string;
    phoneNumber?: string;
    name?: string;
    address?: string;
    addressDetail?: string;
    invoices?: [];
    registerVaccine?: [];
    ccid?: string;
    gender?: string;
    dob?: string;
}

interface InformationProps {
    userData: MyAccountInterface;
}
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

interface CityInterface {
    city: string;
    districts: string[];
}

interface DistrictInterface {
    id: string;
    city: string;
    ward: string;
}

export default function InjectorInfo({ userData }: InformationProps) {
    const [addressId, setAddressId] = useState(userData.address);
    const [gender, setGender] = useState(userData.gender || "Nam");
    const [city, setCity] = useState("");
    const [district, setDistrict] = useState("");
    const [districts, setDistricts] = useState<DistrictInterface[]>([]);
    const [values, setValues] = useState({
        fullname: userData.name,
        dob: userData.dob.slice(0, 10) || "2022-07-01",
        gender: userData.gender || "Nam",
        city: "",
        district: "",
        address: userData.addressDetail,
        ccid: userData.ccid,
        phoneNumber: userData.phoneNumber,
    });

    const [listAddress, setListAddress] = useState([]);

    // set AddressID
    useEffect(() => {
        setAddressId(userData.address);
    }, []);

    // call api get list address
    useEffect(() => {
        axios({
            method: "GET",
            url: `${myUrl}/neo4j`,
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
            setCity(tempObj[0].city);
            setDistrict(tempObj[0].ward);
        }
    }, [listAddress, addressId]);

    // when city change => set Values and set new list Districts
    useEffect(() => {
        let arrDistricts = [];
        if (listAddress && listAddress.length > 0) {
            arrDistricts = listAddress.filter((item) => item.city == city);
            setDistricts(arrDistricts);
            setValues({
                ...values,
                district: arrDistricts[0].ward,
            });
        }
    }, [city]);

    useEffect(() => {
        setValues({
            ...values,
            city: city,
            district: district,
        });
    }, []);

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
                            onChange={handleChange}
                            type="text"
                            name="fullname"
                            id="fullname"
                            value={values.fullname}
                        />
                    </Item>
                </Grid>
                <Grid item xs={6}>
                    <Item>
                        <label className="label-required" htmlFor="birthday">
                            Ngày sinh người tiêm
                        </label>
                        <input
                            onChange={handleChange}
                            type="date"
                            name="dob"
                            id="dob"
                            value={values.dob}
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
                                    <div
                                        className="tab-item"
                                        onClick={() => handleChangeGender("Nữ")}
                                    >
                                        Nữ
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div
                                        className="tab-item"
                                        onClick={() =>
                                            handleChangeGender("Nam")
                                        }
                                    >
                                        Nam
                                    </div>
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
                            onChange={handleChange}
                            type="text"
                            name="ccid"
                            id="ccid"
                            value={values.ccid}
                        />
                    </Item>
                </Grid>
                <Grid item xs={6}>
                    <Item>
                        <label className="label-required" htmlFor="phoneNumber">
                            Số điện thoại
                        </label>
                        <input
                            onChange={handleChange}
                            type="text"
                            name="phoneNumber"
                            id="phoneNumber"
                            value={values.phoneNumber}
                        />
                    </Item>
                </Grid>
                <Grid item xs={6}>
                    <Item>
                        <label className="label-required" htmlFor="city">
                            Tỉnh thành
                        </label>
                        <select
                            onChange={(e) => handleChangeCity(e.target.value)}
                            id="city"
                        >
                            <option value="Hồ Chí Minh">TP Hồ Chí Minh</option>
                            <option value="Hà Nội">Hà Nội</option>
                        </select>
                    </Item>
                </Grid>
                <Grid item xs={6}>
                    <Item>
                        <label className="label-required" htmlFor="district">
                            Quận/Huyện
                        </label>
                        <select
                            onChange={handleChange}
                            id="district"
                            name="district"
                            defaultValue="Quận 2"
                        >
                            {districts.length > 0 &&
                                districts.map((item, index) => {
                                    if (item.ward == district) {
                                        return (
                                            <option
                                                selected
                                                key={index}
                                                value={item.ward}
                                            >
                                                {item.ward}
                                            </option>
                                        );
                                    } else {
                                        return (
                                            <option
                                                key={index}
                                                value={item.ward}
                                            >
                                                {item.ward}
                                            </option>
                                        );
                                    }
                                })}
                        </select>
                    </Item>
                </Grid>

                <Grid item xs={12}>
                    <Item>
                        <label className="label-required" htmlFor="address">
                            Số nhà, tên đường, phường/xã
                        </label>
                        <input
                            onChange={handleChange}
                            type="text"
                            name="address"
                            id="address"
                            value={values.address}
                        />
                    </Item>
                </Grid>
            </Grid>
            <SubmitButton>Xác nhận</SubmitButton>
        </InfoWrapper>
    );
}
