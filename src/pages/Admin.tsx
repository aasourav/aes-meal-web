import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance.ts";
import axios from "axios";
import { Segmented, TabsProps } from "antd";
import styled from "styled-components";
import PendingWeeklyMealPlan from "./PendingWeeklyPlan.tsx";
import EditUsersMealData from "./EditUsersMealData.tsx";
import PrintSignetureSheet from "./PrintSignetureSheet.tsx";

const MainContainer = styled.div`
  width: 100dvh;
  height: 100dvh;
  padding-top: .5rem;
  display:flex;
  flex-flow:column;
`

type Align = 'Pending weekly meal plan' | 'Edit users meal data' | 'Print Signeture Sheet' ;

interface IUser {
  name: string;
  employeeId: string;
  email: string;
  pendingWeeklyMealPlan: boolean[];
  created_at : Date;
  updated_at : Date;
  role :string;
}


const Admin = () => {
  const [alignValue, setAlignValue] = useState<Align>('one');

  const navigate = useNavigate();
  const fetchUser = useCallback(async () => {
    try {
      // const response = await axiosInstance.get("/auth/user");
      const response = await axios("http://localhost:8080/v1/auth/user", {
        method: "get",
        withCredentials: true,
      });
      console.log(response)
      if (response.status !== 200) {
        navigate("/login");
      }

      if (response.data.data.userData.role != "admin"){
        navigate("/home")
      }
    } catch (err) {
      navigate("/login");
      console.log(err);
    }
  }, [navigate]);
console.log("align value:",alignValue)
  useEffect(() => {
    fetchUser();
  }, [fetchUser]);
  return <MainContainer>
     <Segmented
        defaultValue="My meal Info"
        style={{ marginBottom: 8 }}
        size="large"
        type="primary"
        onChange={(value) => console.log(value)}
        options={['Pending weekly meal plan', 'Edit users meal data' , 'Print Signeture Sheet']}
      />
      {alignValue === "Pending weekly meal plan" ? <PendingWeeklyMealPlan/> : alignValue === "Edit users meal data" ? <EditUsersMealData/> :  alignValue === "Print Signeture Sheet"? <PrintSignetureSheet/>: null}
  </MainContainer>;
};

export default Admin;
