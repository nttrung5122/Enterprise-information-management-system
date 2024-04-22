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

const deleteFood = (id) => {
  return axios
    .delete(`/business-management/recipe/${id}`)
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
export {
  fetchAllRecipe,
  createRecipe,
  deleteRecipe,
  updateRecipe,
  fetchAllFood,
  deleteFood,
  addFood,
  updateFood,
};
