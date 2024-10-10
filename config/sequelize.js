"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize = new sequelize_1.Sequelize("node_ts_test", "root", "Root123!", {
    host: "localhost",
    dialect: "mysql",
    logging: console.log
});
sequelize.authenticate().then(() => {
    console.log("Connection has been established successfully.");
}).catch((error) => {
    console.error("Unable to connect to the database:", error);
});
exports.default = sequelize;
