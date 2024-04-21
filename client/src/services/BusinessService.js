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

export { fetchAllRecipe, createRecipe, deleteRecipe, updateRecipe };
