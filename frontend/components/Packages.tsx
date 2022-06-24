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
    margin-left: 28px;
    padding: 4px 2px;
    cursor: pointer;
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
    packageTypeId: string;
    packageTypeName: string;
    packagesList: PackageProps[];
}

const listPackages: Array<PackagesProps> = [
    {
        packageTypeId: "PT01",
        packageTypeName: "Vắc xin cho trẻ em / 0-9 Tháng",
        packagesList: [
            {
                id: "PT0101",
                title: "GÓI VẮC XIN Hexaxim (0-9 THÁNG) - GÓI LINH ĐỘNG 1",
                description:
                    "Tiêu chảy do rota virus, Bạch hầu, Ho gà, Uốn ván, Bại liệt, Viêm màng não mủ, Viêm phổi do HIB, Viêm gan B, Hội chứng nhiễm trùng, viêm màng não, viêm phổi, nhiễm khuẩn huyết, viêm tai giữa do phế cầu, Cúm, Sởi, Viêm não Nhật bản, Viêm màng não do não mô cầu ACYW",
                price: 14300000,
            },
            {
                id: "PT0102",
                title: "GÓI VẮC XIN Hexaxim (0-9 THÁNG) - GÓI LINH ĐỘNG 2",
                description:
                    "Tiêu chảy do rota virus, Bạch hầu, Ho gà, Uốn ván, Bại liệt, Viêm màng não mủ, Viêm phổi do HIB, Viêm gan B, Hội chứng nhiễm trùng, viêm màng não, viêm phổi, nhiễm khuẩn huyết, viêm tai giữa do phế cầu, Cúm, Sởi, Viêm não Nhật bản, Viêm màng não do não mô cầu ACYW",
                price: 14724000,
            },
            {
                id: "PT0103",
                title: "GÓI VẮC XIN Infanrix (0-9 tháng) - GÓI LINH ĐỘNG 1",
                description:
                    "Tiêu chảy do rota virus, Bạch hầu, Ho gà, Uốn ván, Bại liệt, Viêm màng não mủ, Viêm phổi do HIB, Viêm gan B, Hội chứng nhiễm trùng, viêm màng não, viêm phổi, nhiễm khuẩn huyết, viêm tai giữa do phế cầu, Cúm, Sởi, Viêm não Nhật bản, Viêm màng não do não mô cầu ACYW",
                price: 14190000,
            },
        ],
    },
    {
        packageTypeId: "PT02",
        packageTypeName: "Vắc xin cho trẻ em / 0-12 Tháng",
        packagesList: [
            {
                id: "PT0201",
                title: "GÓI VẮC XIN INFANRIX - ROTATEQ - VARILRIX (0-12 THÁNG)",
                description:
                    "Tiêu chảy do rota virus, Bạch hầu, Ho gà, Uốn ván, Bại liệt, Viêm màng não mủ, Viêm phổi do HIB, Viêm gan B, Hội chứng nhiễm trùng, viêm màng não, viêm phổi, nhiễm khuẩn huyết, viêm tai giữa do phế cầu, Cúm, Sởi, Viêm não Nhật bản, Viêm màng não do não mô cầu ACYW",
                price: 14300000,
            },
            {
                id: "PT0202",
                title: "GÓI VẮC XIN INFANRIX - ROTATEQ - VARIVAX (0-12 tháng)",
                description:
                    "Tiêu chảy do rota virus, Bạch hầu, Ho gà, Uốn ván, Bại liệt, Viêm màng não mủ, Viêm phổi do HIB, Viêm gan B, Hội chứng nhiễm trùng, viêm màng não, viêm phổi, nhiễm khuẩn huyết, viêm tai giữa do phế cầu, Cúm, Sởi, Viêm não Nhật bản, Viêm màng não do não mô cầu ACYW",
                price: 14724000,
            },
            {
                id: "PT0203",
                title: "GÓI VẮC XIN INFANRIX - ROTARIX - VARILRIX (0-12 tháng)",
                description:
                    "Tiêu chảy do rota virus, Bạch hầu, Ho gà, Uốn ván, Bại liệt, Viêm màng não mủ, Viêm phổi do HIB, Viêm gan B, Hội chứng nhiễm trùng, viêm màng não, viêm phổi, nhiễm khuẩn huyết, viêm tai giữa do phế cầu, Cúm, Sởi, Viêm não Nhật bản, Viêm màng não do não mô cầu ACYW",
                price: 14190000,
            },
        ],
    },
];

export default function Category() {
    const [packageCate, setPackageCate] =
        useState<PackagesProps[]>(listPackages);
    const [packageTypeId, setPackageTypeId] = useState("PT01");
    const [packagesList, setPackagesList] = useState<PackageProps[]>([]);
    const [selectedPackages, setSelectedPackages] = useState([]);

    const regisVcContext = useContext(RegisVcContext);

    useEffect(() => {
        let arrPackages = packageCate.filter(
            (item) => item.packageTypeId == packageTypeId
        );
        setPackagesList(arrPackages[0].packagesList);
        console.log(arrPackages[0].packagesList);
    }, [packageTypeId]);

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
                        {packageCate.map((item, index) => {
                            if (item.packageTypeId === packageTypeId)
                                return (
                                    <CateItem
                                        style={{ color: "#2A388F" }}
                                        onClick={() =>
                                            setPackageTypeId(item.packageTypeId)
                                        }
                                        key={item.packageTypeId}
                                    >
                                        {item.packageTypeName}
                                    </CateItem>
                                );
                            else
                                return (
                                    <CateItem
                                        onClick={() =>
                                            setPackageTypeId(item.packageTypeId)
                                        }
                                        key={item.packageTypeId}
                                    >
                                        {item.packageTypeName}
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
                        {packagesList.length > 0 &&
                            packagesList.map((item) => (
                                <Grid
                                    key={item.id}
                                    onClick={() => handleChoosePackage(item.id)}
                                    item
                                    xs={6}
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
                </PackageContainer>
            </Wrap>
        </Container>
    );
}
