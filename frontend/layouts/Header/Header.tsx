import { FC, useCallback, useEffect, useState } from "react";

import { Container } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { LogoContainer, TermContainer } from "styles/global.styled";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SearchIcon from "@mui/icons-material/Search";
import {
    HeaderStyled,
    IconButtonStyled,
    MenuContainer,
    HeaderWrapper,
} from "./Header.styled";

const menus = [
    { key: "home", title: "Trang chủ", route: "/" },
    { key: "market-place", title: "Tìm trung tâm", route: "/find-center" },
    { key: "our-team", title: "Đăng ký tiêm", route: "/register-vaccine" },
    { key: "download", title: "Đặt mua vaccine", route: "/buy-vaccine" },
    { key: "whitepaper", title: "Tư vấn", route: "/advisory" },
];

const Header: FC<HeaderProps> = () => {
    const router = useRouter();

    const [isLogin, setIsLogin] = useState(false);

    useEffect(() => {
        if (localStorage.getItem("isLogin")) setIsLogin(true);
        let id: string;
        if (localStorage.getItem("username")) {
            id = JSON.parse(localStorage.getItem("username") || "");
            // console.log(id)
        }
    }, []);

    function logout() {
        localStorage.clear();
        setIsLogin(false);
    }

    const activeFunction = useCallback(
        (compareRouter: string) => {
            return !!((router.asPath as string) === (compareRouter as string));
        },
        [router.asPath]
    );
    return (
        <HeaderStyled>
            <div className="header-container">
                <Container maxWidth="lg">
                    <HeaderWrapper>
                        <div className="logo-container">
                            <Link href="/">
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
                        <div className="menu-container">
                            <MenuContainer>
                                {menus.map(({ route, title, key }) => (
                                    <li
                                        key={key}
                                        className={
                                            activeFunction(route)
                                                ? "active"
                                                : ""
                                        }
                                    >
                                        <Link href={route}>{title}</Link>
                                    </li>
                                ))}
                            </MenuContainer>
                            <form className="form-search">
                                <input placeholder="Tìm kiếm vaccine" />
                                <button>
                                    <SearchIcon />
                                </button>
                            </form>
                        </div>
                        {isLogin ? (
                            <div className="account-logo">
                                <Link
                                    href={isLogin ? "/my-account" : "/login"}
                                    passHref
                                >
                                    <AccountCircleIcon />
                                </Link>
                                <div className="login-text" onClick={logout}>
                                    Đăng xuất
                                </div>
                            </div>
                        ) : (
                            <div className="login-text">
                                <Link href="/login">Đăng nhập</Link>
                            </div>
                        )}
                    </HeaderWrapper>
                </Container>
            </div>
        </HeaderStyled>
    );
};

export interface HeaderProps {
    s?: string;
}

export default Header;
