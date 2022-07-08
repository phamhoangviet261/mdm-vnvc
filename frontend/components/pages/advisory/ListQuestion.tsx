import axios from "axios";
import { usePageContext } from "components/context/PageContext";
import PaginationRounded from "components/Pagination";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import QuestionCard from "./QuestionCard";
import myUrl from "config";
const List = styled.div`
    flex: 1;
`;

interface AnswerInterface {
    DoctorName: string;
    DoctorPosition: string;
    AnswerContent: string;
}

interface CustomerShortInfo {
    name: string;
    city: string;
}

interface QuestionInterface {
    id: string;
    customerShortInfo: CustomerShortInfo;
    content: string;
}

async function getListQuestion() {
    try {
        const response = await axios.get(`${myUrl}/question`);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

const ListQuestion = () => {
    const [listQuestion, setListQuestion] = useState<QuestionInterface[]>([]);

    useEffect(() => {
        axios({
            method: "GET",
            url: `${myUrl}/question`,
        })
            .then(function (res) {
                setListQuestion(res.data.data);
            })
            .catch(function (err) {
                console.log(err);
            });
    }, []);

    const PageContext = usePageContext();
    const [pageCount, setPageCount] = useState(1);

    useEffect(() => {
        if (listQuestion.length > 0) {
            setPageCount(Math.ceil(listQuestion.length / 5));
        }
    }, [listQuestion]);

    const [page, setPage] = useState(1);

    useEffect(() => {
        setPage(PageContext.page);
    }, [PageContext.page]);

    return (
        <List>
            {listQuestion.length > 0 &&
                listQuestion.map((item, index) => {
                    if (index < page * 5 && index >= (page - 1) * 5) {
                        return <QuestionCard question={item.id} key={index} />;
                    }
                })}
            <PaginationRounded count={pageCount} />
        </List>
    );
};

export default ListQuestion;
