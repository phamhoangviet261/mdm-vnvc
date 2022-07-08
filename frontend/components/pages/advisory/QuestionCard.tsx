import React, { useEffect, useState } from "react";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import IosShareIcon from "@mui/icons-material/IosShare";
import styled from "styled-components";
import axios from "axios";
import myUrl from "config";
const Card = styled.div`
    width: 100%;
    border: 1px solid #ddd;
    box-shadow: 0 0 5px #ccc;
    border-radius: 5px;
    padding: 15px 25px;
    margin-top: 20px;
    margin-bottom: 20px;
    text-align: justify;
    &:hover {
        border: 1px solid #faa736;
        background: #fffaf4;
        transition: 0.1s;
    }
    animation: myAnim 1s ease-in;
`;

const Question = styled.div`
    display: flex;
`;

const QuestionImage = styled.img`
    margin-right: 10px;
    width: 30px;
    height: 30px;
    transform: translateY(10px);
`;

const QuestionText = styled.span`
    color: #2a388a;
    font-size: 16px;
    font-weight: 700;
    align-self: center;
`;

const InfoAction = styled.div`
    display: flex;
    padding-left: 42px;
    justify-content: space-between;
`;

const Info = styled.div`
    color: #6d6e70;
    font-size: 15px;
`;

const Action = styled.div`
    color: #6d6e70;
    display: flex;
    font-size: 15px;
    & span {
        padding-right: 5px;
    }
`;

const Reply = styled.div`
    margin-right: 30px;
`;

const Share = styled.button`
    position: relative;
    &::before {
        content: "|";
        color: #aaa;
        position: absolute;
        left: -15px;
    }
    &:hover {
        color: #23527c;
    }
`;

const Answer = styled.div`
    padding-left: 42px;
    margin-bottom: 20px;
    animation: myAnim2 0.5s ease-in;
`;

const Doctor = styled.div`
    display: flex;
`;

const AnswerText = styled.div`
    color: #6d6e70;
    line-height: 25px;
    font-size: 15px;
    padding-left: 56px;
`;

const ViewAll = styled.button`
    padding-left: 56px;
    font-size: 16px;
    color: #2a388a;
    margin: 10px 0;
    cursor: pointer;
    &:hover {
        color: #23527c;
    }

    &.hidden {
        display: none;
    }
`;

interface Expert {
    name: string;
    nameOfCenter: string;
}

interface AnswerDetail {
    expert: Expert;
    content: string;
}

interface CustomerShortInfo {
    name: string;
    city: string;
}

interface QuestionInterface {
    id: string;
    customerShortInfo: CustomerShortInfo;
    content: string;
    answerDetail: AnswerDetail[];
}

const QuestionCard = (props) => {
    const [showAllAnswer, setShowAllAnswer] = useState(false);
    const [question, setQuestion] = useState<QuestionInterface>();
    useEffect(() => {
        axios({
            method: "GET",
            url: `${myUrl}/question/${props.question}`,
        })
            .then(function (res) {
                setQuestion(res.data.data);
            })
            .catch(function (err) {
                console.log(err);
            });
    }, []);

    if (question) {
        return (
            <Card>
                <Question>
                    <QuestionImage src="/question.png" alt="QuestionIcon" />
                    <QuestionText>{question.content}</QuestionText>
                </Question>
                <InfoAction>
                    <Info>
                        <span>{question.customerShortInfo.name}</span>,{" "}
                        <span>{question.customerShortInfo.city}</span>
                    </Info>
                    <Action>
                        <Reply>
                            <span>{question.answerDetail.length} Trả lời</span>
                            <QuestionAnswerIcon style={{ width: "15px" }} />
                        </Reply>
                        <Share>
                            <span>Chia sẻ</span>
                            <IosShareIcon style={{ width: "15px" }} />
                        </Share>
                    </Action>
                </InfoAction>
                <hr
                    style={{
                        marginLeft: "42px",
                        marginTop: "10px",
                        marginBottom: "10px",
                    }}
                />
                {question.answerDetail.length > 0 && !showAllAnswer && (
                    <Answer>
                        <Doctor>
                            <QuestionImage
                                src="/doctor.png"
                                alt="DocTorAvatar"
                            />
                            <QuestionText>
                                <span>
                                    Bác sĩ{" "}
                                    {question.answerDetail[0].expert.name}
                                </span>
                                ,
                                <span>
                                    {" "}
                                    {
                                        question.answerDetail[0].expert
                                            .nameOfCenter
                                    }
                                </span>
                            </QuestionText>
                        </Doctor>
                        <AnswerText
                            dangerouslySetInnerHTML={{
                                __html: question.answerDetail[0].content,
                            }}
                        ></AnswerText>
                        <ViewAll
                            onClick={() => {
                                setShowAllAnswer(!showAllAnswer);
                            }}
                        >
                            Xem tất cả {question.answerDetail.length} câu trả
                            lời ▶
                        </ViewAll>
                    </Answer>
                )}
                {(question.answerDetail.length > 0 &&
                    showAllAnswer &&
                    question.answerDetail.map((item, index) => (
                        <Answer key={index}>
                            <Doctor>
                                <QuestionImage
                                    src="/doctor.png"
                                    alt="DocTorAvatar"
                                />
                                <QuestionText>
                                    <span>Bác sĩ {item.expert.name}</span>,
                                    <span> {item.expert.nameOfCenter}</span>
                                </QuestionText>
                            </Doctor>
                            <AnswerText
                                dangerouslySetInnerHTML={{
                                    __html: item.content,
                                }}
                            ></AnswerText>
                            <ViewAll
                                className={
                                    index == question.answerDetail.length - 1
                                        ? ""
                                        : "hidden"
                                }
                                onClick={() => {
                                    setShowAllAnswer(!showAllAnswer);
                                }}
                            >
                                Ẩn bớt ▶
                            </ViewAll>
                        </Answer>
                    ))) ||
                    null}
            </Card>
        );
    } else {
        return <div></div>;
    }
};

export default QuestionCard;
