import axios from "./axios";

const fetchAllRecipe = () => {
  return axios
    .get(`/business-management/recipe`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error.response.data;
    });
};

const createRecipe = (recipeData) => {
  return axios
    .post(`/business-management/recipe`, recipeData)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error.response.data;
    });
};

const deleteRecipe = (id) => {
  return axios
    .delete(`/business-management/recipe/${id}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error.response.data;
    });
};
const updateRecipe = (id, recipeData) => {
  return axios
    .patch(`/business-management/recipe/${id}`, recipeData)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error.response.data;
    });
};

const fetchAllFood = () => {
  return axios
    .get(`/business-management/food`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error.response.data;
    });
};

const disableFood = (id) => {
  return axios
    .delete(`/business-management/food/${id}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error.response.data;
    });
};

const addFood = (foodData) => {
  return axios
    .post(`/business-management/food`, foodData)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error.response.data;
    });
};
const updateFood = (id, foodData) => {
  return axios
    .patch(`/business-management/food/${id}`, foodData)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error.response.data;
    });
};

const fetchAllMenu = () => {
  return axios
    .get(`/business-management/menu`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error.response.data;
    });
};
const getMenu = (id) => {
  return axios
    .get(`/business-management/menu/${id}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error.response.data;
    });
};
const addMenu = (menuData) => {
  return axios
    .post(`/business-management/menu`, menuData)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error.response.data;
    });
};
const updateMenu = (id, menuData) => {
  return axios
    .patch(`/business-management/menu/${id}`, menuData)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error.response.data;
    });
};
const deleteMenu = (id) => {
  return axios
    .delete(`/business-management/menu/${id}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error.response.data;
    });
};

const fetchAllMenuSection = () => {
  return axios
    .get(`/business-management/section-menu`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error.response.data;
    });
};
const addMenuSection = (sectionData) => {
  return axios
    .post(`/business-management/section-menu`, sectionData)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error.response.data;
    });
};
const updateMenuSection = (id, sectionData) => {
  return axios
    .patch(`/business-management/section-menu/${id}`, sectionData)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error.response.data;
    });
};
const deleteMenuSection = (id) => {
  return axios
    .delete(`/business-management/section-menu/${id}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error.response.data;
    });
};

const getDetailsSection = (id) => {
  return axios
    .get(`/business-management/section-menu/${id}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error.response.data;
    });
};

const getAllBill = () => {
  return axios
    .get(`/business-management/bill`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error.response.data;
    });
};

const createBill = (billData) => {
  return axios
    .post(`/business-management/bill`, billData)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error.response.data;
    });
};
const setBillDone = (id) => {
  return axios
    .patch(`/business-management/bill/set-bill-done/${id}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error.response.data;
    });
};
const updateBill = (id, billData) => {
  return axios
    .patch(`/business-management/bill/${id}`, billData)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error.response.data;
    });
};
const getBill = (id) => {
  return axios
    .get(`/business-management/bill/${id}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error.response.data;
    });
};
const getUndoneBill = () => {
  return axios
    .get(`/business-management/bill/get-bill-no-done`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error.response.data;
    });
};
export {
  fetchAllRecipe,
  createRecipe,
  deleteRecipe,
  updateRecipe,
  fetchAllFood,
  disableFood,
  addFood,
  updateFood,
  fetchAllMenu,
  addMenu,
  getMenu,
  updateMenu,
  deleteMenu,
  fetchAllMenuSection,
  addMenuSection,
  updateMenuSection,
  deleteMenuSection,
  getDetailsSection,
  getAllBill,
  createBill,
  setBillDone,
  updateBill,
  getBill,
  getUndoneBill,
};
