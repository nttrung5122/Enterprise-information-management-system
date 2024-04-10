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

const deleteUser = (employeeId, date) => {
  return axios
    .delete("/human-resource-management/employee/delete-employee", {
      data: { employeeId: employeeId, date: date }, // Passing employeeId as data
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log("Check error: ", error);
      throw error.response.data;
    });
};
const updateUserContract = (employeeId, roleId, salaryScale, date) => {
  return axios
    .post("/human-resource-management/employee/update-role", {
      employeeId: employeeId,
      roleId: roleId,
      salaryScale: salaryScale,
      date: date,
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log("Check error:", error);
      throw error.response.data;
    });
};

const updateUserInfo = (employeeId, email, phoneNumber, address) => {
  return axios
    .patch("/human-resource-management/employee/change-info-employee", {
      employeeId: employeeId,
      email: email,
      phoneNumber: phoneNumber,
      address: address,
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log("Check error: ", error);
      throw error.response.data;
    });
};

const getUserSalaryInMonth = (employeeId, year) => {
  return axios
    .get(
      `/human-resource-management/employee/statictis-my-salary-by-month?year=${year}&employeeId=${employeeId}`
    )
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log("Check error: ", error);
      throw error.response.data;
    });
};

const getAllIngredients = () => {
  return axios
    .get("/warehouse-management/ingredient")
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log("Check error: ", error);
      throw error.response.data;
    });
};

const addIngredient = (ingredientData) => {
  return axios
    .post("/warehouse-management/ingredient", ingredientData)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log("Check error: ");
      throw error.response.data;
    });
};

const deleteIngredient = (id) => {
  return axios
    .delete(`/warehouse-management/ingredient/${id}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log("Check error: ");
      throw error.response.data;
    });
};

const updateIngredient = (id, ingredientInfo) => {
  return axios
    .patch(`/warehouse-management/ingredient/${id}`, ingredientInfo)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log("Check error: ");
      throw error.response.data;
    });
};

const fetchAllSuppliers = () => {
  return axios
    .get(`/warehouse-management/supplier`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log("Check error: ");
      throw error.response.data;
    });
};

const deleteSupplier = (id) => {
  return axios
    .delete(`/warehouse-management/supplier/${id}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log("Check error: ");
      throw error.response.data;
    });
};

const addSupplier = (supplierInfo) => {
  return axios
    .post(`/warehouse-management/supplier`, supplierInfo)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error.response.data;
    });
};

const updateSupplier = (id, supplierInfo) => {
  return axios
    .patch(`/warehouse-management/supplier/${id}`, supplierInfo)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error.response.data;
    });
};
export {
  loginApi,
  fetchAllUsers,
  addNewUser,
  deleteUser,
  updateUserContract,
  updateUserInfo,
  getUserSalaryInMonth,
  getAllIngredients,
  addIngredient,
  deleteIngredient,
  updateIngredient,
  fetchAllSuppliers,
  deleteSupplier,
  addSupplier,
  updateSupplier,
};
