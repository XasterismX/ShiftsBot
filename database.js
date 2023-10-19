import 'dotenv/config'
import { Sequelize, DataTypes } from 'sequelize';

const sequelize = new Sequelize(process.env.DB, process.env.DB_USER, process.env.DB_PASSWORD, {
        host: process.env.DB_HOST,
        dialect: "postgres",
        port: process.env.DB_PORT

});
const students = sequelize.define('students', {
    id:  {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    name: DataTypes.STRING,
    surname: DataTypes.STRING,
    date: DataTypes.STRING,
});


export {students, sequelize}


