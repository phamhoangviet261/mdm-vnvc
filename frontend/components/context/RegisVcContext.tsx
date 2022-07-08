import { useState, createContext } from "react";

type VaccineItem = {
    createAt?: string;
    id: string;
    name: string;
    prevention: string;
    producingCountry: string;
    retailPrice: number;
    preorderPrice: number;
};

type regisVcContextType = {
    customerId: string;
    regisAnotherInfo: {
        fullname: string;
        birthday: string;
        gender: string;
        city: string;
        district: string;
        address: string;
        phoneNumber: string;
        relationship: string;
        relatedFullName: string;
    };
    serviceInfo: {
        city: string;
        center: string;
        injectDate: string;
    };
    listPackages: string[];
    listVaccines: string[];
    listVxBuy: VaccineItem[];
    updateCustomerId: (data: any) => void;
    updateRegisAnotherInfo: (data: any) => void;
    updateServiceInfo: (data: any) => void;
    updateListPackages: (data: any) => void;
    updateListVaccines: (data: any) => void;
    updateListVxBuy: (data: any) => void;
};

const regisVcContextDefault: regisVcContextType = {
    customerId: "",
    regisAnotherInfo: {
        fullname: "",
        birthday: "",
        gender: "",
        city: "",
        district: "",
        address: "",
        phoneNumber: "",
        relationship: "",
        relatedFullName: "",
    },
    serviceInfo: {
        city: "",
        center: "",
        injectDate: "",
    },
    listPackages: [],
    listVaccines: [],
    listVxBuy: [],
    updateCustomerId: (data: any) => {},
    updateRegisAnotherInfo: (data: any) => {},
    updateServiceInfo: (data: any) => {},
    updateListPackages: (data: any) => {},
    updateListVaccines: (data: any) => {},
    updateListVxBuy: (data: any) => {},
};

const RegisVcContext = createContext<regisVcContextType>(regisVcContextDefault);

function RegisVcProvider({ children }) {
    const [customerId, setCustomerId] = useState(
        regisVcContextDefault.customerId
    );
    const [regisAnotherInfo, setRegisAnotherInfo] = useState(
        regisVcContextDefault.regisAnotherInfo
    );
    const [serviceInfo, setServiceInfo] = useState(
        regisVcContextDefault.serviceInfo
    );

    const [listPackages, setListPackages] = useState(
        regisVcContextDefault.listPackages
    );
    const [listVaccines, setListVaccines] = useState(
        regisVcContextDefault.listVaccines
    );
    const [listVxBuy, setListVxBuy] = useState(regisVcContextDefault.listVxBuy);
    const values = {
        customerId,
        regisAnotherInfo,
        serviceInfo,
        listPackages,
        listVaccines,
        listVxBuy,
        updateCustomerId: (data: any) => {
            setCustomerId(data);
        },
        updateRegisAnotherInfo: (data: any) => {
            setRegisAnotherInfo(data);
        },
        updateServiceInfo: (data: any) => {
            setServiceInfo(data);
        },
        updateListPackages: (data: any) => {
            setListPackages(data);
        },
        updateListVaccines: (data: any) => {
            setListVaccines(data);
        },
        updateListVxBuy: (data: any) => {
            setListVxBuy(data);
        },
    };
    return (
        <RegisVcContext.Provider value={values}>
            {children}
        </RegisVcContext.Provider>
    );
}

export { RegisVcContext, RegisVcProvider };
