import { useState } from "react";
import styled from "styled-components";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
const PackageWrapper = styled.div`
    height: 100%;
    border: 1px solid #dcdfe6;
    padding: 9px 20px 9px 10px;
    border-radius: 4px;
    display: flex;
    .checkbox {
        width: 20px;
    }
    .content {
        flex: 1;
        margin-left: 10px;
        display: flex;
        flex-direction: column;
        .content-top {
            display: flex;
            justify-content: space-between;
            font-size: 15px;
            font-weight: 400;
            white-space: normal;
            .title {
                color: #000;
                line-height: 1.4em;
            }
            .price {
                color: #1f28af;
                margin-left: 0.5em;
                text-align: right;
            }
        }
        .content-bottom {
            padding-top: 0.5em;
            color: #888;
            font-size: 13px;
            margin-top: auto;
        }
    }
`;

export interface PackageProps {
    id: string;
    title: string;
    description: string;
    price: number;
}

export default function Package({
    id,
    title,
    description,
    price,
}: PackageProps) {
    const [click, setClick] = useState(false);
    const handleClick = () => {
        setClick(!click);
    };
    if (!click) {
        return (
            <PackageWrapper onClick={handleClick}>
                <div className="checkbox">
                    <CheckBoxOutlineBlankIcon />
                </div>
                <div className="content">
                    <div className="content-top">
                        <div className="title">{title}</div>
                        <div className="price">{price}đ</div>
                    </div>
                    <div className="content-bottom">{description}</div>
                </div>
            </PackageWrapper>
        );
    } else {
        return (
            <PackageWrapper
                style={{ borderColor: "#2A388F" }}
                onClick={handleClick}
            >
                <div className="checkbox">
                    <CheckBoxIcon color="primary" />
                </div>
                <div className="content">
                    <div className="content-top">
                        <div className="title">{title}</div>
                        <div className="price">{price}đ</div>
                    </div>
                    <div className="content-bottom">{description}</div>
                </div>
            </PackageWrapper>
        );
    }
}
