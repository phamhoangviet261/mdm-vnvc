import * as React from "react";
import styled from "styled-components";
import { theme } from "styles/theme";

export interface InputProps {
    type: "text" | "date" | "gender" | "phone" | "dropDown";
    dropDownName: string;
    dropDownList?: string[];
}

export const InputWrapper = styled.div``;

export default function Input({
    type,
    dropDownName,
    dropDownList,
}: InputProps) {
    return (
        <InputWrapper>
            <label htmlFor=""></label>
        </InputWrapper>
    );
}
