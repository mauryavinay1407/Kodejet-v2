const express = require('express');
const { runJob, getJobStatus } = require("../controllers/jobController.js");

const router = express.Router();

router.post('/run', runJob);
router.get('/status', getJobStatus);

module.exports = router;