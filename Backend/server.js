const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const db_connection = require("./database/index");
require('dotenv').config();
var cors = require('cors');

const PORT = process.env.PORT || 3000;

const staffRoutes = require("./routes/staff"); 
const authRoutes = require("./routes/auth"); 
const attendanceRoutes = require("./routes/attendance"); 
const leavesRoutes = require("./routes/leave"); 
const menuRoutes = require("./routes/menu");
const supplierRoutes = require("./routes/supplier");

const app = express();

app.use(cors()); 
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

db_connection();

app.use("/staff", staffRoutes); 
app.use("/auth", authRoutes);
app.use("/attendance", attendanceRoutes);
app.use("/leaves", leavesRoutes);
app.use("/menu", menuRoutes); 
app.use("/supplier", supplierRoutes); 

supplierRoutes
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
