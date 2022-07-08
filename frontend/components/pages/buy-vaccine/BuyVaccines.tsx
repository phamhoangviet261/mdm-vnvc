import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import VaccineItem from "../../VaccineItem";
import BuyItem from "./BuyItem";
import { Grid } from "@mui/material";
import { RegisVcContext } from "components/context/RegisVcContext";
import axios from "axios";
import myUrl from "components/config/config";
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
    createAt?: string;
    id: string;
    name: string;
    prevention: string;
    producingCountry: string;
    retailPrice: number;
    preorderPrice: number;
}

export default function BuyVaccines() {
    const [listVaccines, setListVaccines] = useState<VaccineProps[]>([]);
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
        axios({
            method: "GET",
            url: `${myUrl}/vaccine/`,
            data: null,
        })
            .then(function (res) {
                setListVaccines(res.data.data);
            })
            .catch(function (err) {
                console.log(err);
            });
    }, []);

    // useEffect(() => {
    //     console.log("update context of selected Vaccine");
    //     regisVcContext.updateListVaccines(selectedVaccines);
    // }, [selectedVaccines]);
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
                                <Grid
                                    key={item.id}
                                    onClick={() => handleChooseVaccine(item.id)}
                                    item
                                    xs={4}
                                >
                                    <BuyItem {...item} />
                                </Grid>
                            ))}
                    </Grid>
                </VaccineContainer>
            </Wrap>
        </Container>
    );
}
