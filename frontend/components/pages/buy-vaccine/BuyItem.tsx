import { useContext, useState, useEffect } from "react";
import styled from "styled-components";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import { RegisVcContext } from "components/context/RegisVcContext";
import LocalOfferOutlinedIcon from "@mui/icons-material/LocalOfferOutlined";
const ItemWrapper = styled.div`
    border-radius: 16px;
    background-color: white;
    display: flex;
    flex-direction: column;
`;
const ItemTop = styled.div`
    display: flex;
    flex-direction: column;
    background-position: 50%;
    background-size: cover;
    background-repeat: no-repeat;
    background-image: url("/bg-buy-item.png");
    background-color: #e2f0fe;
    margin: 10px;
    border-radius: 12px;
    padding: 14px;
    .title {
        text-transform: uppercase;
        font-weight: 700;
        font-size: 16px;
        color: #032346;
        line-height: 22px;
        min-height: 44px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
    }
    .producing {
        color: #595959;
        font-size: 14px;
    }
    .price {
        margin-top: 10px;
        font-style: normal;
        display: flex;
        flex-direction: row;
        align-items: center;
        color: #2a388f !important;
        font-weight: bolder !important;
        span {
            display: inline-block;
            padding-left: 10px;
        }
    }
`;

export interface PackageProps {
    id: string;
    title: string;
    description: string;
    price: number;
}

interface VaccineProps {
    createAt?: string;
    id: string;
    name: string;
    prevention: string;
    producingCountry: string;
    retailPrice: number;
    preorderPrice: number;
}

export default function BuyItem({
    id,
    name,
    prevention,
    producingCountry,
    retailPrice,
    preorderPrice,
}: VaccineProps) {
    const [click, setClick] = useState(false);
    const handleClick = () => {
        setClick(!click);
    };

    const regisVcContext = useContext(RegisVcContext);

    useEffect(() => {
        setClick(
            regisVcContext.listPackages.some((item) => {
                return item == id;
            })
        );
    }, []);

    return (
        <ItemWrapper>
            <ItemTop>
                <div className="title">{name}</div>
                <div className="producing">Nguồn gốc: {producingCountry}</div>
                <div className="price">
                    <LocalOfferOutlinedIcon />
                    <span>{preorderPrice.toLocaleString("vi")} VNĐ</span>
                </div>
            </ItemTop>
        </ItemWrapper>
    );
}
