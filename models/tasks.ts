import { DataTypes, Model } from "sequelize";
import sequelize from "../config/sequelize";

class Tasks extends Model {
}

Tasks.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: { type: DataTypes.STRING, allowNull: false },
    status: { type: DataTypes.ENUM('pending', 'completed'), defaultValue: 'pending' },
}, {
    sequelize,
    modelName: 'tasks',
    tableName: 'tasks',
    timestamps: true,
    freezeTableName: true,
});

export default Tasks;