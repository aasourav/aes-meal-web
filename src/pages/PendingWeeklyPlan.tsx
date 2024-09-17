import { useEffect, useState } from "react";
import axios from "axios";
import { Button, Checkbox } from "antd";
import styled from "styled-components";

const MainContainer = styled.div`
  width: 100dvh;
  height: 100dvh;
  padding-top: 0.5rem;
`;
const convertDate = (date: string) => {
  return new Date(date).toLocaleString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
};

const Card = styled.h1`
  display: flex;
  gap: 0.5rem;
  flex-flow: column;
  /* align-items: center; */
  border: 2px solid gray;
  border-radius: 5px;
  padding: 1rem;
`;

const weekOfDay = ["Sun", "Mon", "Tue", "Wed", "Thus", "Fri", "Sat"];

const PendingWeeklyMealPlan = () => {
  // const [pendingWeeklyPlanRequests, setPendingWeeklyPlanRequests] =
  const [pendingWeeklyPlans, setPendingWeeklyPlans] = useState([]);
  const fetchPending = async () => {
    const response = await axios(
      `http://localhost:8080/v1/super-user/get-pending-weekly-meal-plan`,
      {
        method: "get",
        withCredentials: true,
      },
    );

    setPendingWeeklyPlans(response.data.data.pendingWeeklyPlans);
  };

  const onClickAction = async (
    userId: string,
    actionType: "approve" | "reject",
  ) => {
    try {
      await axios(
        `http://localhost:8080/v1/super-user/action-pending-weekly-meal-plan/action/${actionType}/user/${userId}`,
        {
          method: "put",
          withCredentials: true,
        },
      );
      fetchPending();
    } catch (err: any) {
      console.log(err?.message);
    }
  };

  useEffect(() => {
    fetchPending();
  }, []);
  return (
    <MainContainer>
      {pendingWeeklyPlans ? (
        pendingWeeklyPlans.map((data: any) => (
          <Card key={data._id}>
            <div style={{ display: "flex", alignItems: "center", gap: "3rem" }}>
              <p style={{ fontSize: "1rem" }}>{data.name}</p>
              <p style={{ fontSize: ".8rem" }}>
                {convertDate(data.updated_at)}
              </p>
            </div>
            <div style={{ display: "flex" }}>
              {data.pendingWeeklyMealPlan &&
                data.pendingWeeklyMealPlan.map((data: any, index: number) => (
                  <Checkbox key={index} checked={data}>
                    {weekOfDay[index]}
                  </Checkbox>
                ))}
            </div>
            <div style={{ display: "flex", gap: ".5rem" }}>
              <Button
                type="primary"
                onClick={() => onClickAction(data._id, "reject")}
                danger
              >
                Reject
              </Button>
              <Button
                onClick={() => onClickAction(data._id, "approve")}
                type="primary"
              >
                Approve
              </Button>
            </div>
          </Card>
        ))
      ) : (
        <p style={{ paddingLeft: "1rem" }}>Pending weekly plan is empty</p>
      )}
    </MainContainer>
  );
};

export default PendingWeeklyMealPlan;
