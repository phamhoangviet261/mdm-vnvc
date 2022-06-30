import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { Grid } from "@mui/material";
import { RegisVcContext } from "components/context/RegisVcContext";
import axios from "axios";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: auto;
    overflow: hidden;
`;

const Wrap = styled.div`
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
            padding-top: 0.5em;
            color: #888;
            font-size: 13px;
            margin-top: auto;
        }
    }
`;

interface VcRecommendInterface {
    id: string;
}

interface VaccineProps {
    id: string;
    title: string;
    description: string;
    price: number;
}

const listVaccinesData: Array<VaccineProps> = [
    {
        id: "VC01",
        title: "GÓI VẮC XIN Hexaxim (0-9 THÁNG) - GÓI LINH ĐỘNG 1",
        description:
            "Tiêu chảy do rota virus, Bạch hầu, Ho gà, Uốn ván, Bại liệt, Viêm màng não mủ, Viêm phổi do HIB, Viêm gan B, Hội chứng nhiễm trùng, viêm màng não, viêm phổi, nhiễm khuẩn huyết, viêm tai giữa do phế cầu, Cúm, Sởi, Viêm não Nhật bản, Viêm màng não do não mô cầu ACYW",
        price: 14300000,
    },
    {
        id: "VC02",
        title: "GÓI VẮC XIN Hexaxim (0-9 THÁNG) - GÓI LINH ĐỘNG 2",
        description:
            "Tiêu chảy do rota virus, Bạch hầu, Ho gà, Uốn ván, Bại liệt, Viêm màng não mủ, Viêm phổi do HIB, Viêm gan B, Hội chứng nhiễm trùng, viêm màng não, viêm phổi, nhiễm khuẩn huyết, viêm tai giữa do phế cầu, Cúm, Sởi, Viêm não Nhật bản, Viêm màng não do não mô cầu ACYW",
        price: 14724000,
    },
    {
        id: "VC03",
        title: "GÓI VẮC XIN Infanrix (0-9 tháng) - GÓI LINH ĐỘNG 1",
        description:
            "Tiêu chảy do rota virus, Bạch hầu, Ho gà, Uốn ván, Bại liệt, Viêm màng não mủ, Viêm phổi do HIB, Viêm gan B, Hội chứng nhiễm trùng, viêm màng não, viêm phổi, nhiễm khuẩn huyết, viêm tai giữa do phế cầu, Cúm, Sởi, Viêm não Nhật bản, Viêm màng não do não mô cầu ACYW",
        price: 14190000,
    },
];

export default function VcRecommend({ id }: VcRecommendInterface) {
    const [listVaccines, setListVaccines] =
        useState<VaccineProps[]>(listVaccinesData);
    const [selectedVaccines, setSelectedVaccines] = useState([]);

    useEffect(() => {
        // axios call api get list vaccines recommendation
        console.log(id);
    }, []);

    return (
        <Container>
            <Wrap>
                <VaccineContainer>
                    <Grid
                        container
                        rowSpacing={3}
                        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                    >
                        {listVaccines &&
                            listVaccines.length > 0 &&
                            listVaccines.map((item) => (
                                <Grid key={item.id} item xs={4}>
                                    <VaccineItem>
                                        <div className="content-top">
                                            <div className="title">
                                                {item.title}
                                            </div>
                                            <div className="price">
                                                {item.price.toLocaleString(
                                                    "vi"
                                                )}
                                                đ
                                            </div>
                                        </div>
                                        <div className="content-bottom">
                                            {item.description}
                                        </div>
                                    </VaccineItem>
                                </Grid>
                            ))}
                    </Grid>
                </VaccineContainer>
            </Wrap>
        </Container>
    );
}
