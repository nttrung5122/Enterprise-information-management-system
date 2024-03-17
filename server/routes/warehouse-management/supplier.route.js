const router = require("express").Router();
const { SupplierController } = require("../../controller/warehouse-management");

// /warehouse-management/supplier
router.get("/", SupplierController.getAll);
router.post("/", SupplierController.create);
router.get("/:id", SupplierController.get);
router.patch("/:id", SupplierController.update);
router.delete("/:id", SupplierController.delete);

module.exports = router;
