import { useState, createContext, useContext } from "react";


interface CustomerShortInfo {
    name: string;
    city: string;
}

interface QuestionInterface {
    id: string;
    customerShortInfo: CustomerShortInfo;
    content: string;
}

type AvisoryContextType = {
    listQuestion: QuestionInterface[];
    updateListQuestion: (data: any) => void;
};

const AvisoryContextDefault: AvisoryContextType = {
    listQuestion: [],
    updateListQuestion: (data: any) => {},
};

const AvisoryContext = createContext<AvisoryContextType>(AvisoryContextDefault);

function AvisoryContextProvider({ children }) {
    const [listQuestion, setListQuestion] = useState([]);
    const values = {
        listQuestion,
        updateListQuestion: (data: any) => {
            setListQuestion(data);
        },
    };
    return (
        <AvisoryContext.Provider value={values}>
            {children}
        </AvisoryContext.Provider>
    );
}

export { AvisoryContext, AvisoryContextProvider };

export function useAvisoryContext() {
    return useContext(AvisoryContext);
  }
