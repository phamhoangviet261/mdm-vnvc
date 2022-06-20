import { FC } from "react";

import { Container, Divider } from "@mui/material";
import Image from "next/image";
import Link from 'next/link';
import { LogoContainer, TermContainer } from "styles/global.styled";

import { FooterStyled } from "./Footer.styled";

const Footer: FC = () => {
    return (
        <FooterStyled>
            <Container>
                <div className="footer-logo">
                    <div className="logo-container">
                        <Link href="/" passHref>
                            <LogoContainer>
                                <Image
                                    priority
                                    src="/logo.png"
                                    alt="Huta Web Logo"
                                    layout="fill"
                                    objectFit="contain"
                                    objectPosition="left center"
                                />
                            </LogoContainer>
                        </Link>
                    </div>
                </div>
                <div className="footer-term">
                    <TermContainer>
                        <li>
                            <Link href="/terms-of-use">
                                <a>Terms of Use</a>
                            </Link>
                        </li>
                        <li>
                            <Link href="/privacy-policy">
                                <a>Privacy Policy</a>
                            </Link>
                        </li>
                    </TermContainer>
                </div>
                <Divider className="divider" />
                <div className="footer-version">
                    <p className="footer-description">© 2022 MDM</p>
                </div>
            </Container>
        </FooterStyled>
    );
};

export default Footer;
