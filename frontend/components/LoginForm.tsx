import { useEffect, useState } from "react";
import styled from "styled-components";
import { theme } from "styles/theme"
import Link from "next/link";
import { useRouter } from "next/router";

const Container = styled.div`
    margin: 60px auto;
    width: 540px;
    padding: 80px 100px;


    border: 1px solid #ccc;
    border-radius: 20px;
    background-color: ${theme?.colors?.blue0};
    -webkit-box-shadow: -7px 8px 15px 2px rgba(0, 0, 0, 0.68);
    box-shadow: -7px 8px 15px 2px rgba(0, 0, 0, 0.68);

    & > h2 {
        font-size: 32px;
        font-weight: bold;
        margin-bottom: 30px;
        color: white;
    }
    .relative {
      margin-top: 34px;
      display: flex;
      justify-content: space-between;
      color: white;
      & a:hover {
        color: ${theme?.colors?.pink4};
      }
    }
`;

const Button = styled.button`
  display: block;
  margin: 14px auto;
  padding: 8px 30px;
  background-color: white;
  border-radius: 4px;
  color: black;
  &:hover {
    background-color: ${theme?.colors?.pink4};
    color: white;

  }
`;

const Row = styled.div`
    & > input {
        margin-bottom: 20px;
        padding: 6px 0;
        padding-left: 12px;
        border-radius: 6px;
        width: 340px;
        outline: none;
        font-size: 16px;
    }
`;

const LoginForm = () => {
  const router = useRouter();
    const [data, setData] = useState({
        username: "",
        password: "",
    });
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = () => {
        setData({ username, password });
        setUsername("");
        setPassword("");
        // call api ....

        const userData = {
            status: true,
            username: 'KH001',
        };
        if (userData.status) {
          localStorage.setItem("isLogin", JSON.stringify(userData.status));
          localStorage.setItem("username", JSON.stringify(userData.username));
          router.push('/');
        }
    };
    return (
        <Container>
            <h2>Đăng nhập</h2>
            <div className="login-form">
                <Row>
                  <input
                      onChange={(e) =>
                          setData({
                              username: e.target.value,
                              password: data.password,
                          })
                      }
                      id="username"
                      placeholder="Tên đăng nhập"
                  ></input>
                </Row>

                <Row>
                  <input
                      onChange={(e) =>
                          setData({
                              username: data.username,
                              password: e.target.value,
                          })
                      }
                      type="password"
                      id="password"
                      placeholder="Mật khẩu"
                  ></input>
                </Row>
                <Button
                    onClick={handleSubmit}>
                    Đăng nhập
                </Button>
            </div>
            <div className="relative">
                <Link href="/">
                      Quên mật khẩu
                </Link>
                <Link href="/register">
                      Đăng ký tài khoản
                </Link>
            </div>
        </Container>
    );
};

export default LoginForm;