import { LoginPayload } from "features/auth/authSlice";
import axiosClient from "./axiosClient";

const authApi = {
  login(data: LoginPayload) {
    const url = "/auth/login";
    return axiosClient.post(url, data, {
      baseURL: "https://api-kctrnn.herokuapp.com",
    });
  },
};

export default authApi;
