import React, { useState } from "react";
import { Button, Form, Input, Space, message } from "antd";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";

const MainContainer = styled.div`
  width: 100dvw;
  height: 100dvh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledForm = styled(Form)`
  background-color: #ebe3d6;
  padding: 3rem;
  width: 30%;
  border-radius: 5px;
`;

interface ILogin {
  email: string;
  password: string;
}

const defaultLogin: ILogin = {
  email: "",
  password: "",
};

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [loginInfo, setLoginInfo] = useState<ILogin>(defaultLogin);
  const [messageApi, contextHolder] = message.useMessage();

  const onChangeLogin = (key: keyof ILogin, value: string) => {
    setLoginInfo((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const onSubmit = async () => {
    try {
      const resp = await axiosInstance.post("/auth/login", loginInfo, {
        withCredentials: true,
      });
      localStorage.setItem("userInfo", JSON.stringify(resp?.data?.data?.user));
      messageApi.open({
        type: "success",
        content: resp?.data?.message,
      });
      navigate("/");
    } catch (err: unknown) {
      messageApi.open({
        type: "error",
        content: err?.response?.data?.message,
      });
    }
  };
  return (
    <MainContainer>
      {contextHolder}
      <StyledForm name="validateOnly" layout="vertical" autoComplete="off">
        <Form.Item name="email" label="Email" rules={[{ required: true }]}>
          <Input
            value={loginInfo.email}
            onChange={(e) => onChangeLogin("email", e.target.value)}
          />
        </Form.Item>
        <Form.Item
          name="password"
          label="password"
          rules={[{ required: true }]}
        >
          <Input
            type="password"
            value={loginInfo.password}
            onChange={(e) => onChangeLogin("password", e.target.value)}
          />
        </Form.Item>
        <Form.Item>
          <Space>
            <Button onClick={onSubmit} type="primary">
              Submit
            </Button>
            <Button htmlType="reset">Reset</Button>
          </Space>
        </Form.Item>
      </StyledForm>
    </MainContainer>
  );
};

export default Login;
