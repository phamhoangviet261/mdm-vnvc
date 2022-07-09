import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { Grid } from "@mui/material";

const Wrap = styled.div`
    margin-top: 10px;
    padding: 0 20px;
`;

const VaccineContainer = styled.div`
    margin-left: 20px;
`;

const VaccineItem = styled.div`
    height: 100%;
    border: 1px solid #dcdfe6;
    padding: 9px 20px 9px 10px;
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
`;

const Empty = styled.div`
    padding: 40px 20px;
    color: #d6d6d6;
    text-transform: uppercase;
    font-size: 24px;
    font-style: italic;
    text-align: center;
`;
interface VaccinesInterface {
    vaccines: Array<VaccineProps>;
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

export default function VcInjected({ vaccines }: any) {
    const [listVaccines, setListVaccines] = useState(vaccines);
    const [selectedVaccines, setSelectedVaccines] = useState([]);

    useEffect(() => {
        console.log("listVaccines: ", listVaccines.length);
    }, [listVaccines]);

    return (
        <Wrap>
            <VaccineContainer>
                <Grid
                    container
                    rowSpacing={3}
                    columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                >
                    {listVaccines &&
                        listVaccines.length > 0 &&
                        listVaccines.map((item: any) => (
                            <Grid key={item.id} item xs={6}>
                                <VaccineItem>
                                    <div className="content-top">
                                        <div className="title">{item.name}</div>
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
                                    </div>
                                </VaccineItem>
                            </Grid>
                        ))}

                    {listVaccines.length === 0 && (
                        <Empty>Bạn chưa tiêm vắc xin nào</Empty>
                    )}
                </Grid>
            </VaccineContainer>
        </Wrap>
    );
}
