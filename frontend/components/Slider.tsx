import React, { Fragment, useEffect, useRef } from "react";
import styled from "styled-components";

const Image = styled.img`
    width: 100%;
    height: 500px;
    transition: 1s;
    position: absolute;
    top: 0;
    overflow: hidden;
    &.deactive {
        transform: translateX(100%);
    }
    &.slider1 {
        z-index: 0;
    }
    &.slider2 {
        z-index: 0;
        left: 100%;
    }
    &.slider3 {
        z-index: 0;
        left: 200%;
    }

    &.active {
        z-index: 2;
        transform: translateX(0);
        transition: 1s;
    }
`;

const Container = styled.div`
    position: relative;
    display: flex;
    width: 100vw;
    height: 500px;
    transition: 2s;
    &.slide1 {
        transform: translateX(0);
    }

    &.slide2 {
        transform: translateX(-100%);
    }

    &.slide3 {
        transform: translateX(-200%);
    }
`;
const PageContainer = styled.div`
    display: flex;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    bottom: 10px;
    z-index: 9;
`;
const Page = styled.button`
    border: none;
    background: #ccc;
    display: block;
    width: 40px;
    height: 6px;
    border-radius: 2px;
    margin: 5%;
    cursor: pointer;
    opacity: 0.5;
    &.active {
        width: 75px;
        background: white;
        transition: 1s;
        opacity: 1;
    }
`;

const Temp = styled.div`
    position: absolute;
    top: 0;
    background: transparent;
    z-index: 9;
    width: 100vw;
    height: 500px;
`;

function Slider() {
    let autoSlider;

    const slider = useRef(null);
    const slider1 = useRef(null);
    const slider2 = useRef(null);
    const slider3 = useRef(null);
    const page1 = useRef(null);
    const page2 = useRef(null);
    const page3 = useRef(null);

    const page1Click = () => {
        clearInterval(autoSlider);
        autoSlider = setInterval(SliderAuto, 5000);
        current = 2;
        slider.current.classList.add("slide1");
        slider.current.classList.remove("slide2");
        slider.current.classList.remove("slide3");
        page1.current.classList.add("active");
        page2.current.classList.remove("active");
        page3.current.classList.remove("active");
        // slider1.current.classList.add("active");
        // slider1.current.classList.remove("deactive");
        // slider2.current.classList.remove("active");
        // slider3.current.classList.remove("active");
    };

    const page2Click = () => {
        clearInterval(autoSlider);
        autoSlider = setInterval(SliderAuto, 5000);
        current = 3;
        slider.current.classList.add("slide2");
        slider.current.classList.remove("slide1");
        slider.current.classList.remove("slide3");
        page2.current.classList.add("active");
        page1.current.classList.remove("active");
        page3.current.classList.remove("active");
        // slider1.current.classList.add("deactive");
        // slider2.current.classList.add("active");
        // slider1.current.classList.remove("active");
        // slider3.current.classList.remove("active");
    };

    const page3Click = () => {
        clearInterval(autoSlider);
        autoSlider = setInterval(SliderAuto, 5000);
        current = 1;
        slider.current.classList.add("slide3");
        slider.current.classList.remove("slide2");
        slider.current.classList.remove("slide1");
        page3.current.classList.add("active");
        page2.current.classList.remove("active");
        page1.current.classList.remove("active");
        // slider3.current.classList.add("active");
        // slider1.current.classList.add("deactive");
        // slider2.current.classList.remove("active");
        // slider1.current.classList.remove("active");
    };

    let current = 2;

    const SliderAuto = () => {
        switch (current) {
            case 1:
                current++;
                page1Click();
                break;
            case 2:
                current++;
                page2Click();
                break;
            case 3:
                current = 1;
                page3Click();
                break;
        }
    };

    useEffect(() => {
        autoSlider = setInterval(SliderAuto, 5000);
        return () => {
            clearInterval(autoSlider);
        };
    }, []);

    return (
        <Fragment>
            <Container ref={slider}>
                <Image
                    ref={slider1}
                    className="slider1"
                    src="/banner/banner-1.jpeg"
                    alt="banner1"
                />
                <Image
                    ref={slider2}
                    className="slider2"
                    src="/banner/banner-2.jpeg"
                    alt="banner2"
                />
                <Image
                    ref={slider3}
                    className="slider3"
                    src="/banner/banner-4.jpeg"
                    alt="banner3"
                />
            </Container>
            <Temp>
                <PageContainer>
                    <Page
                        className="active"
                        ref={page1}
                        onClick={page1Click}
                    ></Page>
                    <Page ref={page2} onClick={page2Click}></Page>
                    <Page ref={page3} onClick={page3Click}></Page>
                </PageContainer>
            </Temp>
        </Fragment>
    );
}

export default Slider;
