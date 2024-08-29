import express from "express";

import cors from "cors";

const port = process.env.PORT || 9999;

const app = express();
app.use(cors());

app.use(express.json());
app.get("/", async (req, res) => {
  res.send("Server is working great!");
});

import rout from "./routes/route.js";
// import { authenticateToken, authorizeRole } from "./middleware/middleware.js";
app.use("/api/v1", rout);

// import Employer from "./routes/employer.route.js";
// app.use("/api/v1/employer", Employer);

// import Admin from "./routes/admin.route.js";
// app.use("/api/v1/admin", Admin);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
