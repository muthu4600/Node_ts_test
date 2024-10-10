import { Sequelize } from "sequelize";

const sequelize = new Sequelize("node_ts_test", "root", "Root123!", {
    host: "localhost",
    dialect: "mysql",
    logging: console.log
});

sequelize.authenticate().then(() => {
    console.log("Connection has been established successfully.");
}).catch((error) => {
    console.error("Unable to connect to the database:", error);
});

export default sequelize;