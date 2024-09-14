import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance.ts";
import axios from "axios";
import styled from "styled-components";
import { Button } from "antd";

const MainContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100dvw;
  height: 100dvh; /* Full screen height */
`;

const LeftContainer = styled.div`
  width: 25%;
  background-color: rgb(59 130 246 / .5);
  color: black;
  padding: 20px;
  box-sizing: border-box;

  @media (max-width: 768px) {
    width: 100%;
    padding: 10px;
  }
`;

const RightContainer = styled.div`
  width: 73%;
  background-color: #f0f0f0;
  padding: 20px;
  box-sizing: border-box;

  @media (max-width: 768px) {
    width: 100%;
    padding: 10px;
  }
`;

interface IUser{
  name: string
  employeeId: string
  email: string
}


const defaultUser:IUser = {
  email:"",
  employeeId:"",
  name: ""
}

const Home = () => {
  const navigate = useNavigate();
  const [userDetails, setUserDetails]= useState<IUser>(defaultUser)

  const onLogout = async()=>{
    try {
      const response = await axios("http://localhost:8080/v1/auth/logout", {
        method: "get",
        withCredentials: true,
      });

      localStorage.removeItem("aes-meal-user")

      if (response.status == 200) {
        navigate("/login");
      }
    } catch (err) {
      console.log(err);
    }
  }


  const fetchUser = useCallback(async () => {
    try {
      const response = await axios("http://localhost:8080/v1/auth/user", {
        method: "get",
        withCredentials: true,
      });

      localStorage.setItem("aes-meal-user", JSON.stringify(response?.data?.data?.userData));
      setUserDetails(response?.data?.data?.userData)

      if (response.status !== 200) {
        navigate("/login");
      }
    } catch (err) {
      console.log(err);
    }
  }, [navigate]);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);
  
  // useEffect(()=>{
  //   const user = JSON.parse(localStorage.getItem("aes-meal-user") || "")
  //   setUserDetails(user)
  // },[])

  return (
    <MainContainer>
      <LeftContainer>
        <div>
           <h2>{userDetails.name}</h2>
           <Button onClick={onLogout}>Logout</Button>
        </div>
        <p>{userDetails.employeeId}</p>
        <p>{userDetails.email}</p>
      </LeftContainer>
      <RightContainer>
        <h2>Right Side</h2>
        <p>Content for the right container.</p>
      </RightContainer>
    </MainContainer>
  );
};

export default Home;
