import {students} from "./database.js";

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
export {AddStudent}