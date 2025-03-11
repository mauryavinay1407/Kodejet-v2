const { Worker } = require("bullmq");
const Job = require("../models/job.model");
const { executeCpp } = require("../services/executeCpp");
const { executePython } = require("../services/executePython");
const { executeJs } = require("../services/executeJs");
const { executeC } = require("../services/executeC");
const { executeJava } = require("../services/executeJava");
const redisConnection = require("../config/redisConnection");
const mongoose = require("mongoose");

// Function to check if Redis is ready
const checkRedisConnection = async () => {
    return new Promise((resolve, reject) => {
        redisConnection.ping((err) => {
            if (err) {
                console.error("Redis connection not ready:", err);
                reject(err);
            } else {
                console.log("Redis connection is ready");
                resolve();
            }
        });
    });
};

// Function to check if MongoDB is ready  
const checkMongoConnection = async () => {
    return new Promise((resolve, reject) => {
        if (mongoose.connection.readyState === 1) {
            console.log("MongoDB connection is ready");
            resolve();
        } else {
            mongoose.connection.on("connected", () => {
                console.log("MongoDB connection is ready");
                resolve();
            });
            mongoose.connection.on("error", (err) => {
                console.error("MongoDB connection failed:", err);
                reject(err);
            });
        }
    });
};

// Function to start the worker
const startWorker = async () => {
    try {
        // Wait for Redis to be ready
        await checkMongoConnection();
        await checkRedisConnection();

        // Create a BullMQ worker
        const jobWorker = new Worker(
            "job-runner-queue",
            async (job) => {
                const jobId = job.data.id;
                const jobRecord = await Job.findById(jobId);

                if (!jobRecord) {
                    throw new Error(`Job with ID ${jobId} not found`);
                }

                try {
                    let output;
                    jobRecord.startedAt = new Date();

                    const { language, filepath } = jobRecord;

                    switch (language) {
                        case "cpp":
                            output = await executeCpp(filepath);
                            break;
                        case "py":
                            output = await executePython(filepath);
                            break;
                        case "js":
                            output = await executeJs(filepath);
                            break;
                        case "c":
                            output = await executeC(filepath);
                            break;
                        case "java":
                            output = await executeJava(filepath);
                            break;
                        default:
                            throw new Error(`Unsupported language: ${language}`);
                    }

                    jobRecord.completedAt = new Date();
                    jobRecord.status = "success";
                    jobRecord.output = output;
                    await jobRecord.save();
                } catch (error) {
                    jobRecord.completedAt = new Date();
                    jobRecord.status = "error";
                    jobRecord.output = JSON.stringify(error);
                    await jobRecord.save();
                    throw error; 
                }
            },
            {
                connection: redisConnection,
            }
        );

        // Attach event listeners to the worker
        jobWorker.on("failed", (job, err) => {
            console.error(`Job ${job.id} failed with error: ${err.message}`);
        });

        console.log("Worker started successfully");
    } catch (err) {
        console.error("Failed to start worker:", err);
        process.exit(1); 
    }
};

// Start the worker
startWorker();