import axios from "./axios";

const getProfitInMonth = (year, month) => {
  return axios
    .get(
      `/business-management/statistics/statisticsProfitInMonth?year=${year}&month=${month}`
    )
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error.response.data;
    });
};

const getProfitAllMonths = (year) => {
  return axios
    .get(
      `/business-management/statistics/statisticsProfitAllMonthInYear?year=${year}`
    )
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error.response.data;
    });
};

const getProfitInYear = (year) => {
  return axios
    .get(`/business-management/statistics/statisticsProfitInYear?year=${year}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error.response.data;
    });
};

const getRevenueAllMonths = (year) => {
  return axios
    .get(
      `/business-management/statistics/statisticsRevenueAllMonthInYear?year=${year}`
    )
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error.response.data;
    });
};

const getRevenueDayInMonth = (year, month) => {
  return axios
    .get(
      `/business-management/statistics/statisticsRevenueDayInMonth?year=${year}&month=${month}`
    )
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error.response.data;
    });
};

const getRevenueInYear = (year) => {
  return axios
    .get(
      `/business-management/statistics/statisticsRevenueAllDayInYear?year=${year}`
    )
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error.response.data;
    });
};

const getFoodSoldInYear = (year) => {
  return axios
    .get(
      `/business-management/statistics/statisticsFoodSoldAllDayInYear?year=${year}`
    )
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error.response.data;
    });
};

const getFoodSoldAllMonth = (year, month) => {
  return axios
    .get(
      `/business-management/statistics/statisticsFoodSoldAllMonthInYear?year=${year}`
    )
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error.response.data;
    });
};

const getFoodSoldAllDayInMonth = (year, month) => {
  return axios
    .get(
      `/business-management/statistics/statisticsFoodSoldInMonth?year=${year}&month=${month}`
    )
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error.response.data;
    });
};
export {
  getProfitInMonth,
  getProfitAllMonths,
  getProfitInYear,
  getRevenueAllMonths,
  getRevenueDayInMonth,
  getRevenueInYear,
  getFoodSoldAllDayInMonth,
  getFoodSoldAllMonth,
  getFoodSoldInYear,
};
