const router = require('express').Router();
const {StatisticsController} = require('../../controller/business-management')

// /business-management/statistics

// Doanh thu
router.get('/statisticsRevenueAllMonthInYear',StatisticsController.statisticsRevenueAllMonthInYear) // doanh thu các tháng trong 1 năm
router.get('/statisticsRevenueDayOfMonth',StatisticsController.statisticsRevenueDayOfMonth) // doanh thu các ngày trong 1 tháng
router.get('/statisticsRevenueAllDayInYear',StatisticsController.statisticsRevenueAllDayInYear)  // doanh thu các ngày trong 12 tháng

// Lợi nhuận
router.get('/statisticsProfitInMonth',StatisticsController.statisticsProfitInMonth)  // lợi nhuận trong 1 tháng
router.get('/statisticsProfitAllMonthInYear',StatisticsController.statisticsProfitAllMonthInYear)  // lợi nhuận các tháng trong 1 năm
router.get('/statisticsProfitInYear',StatisticsController.statisticsProfitInYear)  // lợi nhuận trong 1 năm

// món ăn
router.get('/statisticsFoodSoldAllDayInYear',StatisticsController.statisticsFoodSoldAllDayInYear) // món ăn bán được các ngày trong 12 tháng 
router.get('/statisticsFoodSoldInMonth',StatisticsController.statisticsFoodSoldAllDayInMonth) // món ăn bán được các ngày trong 1 tháng
router.get('/statisticsFoodSoldAllMonthInYear',StatisticsController.statisticsFoodSoldAllMonthInYear) // món ăn bán được các tháng trong 1 năm

// nguyên liệu tiêu thụ

router.get('/statisticsIngredientsConsumedAllDayInYear',StatisticsController.statisticsIngredientsConsumedAllDayInYear) // Nguyên liệu tiêu thụ từng ngày trong 12 tháng 
router.get('/statisticsIngredientsConsumedInMonth',StatisticsController.statisticsIngredientsConsumedInMonth) // Nguyên liệu tiêu thụ từng ngày trong 1 tháng
router.get('/statisticsIngredientsConsumedAllMonthOfYear',StatisticsController.statisticsIngredientsConsumedAllMonthOfYear) // Nguyên liệu tiêu thụ từng tháng trong 1 năm

module.exports = router;