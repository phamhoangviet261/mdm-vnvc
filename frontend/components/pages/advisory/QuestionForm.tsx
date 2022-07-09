import axios from "axios";
import { usePageContext } from "components/context/PageContext";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import myUrl from "components/config/config";
import { useAvisoryContext } from "components/context/AdvisoryContext";
const Select = styled.select`
    height: 34px;
    outline: none;
    width: 100%;
    border-radius: 5px;
    flex: 1;
    color: #555;
    background-color: #fff;
    border: 1px solid #ccc;
    padding: 7px 10px;
    margin: 10px 0;
    font-size: 14px;
    flex: 1;
    &:focus {
        border-color: #66afe9;
        outline: 0;
        -webkit-box-shadow: inset 0 1px 1px rgb(0 0 0 / 8%),
            0 0 8px rgb(102 175 233 / 60%);
        box-shadow: inset 0 1px 1px rgb(0 0 0 / 8%),
            0 0 8px rgb(102 175 233 / 60%);
    }
`;

const Form = styled.div`
    padding: 15px;
    border-radius: 5px;
    width: 100%;
    background-color: #164dc6;
    margin-top: 20px;
`;

const Title = styled.div`
    color: #fff;
    font-size: 18px;
    text-align: center;
    margin-top: 20px;
`;

const Input = styled.input`
    width: 100%;
    overflow: hidden;
    padding: 7px 10px;
    border-radius: 5px;
    margin: 10px 0;
    flex: 1;
    &:focus {
        border-color: #66afe9;
        outline: 0;
        -webkit-box-shadow: inset 0 1px 1px rgb(0 0 0 / 8%),
            0 0 8px rgb(102 175 233 / 60%);
        box-shadow: inset 0 1px 1px rgb(0 0 0 / 8%),
            0 0 8px rgb(102 175 233 / 60%);
    }
`;

const TextArea = styled.textarea`
    width: 100%;
    height: 300px;
    resize: auto;
    padding: 7px 10px;
    border-radius: 5px;
    margin: 15px 0;
    &:focus {
        border-color: #66afe9;
        outline: 0;
        -webkit-box-shadow: inset 0 1px 1px rgb(0 0 0 / 8%),
            0 0 8px rgb(102 175 233 / 60%);
        box-shadow: inset 0 1px 1px rgb(0 0 0 / 8%),
            0 0 8px rgb(102 175 233 / 60%);
    }
`;

const Submit = styled.button`
    background-color: #ff7400;
    color: #fff;
    font-size: 14px;
    padding: 7px 10px;
    border-radius: 5px;
    &:hover {
        opacity: 0.9;
        transition: 0.2s;
    }
`;

const QuestionForm = () => {
    const [name, setName] = useState("");
    const [city, setCity] = useState("");
    const [content, setContent] = useState("");

    const AdvisoryContext = useAvisoryContext();

    const addQuestion = () => {
        let value = {
            content,
            customerShortInfo: {
                name,
                city,
            },
            customer: "CUS0",
            answers: [],
        };

        axios({
            method: "POST",
            url: `${myUrl}/question/add`,
            data: value,
        })
            .then(function (res) {
                console.log(res);
                window.location.reload();
            })
            .catch(function (err) {
                console.log(err);
            });
        setName("");
        setCity("");
        setContent("");
        AdvisoryContext.updateListQuestion(
            [
                ...AdvisoryContext.listQuestion,
                {
                    content,
                    customerShortInfo: {
                        name,
                        city,
                    },
                    answerDetail: [],
                }
            ]
        )
    };

    return (
        <Form>
            <Title>ĐẶT CÂU HỎI</Title>
            <Input
                type="text"
                placeholder="Họ và Tên (người được tiêm chủng)"
                onChange={(e) => {
                    setName(e.target.value);
                }}
                value={name}
            />
            <div style={{ display: "flex", gap: "25px" }}>
                <Select name="gender">
                    <option>Giới tính</option>
                    <option>Nam</option>
                    <option>Nữ</option>
                    <option>Khác</option>
                </Select>
                <Input type="text" placeholder="Tuổi" />
            </div>
            <Input type="email" placeholder="Email" />
            <Input type="text" placeholder="Số điện thoại" />
            <Input
                type="text"
                placeholder="Địa chỉ"
                onChange={(e) => {
                    setCity(e.target.value);
                }}
                value={city}
            />
            <Select>
                <option>Chúng tôi có thể giúp gì cho bạn?</option>
                <option>Vắc xin cho trẻ em</option>
                <option>Vắc xin cho người lớn</option>
                <option>Bệnh truyền nhiễm</option>
                <option>Phương pháp phòng ngừa</option>
                <option>Chi phí</option>
                <option>Thủ tục</option>
            </Select>
            <TextArea
                placeholder="Câu hỏi của bạn"
                onChange={(e) => {
                    setContent(e.target.value);
                }}
                value={content}
            />
            <Submit onClick={addQuestion}>GỬI CÂU HỎI</Submit>
        </Form>
    );
};

export default QuestionForm;
