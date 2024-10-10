"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const sequelize_1 = __importDefault(require("./config/sequelize"));
const app = (0, express_1.default)();
const port = 5000;
app.use(express_1.default.json());
app.get('/', (req, res) => {
    res.send('Hello, World!');
});
sequelize_1.default.sync({ alter: true }).then(() => {
    app.listen(5000, () => console.log('listening on port ' + port));
}).catch(err => console.log(err));
