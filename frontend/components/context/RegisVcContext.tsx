import { useState, createContext } from "react";

type regisVcContextType = {
    regisSelfInfo: {
        fullname: string;
        birthday: string;
        gender: string;
        city: string;
        district: string;
        address: string;
        ccid: string;
        phoneNumber: string;
    };
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
    updateRegisSelfInfo: (data: any) => void;
    updateRegisAnotherInfo: (data: any) => void;
    updateServiceInfo: (data: any) => void;
    updateListPackages: (data: any) => void;
    updateListVaccines: (data: any) => void;
};

const regisVcContextDefault: regisVcContextType = {
    regisSelfInfo: {
        fullname: "",
        birthday: "",
        gender: "",
        city: "",
        district: "",
        address: "",
        ccid: "",
        phoneNumber: "",
    },
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
    updateRegisSelfInfo: (data: any) => {},
    updateRegisAnotherInfo: (data: any) => {},
    updateServiceInfo: (data: any) => {},
    updateListPackages: (data: any) => {},
    updateListVaccines: (data: any) => {},
};

const RegisVcContext = createContext<regisVcContextType>(regisVcContextDefault);

function RegisVcProvider({ children }) {
    const [regisSelfInfo, setRegisSelfInfo] = useState(
        regisVcContextDefault.regisSelfInfo
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
    const values = {
        regisSelfInfo,
        regisAnotherInfo,
        serviceInfo,
        listPackages,
        listVaccines,
        updateRegisSelfInfo: (data: any) => {
            setRegisSelfInfo(data);
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
    };
    return (
        <RegisVcContext.Provider value={values}>
            {children}
        </RegisVcContext.Provider>
    );
}

export { RegisVcContext, RegisVcProvider };
