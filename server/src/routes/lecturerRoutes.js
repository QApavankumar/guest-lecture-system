const express = require('express');
const { getLecturers, addLecturer } = require('../controllers/lecturerController');

const router = express.Router();

router.get('/', getLecturers);
router.post('/', addLecturer);

module.exports = router;

