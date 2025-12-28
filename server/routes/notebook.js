const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const {
    getNotebooks,
    getNotebook,
    getDefaultNotebook,
    createNotebook,
    updateNotebook,
    deleteNotebook
} = require('../controllers/notebook');

// All routes require authentication
router.use(protect);

// Get all notebooks for user
router.get('/', getNotebooks);

// Get default notebook (or create if doesn't exist)
router.get('/default', getDefaultNotebook);

// Get single notebook
router.get('/:id', getNotebook);

// Create new notebook
router.post('/', createNotebook);

// Update notebook
router.put('/:id', updateNotebook);

// Delete notebook
router.delete('/:id', deleteNotebook);

module.exports = router;
