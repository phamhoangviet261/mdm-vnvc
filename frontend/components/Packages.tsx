import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import VaccineItem from "./VaccineItem";
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
    display: grid;
    grid-template-columns: 1fr 4fr;
`;

const SubCategory = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 20px;
    & > h5 {
        font-weight: bold;
    }
`;

const PackageContainer = styled.div`
    margin-left: 20px;
`;

const CateItem = styled.li`
    margin-left: 18px;
    padding: 4px 2px;
    cursor: pointer;
    text-transform: uppercase;
    transition: 0.3s all linear;
    &:hover {
        opacity: 0.8;
        transform: translateX(2px);
    }
`;

interface PackageProps {
    id: string;
    title: string;
    description: string;
    price: number;
}

interface PackagesProps {
    listCate2: TargetInterface[];
    listPackage2: PackagesListInterface[];
}

interface TargetInterface {
    targetId: string;
    targetName: string;
}

interface VaccineInterface {
    vcid: string;
    numOfInjection: string;
}

interface PackagesListInterface {
    target: TargetInterface;
    vaccines: VaccineInterface[];
    _id: string;
    id: string;
    name: string;
    totalPrice: number;
    totalNumOfInjection: number;
    description: string[];
}

function uniqueTarget(arr: PackagesListInterface[]) {
    let newArr = [];
    let temp = 0;
    arr.forEach(function (item) {
        temp = 0;
        for (let item2 of newArr) {
            if (item.target.targetId == item2.target.targetId) {
                temp = 1;
                break;
            }
        }
        if (temp == 0) {
            newArr.push(item);
        }
    });

    let result: TargetInterface[] = [];
    result = newArr.map((item) => item.target);
    return result;
}

export default function Category({ listCate2, listPackage2 }: PackagesProps) {
    const [listPackage, setListPackage] =
        useState<PackagesListInterface[]>(listPackage2);
    const [listCate, setListCate] = useState<TargetInterface[]>(listCate2);
    const [selectedPackageId, setSelectedPackageId] = useState("1");
    const [listPackageEachCate, setListPackageEachCate] = useState<
        PackagesListInterface[]
    >([]);
    const [selectedPackages, setSelectedPackages] = useState([]);

    const regisVcContext = useContext(RegisVcContext);

    useEffect(() => {
        let arrPackages = listPackage.filter(
            (item) => item.target.targetId == selectedPackageId
        );
        setListPackageEachCate(arrPackages);
    }, [selectedPackageId]);

    useEffect(() => {
        let tempArr: PackagesListInterface[] = [];
        tempArr = listPackage.filter(
            (item) => item.target.targetId == selectedPackageId
        );
        console.log("hehe:", tempArr);
        setListPackageEachCate(tempArr);
    }, [listCate]);

    const handleChoosePackage = (id: string) => {
        let tempArr = [];
        let checkContains = selectedPackages.includes(id);
        if (!checkContains) {
            tempArr = [...selectedPackages];
            tempArr.push(id);
        } else {
            tempArr = selectedPackages.filter((item) => item != id);
        }
        setSelectedPackages(tempArr);
    };

    useEffect(() => {
        console.log("update list of selected packages");
        regisVcContext.updateListPackages(selectedPackages);
    }, [selectedPackages]);
    return (
        <Container>
            <Wrap>
                <SubCategory>
                    <h5>Danh mục gói vắc xin</h5>
                    <ul>
                        {listCate &&
                            listCate.map((item, index) => {
                                if (item.targetId === selectedPackageId)
                                    return (
                                        <CateItem
                                            style={{ color: "#2A388F" }}
                                            onClick={() =>
                                                setSelectedPackageId(
                                                    item.targetId
                                                )
                                            }
                                            key={item.targetId}
                                        >
                                            - {item.targetName}
                                        </CateItem>
                                    );
                                else
                                    return (
                                        <CateItem
                                            onClick={() =>
                                                setSelectedPackageId(
                                                    item.targetId
                                                )
                                            }
                                            key={item.targetId}
                                        >
                                            - {item.targetName}
                                        </CateItem>
                                    );
                            })}
                    </ul>
                </SubCategory>
                <PackageContainer>
                    <Grid
                        container
                        rowSpacing={1}
                        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                    >
                        {listPackageEachCate.length > 0 &&
                            listPackageEachCate.map((item) => (
                                <Grid
                                    key={item.id}
                                    onClick={() => handleChoosePackage(item.id)}
                                    item
                                    xs={6}
                                >
                                    <VaccineItem
                                        id={item.id}
                                        title={item.name}
                                        description={item.description.join(
                                            ". "
                                        )}
                                        price={item.totalPrice}
                                    />
                                </Grid>
                            ))}
                    </Grid>
                </PackageContainer>
            </Wrap>
        </Container>
    );
}
