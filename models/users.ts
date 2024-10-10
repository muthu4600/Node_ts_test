import { DataTypes, Model } from "sequelize";
import sequelize from "../config/sequelize";

class Users extends Model {
}

Users.init({
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    userName: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
}, {
    sequelize,
    modelName: 'Users',
    tableName: 'users',
    timestamps: true,
    freezeTableName: true,
});

export default Users;