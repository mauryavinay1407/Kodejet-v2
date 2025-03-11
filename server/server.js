const express = require("express");
const cors = require("cors");
const { connectToMongoDB } = require("./config/dbConfig");
const jobRouter = require("./routes/jobRoutes");
require("dotenv").config();
require("./workers/jobWorker");

const app = express();

const corsOptions = {
    origin: ["https://kodejet-v2.onrender.com","http://localhost:5173"],
    credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectToMongoDB();

app.use("/api", jobRouter);

app.get("/", (req, res) => {
    res.status(200).json({ msg: "Hello from server" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
