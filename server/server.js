import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import connectDB from "./connectDB/dbConnection.js";
import routes from "./routes/routes.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;


// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// routes
app.use("/", routes);

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.listen(PORT, () => {
    console.log(
        `Server running in ${process.env.NODE_ENV} mode on: http://localhost:${PORT}`.bgCyan.white
    );
    connectDB();
});

