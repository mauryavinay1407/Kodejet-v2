const { generateFile } = require("../utils/generateFile");
const Job = require("../models/job.model");
const { addJobToQueue } = require("../workers/jobQueue");

const runJob = async (req, res) => {
    const { language = "cpp", code } = req.body;

    if (!code) {
        return res.status(400).json({ success: false, error: "Empty code body ain't allowed" });
    }

    try {
        const filepath = await generateFile(language, code);
        const job = await Job.create({ language, filepath });
        addJobToQueue(job._id);

        res.status(201).json({ success: true, jobId: job._id });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};

const getJobStatus = async (req, res) => {
    const jobId = req.query.id;

    if (!jobId) {
        return res.status(400).json({ success: false, error: "Missing id query param" });
    }

    try {
        const job = await Job.findById(jobId);
        if (!job) {
            return res.status(404).json({ success: false, error: "Invalid job id" });
        }

        return res.status(200).json({ success: true, job });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
};

module.exports = { runJob, getJobStatus };