import { useContext, useState, useEffect } from "react";
import styled from "styled-components";
import { theme } from "styles/theme";
import { RegisVcContext } from "components/context/RegisVcContext";
import LocalOfferOutlinedIcon from "@mui/icons-material/LocalOfferOutlined";
import DoneIcon from "@mui/icons-material/Done";
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
        font-weight: 600;
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
        font-size: 18px;
        span {
            display: inline-block;
            padding-left: 10px;
        }
    }
`;

const ItemBottom = styled.div`
    margin: 10px;
    margin-top: 0px;
    p {
        font-size: 16px;
        line-height: 1.2;
        color: #262626;
        font-weight: 500;
        margin: 12px 16px;
    }
    .prevention {
        min-height: 36px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box !important;
        -webkit-box-orient: vertical;
        line-height: 18px;
        -webkit-line-clamp: 5;
        color: #595959 !important;
        font-size: 14px;
        margin: 0 16px;
    }
    .btn-buy {
        margin: 10px 16px 16px;
        border-radius: 10px;
        padding: 8px 12px;
        font-size: 16px;
        line-height: 30px;
        background-color: ${theme?.colors?.blue0};
        text-align: center;
        cursor: pointer;
        color: white;
    }
    .active {
        background-color: #35944a !important;
        span {
            display: inline-block;
            padding-right: 6px;
        }
        svg {
            transform: translateY(-10%) !important;
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
    disabledButton?: boolean;
}

export default function BuyItem(props: VaccineProps) {
    const regisVcContext = useContext(RegisVcContext);
    const handleClickBuy = (props: VaccineProps) => {
        let tempArr = [...regisVcContext.listVxBuy];
        let checkContains = tempArr.some((item) => item.id === props.id);
        if (!checkContains) {
            tempArr.push(props);
        } else {
            tempArr = tempArr.filter((item) => item.id !== props.id);
        }
        regisVcContext.updateListVxBuy([...tempArr]);
    };

    return (
        <ItemWrapper>
            <ItemTop>
                <div className="title">vắc xin {props.name}</div>
                <div className="producing">
                    Nguồn gốc: {props.producingCountry}
                </div>
                <div className="price">
                    <LocalOfferOutlinedIcon />
                    <span>{props.preorderPrice.toLocaleString("vi")} VNĐ</span>
                </div>
            </ItemTop>
            <ItemBottom>
                <p>Phòng bệnh:</p>
                <div className="prevention">{props.prevention}</div>
                {props.disabledButton ? (
                    ""
                ) : regisVcContext.listVxBuy.some((x) => x.id === props.id) ? (
                    <div
                        className="btn-buy active"
                        onClick={() => handleClickBuy(props)}
                    >
                        <span>ĐÃ CHỌN</span> <DoneIcon />
                    </div>
                ) : (
                    <div
                        className="btn-buy"
                        onClick={() => handleClickBuy(props)}
                    >
                        CHỌN
                    </div>
                )}
            </ItemBottom>
        </ItemWrapper>
    );
}
