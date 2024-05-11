import axios from "./axios";

const loginApi = ({ user, password }) => {
  return axios
    .post("/auth/login", { user, password })
    .then((response) => {
      // Handle successful login response
      const userData = response.data;
      if (!userData.role) return response.data; // Assuming the server returns some data on successful login
    })
    .catch((error) => {
      // Handle login error
      console.error("Login Error:", error);
      throw error; // Rethrow the error to propagate it further if needed
    });
};

const changePasswordByAdmin = (accountData) => {
  return axios
    .post(
      `/human-resource-management/account/change-password-for-manager`,
      accountData
    )
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error.response.data;
    });
};

const fetchAllUsers = () => {
  return axios
    .get("/human-resource-management/employee")
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error.response.data;
    });
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

const deleteUser = (employeeData) => {
  return axios
    .post("/human-resource-management/employee/delete-employee", employeeData) // Passing employeeId as data

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
      `/human-resource-management/employee/statistic-my-salary-by-month?year=${year}&employeeId=${employeeId}`
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

const fetchAllInventory = () => {
  return axios
    .get(`/warehouse-management/warehouse`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error.response.data;
    });
};

const updateInventory = (id, quantity) => {
  return axios
    .patch(`/warehouse-management/warehouse/${id}`, quantity)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error.response.data;
    });
};

const fetchAllReceipts = () => {
  return axios
    .get(`/warehouse-management/receipt`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error.response.data;
    });
};

const addReceipt = (receiptData) => {
  return axios
    .post(`/warehouse-management/receipt`, receiptData)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error.response.data;
    });
};

const fetchAllCancellationForms = () => {
  return axios
    .get(`/warehouse-management/cancellation-form`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error.response.data;
    });
};

const addCancellationForm = (formData) => {
  return axios
    .post(`/warehouse-management/cancellation-form`, formData)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error.response.data;
    });
};

const getAllRole = () => {
  return axios
    .get(`/human-resource-management/role`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error.response.data;
    });
};
const addRole = (roleData) => {
  return axios
    .post(`/human-resource-management/role`, roleData)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error.response.data;
    });
};
const updateRole = (roleData) => {
  return axios
    .patch(`/human-resource-management/role`, roleData)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error.response.data;
    });
};
const deleteRole = (roleId) => {
  return axios
    .delete(`/human-resource-management/role/${roleId}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error.response.data;
    });
};

const checkDateCheckIn = (month, year, employeeId) => {
  return axios
    .get(
      `/human-resource-management/employee/getCheckInMonth/?month=${month}&year=${year}&employeeId=${employeeId}`
    )
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error.response.data;
    });
};

const updateCheckIn = (data) => {
  return axios
    .post(`/human-resource-management/employee/updateCheckIn`, data)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error.response.data;
    });
};
const checkIn = () => {
  return axios
    .post(`human-resource-management/employee/check-in-daily`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error.response.data;
    });
};
const checkInByManager = (data) => {
  return axios
    .post(`/human-resource-management/employee/timekeeping`, data)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error.response.data;
    });
};
export {
  loginApi,
  changePasswordByAdmin,
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
  fetchAllInventory,
  updateInventory,
  fetchAllReceipts,
  addReceipt,
  fetchAllCancellationForms,
  addCancellationForm,
  getAllRole,
  addRole,
  updateRole,
  deleteRole,
  checkDateCheckIn,
  updateCheckIn,
  checkIn,
  checkInByManager,
};
