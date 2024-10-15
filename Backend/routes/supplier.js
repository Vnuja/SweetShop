const express = require('express');
const router = express.Router();
const supplierController = require('../controllers/supplierController');

// Add a new supplier
router.post('/add-supplier/', supplierController.addNewSupplier);

// Delete a supplier
router.delete('/delete-supplier/:id', supplierController.deleteSupplier);

// Get all suppliers
router.get('/get-suppliers/', supplierController.getAllSuppliers);

// Get a single supplier by ID
router.get('/get-supplier/:id', supplierController.getSupplierById);

// Update a supplier
router.put('/update-supplier/:id', supplierController.updateSupplier);

// Get supplier count by category
router.get('/category-counts', supplierController.getCategoryCounts);

module.exports = router;
