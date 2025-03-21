const express = require("express");
const swaggerUi = require("swagger-ui-express");
const fs = require("fs");
const path = require("path");
const providerRoutes = require("./src/routes/providerRoutes");
const sequelize = require("./src/config/database");
require("dotenv").config();

const app = express();
app.use(express.json());

// Load Swagger JSON
const swaggerPath = path.join(__dirname, "swagger", "swagger.json");
const swaggerDocs = JSON.parse(fs.readFileSync(swaggerPath, "utf-8"));

app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use("/api/providers", providerRoutes);

app.listen(3000, () => console.log("Server running on http://localhost:3000"));

// Sync models
sequelize
  .authenticate()
  .then(() => console.log("Database connected"))
  .catch((err) => console.error("Error connecting to database:", err));
