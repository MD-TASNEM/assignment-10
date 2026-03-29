const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const { closeDB, connectDB } = require("./config/db");
const errorHandler = require("./middleware/errorHandler");

dotenv.config();

const app = express();
const defaultAllowedOrigins = [
  "http://localhost:3000",
  "http://127.0.0.1:3000",
  "http://localhost:5173",
  "http://127.0.0.1:5173",
];
const allowedOrigins = [
  ...new Set([
    ...defaultAllowedOrigins,
    ...(process.env.CLIENT_URL || "")
      .split(",")
      .map((origin) => origin.trim())
      .filter(Boolean),
  ]),
];

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
        return;
      }

      callback(new Error(`CORS blocked for origin: ${origin}`));
    },
    credentials: true,
  }),
);

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use("/api/challenges", require("./routes/challenges"));
app.use("/api/user-challenges", require("./routes/userChallenges"));
app.use("/api/tips", require("./routes/tips"));
app.use("/api/events", require("./routes/events"));
app.use("/api/stats", require("./routes/stats"));

app.get("/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    message: "EcoTrack Server is running",
    timestamp: new Date().toISOString(),
  });
});

app.get("/", (req, res) => {
  res.json({
    name: "EcoTrack API",
    version: "1.0.0",
    description: "Sustainable Living Community Platform",
    endpoints: {
      challenges: "/api/challenges",
      userChallenges: "/api/user-challenges",
      tips: "/api/tips",
      events: "/api/events",
      stats: "/api/stats",
    },
  });
});

app.use("*", (req, res) => {
  res.status(404).json({ message: `Route ${req.originalUrl} not found` });
});

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
let server;

const startServer = async () => {
  try {
    await connectDB();

    server = app.listen(PORT, () => {
      console.log(
        `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`,
      );
    });
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

process.on("unhandledRejection", async (err) => {
  console.log(`Error: ${err.message}`);

  if (server) {
    server.close(() => process.exit(1));
    return;
  }

  await closeDB();
  process.exit(1);
});

startServer();
