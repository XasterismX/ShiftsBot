import 'dotenv/config'
import { Sequelize, DataTypes } from 'sequelize';

const sequelize = new Sequelize('test', process.env.DB_USER, process.env.DB_PASSWORD, {
        host: process.env.DB_HOST,
        dialect: "postgres",
        port: process.env.DB_PORT

});

try {
    await sequelize.authenticate();

    console.log('Connection has been established successfully.');

} catch (error) {
    console.error('Unable to connect to the database:', error);
}

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
const AddStudent = async (name, surname, date) => {
    try{
        await students.create({
            name: name,
            surname: surname,
            date: date
        })
    }
    catch (e){
        console.log(e)
    }
}


export {students, AddStudent, }


