import { useState, createContext, useContext } from "react";

type PageContextType = {
    page: number;
    updatePage: (data: any) => void;
};

const PageContextDefault: PageContextType = {
    page: 1,
    updatePage: (data: any) => {},
};

const PageContext = createContext<PageContextType>(PageContextDefault);

function PageContextProvider({ children }) {
    const [page, setPage] = useState(
        1
    );
    const values = {
        page,
        updatePage: (data: any) => {
            setPage(data);
        },
    };
    return (
        <PageContext.Provider value={values}>
            {children}
        </PageContext.Provider>
    );
}

export { PageContext, PageContextProvider };

export function usePageContext() {
    return useContext(PageContext);
  }
