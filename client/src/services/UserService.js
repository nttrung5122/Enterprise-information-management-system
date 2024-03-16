import axios from "./axios";

const loginApi = ({ user, password }) => {
  return axios
    .post("/auth/login", { user, password })
    .then((response) => {
      // Handle successful login response
      return response.data; // Assuming the server returns some data on successful login
    })
    .catch((error) => {
      // Handle login error
      console.error("Login Error:", error);
      throw error; // Rethrow the error to propagate it further if needed
    });
};

const fetchAllUsers = () => {
  return axios.get("/human-resource-management/employee");
};
const addNewUser = (userData) => {
  return axios
    .post("/human-resource-management/employee/add-employee", userData)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log("Check error: ", error);
      throw error.response.data;
    });
};

export { loginApi, fetchAllUsers, addNewUser };
