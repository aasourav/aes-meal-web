import { useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance.ts";
import axios from "axios";

const Common = () => {
//   const navigate = useNavigate();
//   const fetchUser = useCallback(async () => {
//     try {
//       // const response = await axiosInstance.get("/auth/user");
//       const response = await axios("http://localhost:8080/v1/auth/user", {
//         method: "get",
//         withCredentials: true,
//       });
//       console.log(response)

//       if (response.status !== 200) {
//         navigate("/login");
//       }
//     } catch (err) {
//       navigate("/login");
//       console.log(err);
//     }
//   }, [navigate]);

//   useEffect(() => {
//     fetchUser();
//   }, [fetchUser]);
  return <div className="text-3xl text-blue-500">Home</div>;
};

export default Common;
