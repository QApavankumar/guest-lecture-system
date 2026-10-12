const express = require('express');
const {
  getRequests,
  createRequest,
  updateRequestStatus,
  assignLecturer
} = require('../controllers/requestController');

const router = express.Router();

router.get('/', getRequests);
router.post('/', createRequest);
router.patch('/:id/status', updateRequestStatus);
router.patch('/:id/assign', assignLecturer);

module.exports = router;

