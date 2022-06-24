import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import VaccineItem from "./VaccineItem";
import { Grid } from "@mui/material";
import { RegisVcContext } from "components/context/RegisVcContext";

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

export default function Vaccines() {
    const [listVaccines, setListVaccines] =
        useState<VaccineProps[]>(listVaccinesData);
    const [selectedVaccines, setSelectedVaccines] = useState([]);

    const regisVcContext = useContext(RegisVcContext);

    const handleChooseVaccine = (id: string) => {
        let tempArr = [];
        let checkContains = selectedVaccines.includes(id);
        if (!checkContains) {
            tempArr = [...selectedVaccines];
            tempArr.push(id);
        } else {
            tempArr = selectedVaccines.filter((item) => item != id);
        }
        setSelectedVaccines(tempArr);
    };
    useEffect(() => {
        console.log("update context of selected Vaccine");
        regisVcContext.updateListVaccines(selectedVaccines);
    }, [selectedVaccines]);
    return (
        <Container>
            <Wrap>
                <VaccineContainer>
                    <Grid
                        container
                        rowSpacing={1}
                        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                    >
                        {listVaccines.length > 0 &&
                            listVaccines.map((item) => (
                                <Grid
                                    key={item.id}
                                    onClick={() => handleChooseVaccine(item.id)}
                                    item
                                    xs={4}
                                >
                                    <VaccineItem
                                        id={item.id}
                                        title={item.title}
                                        description={item.description}
                                        price={item.price}
                                    />
                                </Grid>
                            ))}
                    </Grid>
                </VaccineContainer>
            </Wrap>
        </Container>
    );
}
