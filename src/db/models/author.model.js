import { DataTypes } from 'sequelize';
import { sequelize } from "../index.db.js"


export const Author = sequelize.define("authors", {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    birthdate: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    nationality: {
        type: DataTypes.STRING,
        autoIncrement: true,
    }
},
{
    timestamps: true
}
);

//relacion entre many to many entre tabla book y author
//Author.belongsToMany(Profile, { through: 'Book_Author' });