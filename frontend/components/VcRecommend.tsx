import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { Grid } from "@mui/material";
import axios from "axios";
import { theme } from "styles/theme";
import { RegisVcContext } from "components/context/RegisVcContext";
import { useRouter } from "next/router";
import myUrl from "components/config/config";
import Loading from "./Loading";
const Wrap = styled.div`
    margin-bottom: 20px;
    padding: 0 20px;
`;

const VaccineContainer = styled.div`
    margin-top: 10px;
    margin-left: 20px;
`;

const VaccineItem = styled.div`
    height: 100%;
    border: 1px solid #dcdfe6;
    padding: 9px 20px;
    border-radius: 4px;
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
            span {
                color: #888;
                padding-right: 10px;
            }
            padding-top: 0.5em;
            color: #1a1a1a;
            font-size: 13px;
            margin-top: auto;
        }
    }
    .buy {
        margin-top: 10px;
        border-radius: 4px;
        font-size: 16px;
        padding: 8px 12px;
        background-color: ${theme?.colors?.blue0};
        text-align: center;
        cursor: pointer;
        transition: all 0.2 linear;
        color: white;
        &:hover {
            background-color: #35944A;
        }
    }
`;

const LoadingComponent = styled.div`
    margin: 20px auto;
    display: flex;
    justify-content: center;
    align-items: center;
    h2 {
        padding-left: 14px;
        font-size: 16px;
    }
`;

interface VcRecommendInterface {
    customerId: string;
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

export default function VcRecommend({ customerId }: VcRecommendInterface) {
    const [id, setId] = useState(customerId);
    const [listVaccines, setListVaccines] = useState<VaccineProps[]>();
    const [selectedVaccines, setSelectedVaccines] = useState([]);

    const regisVcContext = useContext(RegisVcContext);
    const router = useRouter();
    useEffect(() => {
        // axios call api get list vaccines recommendation
        if (id) {
            let url = `${myUrl}/customer/${id}/hint`;
            axios({
                method: "GET",
                url: url,
                data: null,
            })
                .then(function (res) {
                    if (res.data.vaccinesHint.length > 0) {
                        setListVaccines(res.data.vaccinesHint);
                    }
                })
                .catch(function (err) {
                    console.log(err);
                });
        }
    }, []);

    function handleClickBuy(item: VaccineProps) {
        console.log("vaccine clicked: ", item);
        let tempArr = [...regisVcContext.listVxBuy, item];
        console.log("tempArr:", tempArr);
        regisVcContext.updateListVxBuy([...regisVcContext.listVxBuy, item]);
        router.push("/buy-vaccine");
    }

    return listVaccines ? (
        <Wrap>
            <VaccineContainer>
                <Grid
                    container
                    rowSpacing={3}
                    columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                >
                    {listVaccines &&
                        listVaccines.length > 0 &&
                        listVaccines.slice(0, 6).map((item, index) => {
                            if (
                                regisVcContext.listVxBuy.some(
                                    (x) => x.id === item.id
                                )
                            ) {
                                return null;
                            } else {
                                return (
                                    <Grid key={index} item xs={6}>
                                        <VaccineItem>
                                            <div className="content-top">
                                                <div className="title">
                                                    {item.name}
                                                </div>
                                                <div className="price">
                                                    {item.preorderPrice.toLocaleString(
                                                        "vi"
                                                    )}
                                                    đ
                                                </div>
                                            </div>
                                            <div className="content-bottom">
                                                <div className="id">
                                                    <span>Mã vắc-xin:</span>
                                                    {item.id}
                                                </div>
                                                <div className="origin">
                                                    <span>Xuất xứ:</span>
                                                    {item.producingCountry}
                                                </div>
                                                <div className="desc">
                                                    <span>Ngăn ngừa: </span>
                                                    {item.prevention}
                                                </div>
                                                <div
                                                    className="buy"
                                                    onClick={() =>
                                                        handleClickBuy(item)
                                                    }
                                                >
                                                    Đặt mua
                                                </div>
                                            </div>
                                        </VaccineItem>
                                    </Grid>
                                );
                            }
                        })}
                </Grid>
            </VaccineContainer>
        </Wrap>
    ) : (
        <LoadingComponent>
            <Loading />
            <h2>Loading...</h2>
        </LoadingComponent>
    );
}
