import { useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance.ts";
import axios from "axios";

const Home = () => {
  const navigate = useNavigate();
  const fetchUser = useCallback(async () => {
    try {
      // const response = await axiosInstance.get("/auth/user");
      const response = axios("http://localhost:8080/v1/auth", {
        method: "get",
        withCredentials: true,
      });
      if (response.status !== 201) {
        navigate("/login");
      }
    } catch (err) {
      navigate("/login");
      console.log(err);
    }
  }, [navigate]);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);
  return <div className="text-3xl text-blue-500">Home</div>;
};

export default Home;
