import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance.ts";
import axios from "axios";
import { Segmented, TabsProps } from "antd";
import styled from "styled-components";

const MainContainer = styled.div`
  width: 100dvh;
  height: 100dvh;
  padding-top: .5rem;
`


interface IUser {
  name: string;
  employeeId: string;
  email: string;
  pendingWeeklyMealPlan: boolean[];
  created_at : Date;
  updated_at : Date;
  role :string;
}


const PrintSignetureSheet = () => {
  return <MainContainer>
     <h1>Comming soon...</h1>

  </MainContainer>;
};

export default PrintSignetureSheet;
