import { FC, useCallback, useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { theme } from "styles/theme";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";
export const Wrapper = styled.div`
    margin: 0 auto;
    text-align: center;

    & h2 {
        margin-top: 16px;
        font-size: 24px;
        color: ${theme?.colors?.blue0};
        font-weight: 700;
    }
    & p {
        font-size: 16px;
    }

    .wrap {
        margin: 0 100px;
        border-bottom: 1px solid ${theme?.colors?.blue0};
        padding-bottom: 60px;
        margin-bottom: 60px;
    }
    .find {
        margin-top: 20px;
        text-align: left;
        .search {
            margin-bottom: 20px;
            input {
                font-size: 18px;
                color: ${theme?.colors?.blue0};
                padding: 4px;
                padding-left: 10px;
                outline: none;
                border: solid 1px ${theme?.colors?.blue0};
                border-radius: 4px;
                margin-right: 10px;
            }
            svg {
                font-size: 32px;
            }
            path: {
                fill: ${theme?.colors?.blue0};
                cursor: pointer;
            }
            svg:hover {
                fill: ${theme?.colors?.pink4};
            }
        }

        .find-top {
            display: flex;
            justify-content: space-between;
        }

        .tab-wrap {
            display: flex;
            span {
                line-height: 1.8;
                font-size: 16px;
            }
            .tab-item {
                margin-left: 20px;
                font-size: 20px;
                cursor: pointer;
                font-weight: bold;
            }
        }

        .list-center {
            margin-top: 20px;
            li {
                padding: 10px 0;
                list-style-type: circle;
            }
            h2 {
                font-size: 18px;
            }
            a {
                color: #337ab7;
            }
        }
    }

    .active {
        font-weight: bold;
        color: ${theme?.colors?.blue0};
    }
`;
export const Title = styled.h1`
    font-size: 32px;
    text-transform: uppercase;
    color: ${theme?.colors?.blue0};
    font-weight: bold;
`;

const NearestItem = styled.div`
    margin-top: 20px;
    padding: 0 20px 20px 20px;
    border-radius: 6px;
    border: 2px solid #dcdfe6;
`;

export interface OneCenterInterface {
    id: string;
    name: string;
    address: string;
    addressDetail: string;
    googleMap: {
        link: string;
    };
    status: string;
    centerArr: Array<string>;
    city: string;
    ward: string;
}

export interface ListCenterInterface {
    centerHN: Array<OneCenterInterface>;
    centerHCM: Array<OneCenterInterface>;
}

export default function NearestCenter() {
    const [tab, setTab] = useState(true);
    const [listCenter, setListCenter] = useState<OneCenterInterface[]>([]);
    const [listCenterDefault, setListCenterDefault] = useState<
        OneCenterInterface[]
    >([]);
    const [fullListCenter, setFullListCenter] = useState<ListCenterInterface[]>(
        []
    );
    const [search, setSearch] = useState("");

    useEffect(() => {
        axios({
            method: "GET",
            url: "http://localhost:5000/center/",
            data: null,
        })
            .then(function (res) {
                setFullListCenter(res.data.data);
            })
            .catch(function (err) {
                console.log(err);
            });
    }, []),
        useEffect(() => {
            let tempArr: Array<OneCenterInterface> = [];
            if (tab) {
                tempArr = fullListCenter?.["centerHCM"];
            } else {
                tempArr = fullListCenter?.["centerHN"];
            }

            if (tempArr && tempArr.length > 0) {
                setListCenter(tempArr);
                setListCenterDefault(tempArr);
            }
        }, [tab, fullListCenter]);

    useEffect(() => {
        if (search == "") {
            setListCenter(listCenterDefault);
        } else {
            let tempArr: Array<OneCenterInterface> = [];
            tempArr = listCenterDefault.filter(
                (item) =>
                    item.addressDetail.toLocaleLowerCase().includes(search) ||
                    item.addressDetail.includes(search)
            );
            setListCenter(tempArr);
        }
    }, [search]);
    return (
        <Wrapper>
            <div className="wrap">
                <Title>Trung tâm gần bạn nhất:</Title>
                <NearestItem>
                    <h2>VNVC Hoàng Văn Thụ:</h2>
                    <p>198 Hoàng Văn Thụ, P.9, Q.Phú Nhuận, TP.HCM</p>
                </NearestItem>
            </div>
            <div className="wrap">
                <Title>Tìm trung tâm</Title>
                <div className="find">
                    <div className="find-top">
                        <div className="search">
                            <input
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                type="text"
                                placeholder="Tìm trung tâm"
                            />
                            <button>
                                <SearchIcon />
                            </button>
                        </div>
                        <div className="tab-wrap">
                            <span>Tìm theo:</span>
                            {tab ? (
                                <>
                                    <div className="tab-item active">
                                        Hồ Chí Minh
                                    </div>
                                    <div
                                        className="tab-item"
                                        onClick={() => setTab(false)}
                                    >
                                        Hà Nội
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div
                                        className="tab-item"
                                        onClick={() => setTab(true)}
                                    >
                                        Hồ Chí Minh
                                    </div>
                                    <div className="tab-item active">
                                        Hà Nội
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                    <div className="list-center">
                        <ul>
                            {listCenter.length > 0 &&
                                listCenter.map((item, index) => {
                                    return (
                                        <li key={index}>
                                            <h2>{item.name}</h2>
                                            <p>{item.addressDetail}</p>
                                            <a
                                                target="_blank"
                                                href={item.googleMap.link}
                                            >
                                                Xem bản đồ trên Google
                                            </a>
                                        </li>
                                    );
                                })}
                        </ul>
                    </div>
                </div>
            </div>
        </Wrapper>
    );
}
