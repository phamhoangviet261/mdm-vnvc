import * as React from "react";
import Image from "next/image";
import styled from "styled-components";

export interface BannerProps {
    title?: string;
    subTitle?: string;
    description?: string;
    src: string;
}
export const BannerWrapper = styled.div`
    height: 450px;
    position: relative;
`;
export const Content = styled.div`
    position: absolute;
    color: white;
    bottom: 60px;
    left: 80px;
    .title {
        text-transform: uppercase;
        font-weight: 500;
        font-size: 36px;
        line-height: 1.1;
        text-shadow: 0 3px 5px rgb(0 0 0 / 50%), 0 2px 4px rgb(0 0 0 / 50%);
    }
    .sub-title {
        text-transform: uppercase;
        font-size: 20px;
        margin-top: 10px;
        margin-bottom: 10px;
        font-weight: 500;
        line-height: 1.1;
        text-shadow: 0 3px 5px rgb(0 0 0 / 50%), 0 2px 4px rgb(0 0 0 / 50%);
    }
    .text {
        font-size: 16px;
        text-align: left;
    }
`;
export default function Banner(props: BannerProps) {
    return (
        <BannerWrapper className="banner-wrap">
            <Image
                priority
                src={props.src}
                alt="banner"
                layout="fill"
                objectFit="cover"
                objectPosition="left top"
            />
            <Content>
                <h4 className="sub-title">{props.subTitle}</h4>
                <h3 className="title">{props.title}</h3>
                <p className="text">{props.description}</p>
            </Content>
        </BannerWrapper>
    );
}
