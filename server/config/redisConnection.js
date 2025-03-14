const { Redis } = require("ioredis");

if (process.env.REDIS_URL) {
    redisConnection = new Redis(process.env.REDIS_URL, {
        maxRetriesPerRequest: null,
    });
} else {
    redisConnection = new Redis({
        host: process.env.REDIS_HOST || "host.docker.internal",
        port: process.env.REDIS_PORT || 6379,
        maxRetriesPerRequest: null,
    });
}

redisConnection.on("error", (err) => {
    console.error("Redis connection failed:", err);
});

redisConnection.on("connect", () => {
    console.log("Connected to Redis successfully!");
});

module.exports = redisConnection;
