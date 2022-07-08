import * as React from "react";
import { Container, Grid } from "@mui/material";
import styled from "styled-components";
import { theme } from "styles/theme";
import { useEffect, useState, useContext } from "react";
import { RegisVcContext } from "components/context/RegisVcContext";
import axios from "axios";
import myUrl from "config";

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
    const [values, setValues] = useState(exampleSelfData);
    const [addressId, setAddressId] = useState("");
    const [listAddress, setListAddress] = useState<DistrictInterface[]>([]);
    const [cusId, setCusId] = useState("");
    const regisVcContext = useContext(RegisVcContext);

    useEffect(() => {
        let un = JSON.parse(localStorage.getItem("username"));
        setUsername(un);
    }, []);

    useEffect(() => {
        if (username != "") {
            let url = `${myUrl}/customer/${username}`;
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
                        ccid: res.data.data.ccid,
                        birthday: res.data.data.dob.slice(0, 10),
                    });
                    setAddressId(res.data.data.address);
                    setCusId(res.data.data.id);
                })
                .catch(function (err) {
                    console.log(err);
                });
        }
    }, [username]);

    useEffect(() => {
        if (cusId != "") {
            regisVcContext.updateCustomerId(cusId);
        }
    }, [cusId]);

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
                        <input
                            type="text"
                            name="city"
                            id="city"
                            disabled
                            value={city}
                        />
                    </Item>
                </Grid>
                <Grid item xs={6}>
                    <Item>
                        <label className="label-required" htmlFor="district">
                            Quận/Huyện
                        </label>
                        <input
                            type="text"
                            name="district"
                            id="district"
                            disabled
                            value={district}
                        />
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
