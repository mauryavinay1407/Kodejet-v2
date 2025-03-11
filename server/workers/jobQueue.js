const { Queue } = require("bullmq");
const redisConnection = require("../config/redisConnection");

const jobQueue = new Queue("job-runner-queue",{connection: redisConnection});

const addJobToQueue = async (jobId) => {
    await jobQueue.add("runJob", { id: jobId });
};

module.exports = { addJobToQueue };
