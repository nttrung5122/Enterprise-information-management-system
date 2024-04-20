const router = require('express').Router();
const menuRoutes = require('./menu.route')
const recipeRoutes = require('./recipe.route')
const sectionMenuRoutes = require('./section_menu.route')
const foodRoutes = require('./food.route')
const billRoutes = require('./bill.route')
const statisticsRoutes = require('./statistics.route')
// /business-management

router.use('/menu', menuRoutes);
router.use('/recipe', recipeRoutes);
router.use('/section-menu', sectionMenuRoutes);
router.use('/food', foodRoutes);
router.use('/bill', billRoutes);
router.use('/statistics', statisticsRoutes);

module.exports = router