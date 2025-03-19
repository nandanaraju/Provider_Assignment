const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerDocs = require('./swagger');
const providerRoutes = require('./src/routes/providerRoutes');
const sequelize = require("./src/config/database");
const db = require('./models');
require("dotenv").config();
const app = express();
app.use(express.json());

app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use('/api/providers', providerRoutes);



app.listen(3000, () => console.log('Server running on http://localhost:3000'));

// Sync models
sequelize.authenticate()
  .then(() => console.log('Database connected'))
  .catch(err => console.error('Error connecting to database:', err));
