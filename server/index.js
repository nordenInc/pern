require("dotenv").config();
const express = require("express");
const sequelize = require("./db");
const models = require('./models/Models')
const filesUpload = require('express-fileupload')
const cors = require('cors')
const router = require('./routes/index')
const errorHandler = require('./middleware/ErrorHandlingMiddleware')
const path = require('path')

const PORT = process.env.PORT;

const app = express();
app.use(cors())
app.use(express.json())
app.use(express.static(path.resolve(__dirname, 'static')))
app.use(filesUpload({}))
app.use('/api', router)


// error handler, last middleware
app.use(errorHandler)

const start = async () => {
  try {
		await sequelize.authenticate()
		await sequelize.sync()
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  } catch (e) {
    console.log(e);
  }
};

start()