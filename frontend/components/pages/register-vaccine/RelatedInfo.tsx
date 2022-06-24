import * as React from "react";
import { Container, Grid } from "@mui/material";
import styled from "styled-components";
import { theme } from "styles/theme";
import { useEffect, useState, useContext } from "react";
import { Title } from "./InjectorInfo";
import { RegisVcContext } from "components/context/RegisVcContext";

export interface RelatedInfoProps {}
const InfoWrapper = styled.div``;
const Item = styled.div`
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
const relationships = [
    "Con",
    "Cha",
    "Mẹ",
    "Vợ",
    "Chồng",
    "Anh",
    "Chị",
    "Ông",
    "Bà",
    "Họ hàng",
    "Khác",
];

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

export const exampleAnotherData = {
    fullname: "",
    birthday: "",
    gender: "",
    city: "",
    district: "",
    address: "",
    phoneNumber: "",
    relationship: "",
    relatedFullName: "",
};

export default function RelatedInfo(props: RelatedInfoProps) {
    const [gender, setGender] = useState("Nam");
    const [city, setCity] = useState("Thành phố Hồ Chí Minh");
    const [districts, setDistricts] = useState<string[]>([]);
    const [values, setValues] = useState(exampleAnotherData);

    const regisVcContext = useContext(RegisVcContext);

    function handleChange(
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) {
        console.log(e.target.value);
        setValues({
            ...values,
            [e.target.name]: e.target.value,
        });
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
        setValues({
            ...values,
            city: city,
            gender: gender,
        });
    }, []);

    useEffect(() => {
        regisVcContext.updateRegisAnotherInfo(values);
        console.log("update context");
    }, [values]);

    useEffect(() => {
        let arrDistricts: Array<CityInterface>;
        arrDistricts = data.filter((item) => item.city == city);
        setDistricts(arrDistricts[0].districts);
        setValues({
            ...values,
            district: arrDistricts[0].districts[0],
        });
    }, [city]);

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
                            name="birthday"
                            id="birthday"
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
                        <label className="label-required" htmlFor="city">
                            Tỉnh thành
                        </label>
                        <select
                            onChange={(e) => handleChangeCity(e.target.value)}
                            id="city"
                        >
                            <option value="Thành phố Hồ Chí Minh">
                                TP Hồ Chí Minh
                            </option>
                            <option value="Thành phố Hà Nội">Hà Nội</option>
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
                        >
                            {districts.length > 0 &&
                                districts.map((item, index) => (
                                    <option key={index} value={item}>
                                        {item}
                                    </option>
                                ))}
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
                        />
                    </Item>
                </Grid>
            </Grid>
            <Title>THÔNG TIN LIÊN HỆ</Title>
            <Grid container rowSpacing={2} columnSpacing={12}>
                <Grid item xs={12}>
                    <Item>
                        <label
                            className="label-required"
                            htmlFor="relatedFullName"
                        >
                            Họ và tên người liên hệ
                        </label>
                        <input
                            onChange={handleChange}
                            type="text"
                            name="relatedFullName"
                            id="relatedFullName"
                        />
                    </Item>
                </Grid>
                <Grid item xs={6}>
                    <Item>
                        <label
                            className="label-required"
                            htmlFor="relationship"
                        >
                            Mối quan hệ với người tiêm
                        </label>
                        <select onChange={handleChange} id="relationship">
                            {relationships.length > 0 &&
                                relationships.map((item, index) => (
                                    <option key={index} value={item}>
                                        {item}
                                    </option>
                                ))}
                        </select>
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
                        />
                    </Item>
                </Grid>
            </Grid>
        </InfoWrapper>
    );
}
