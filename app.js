import 'dotenv/config'
import TelegramBot from "node-telegram-bot-api";
import {sequelize, students} from './database.js'
import {AddStudent} from './StudentBd.js'
import * as path from "path";
import {json} from "sequelize";

const token = process.env.T_TOKEN;
const bot = new TelegramBot(token, {polling: true});


const admins = [process.env.ADMIN_ID]



bot.on('message', async (msg) => {
    if (msg.text === '/add') {
        bot.sendMessage(msg.chat.id, "Введите имя фамилию и день недели через пробел").then(res => {

            bot.on('message', (msg) => {
                let values = msg.text.split(' ')
                if(values.length < 3){
                    bot.sendMessage(msg.chat.id, 'Введите все значения')
                }else {
                    AddStudent(values[0], values[1],values[2]).then(r => {
                        bot.sendMessage(msg.chat.id, 'Значения добавлены')
                    })
                }
            })

        })

    }

if(msg.text === '/blanki'){
            bot.sendDocument(msg.chat.id, './static' + '/blanki.docx')

}
    if(msg.text === '/all') {
       const stud = await students.findAll()
        let message = []

        for (const studKey in stud) {
                const {name, surname} = stud[studKey]
            message.push((Number(studKey)+1) +') '+name +' '+ surname)
        }

        bot.sendMessage(msg.chat.id, `${message.join('\n')}`)
        }
        if (msg.text === '/today') {
            let nowDay = new Date().getDay()
            const days = {
                1:'Понедельник',
                2:'Вторник',
                3: 'Среда',
                4: 'Четверг',
                5: 'Пятница',
                6: 'Суббота',
            }
            bot.sendMessage(msg.chat.id, 'Сегодня дежурят: ')
            const {name, surname} = await students.findAll({raw: true, where: {date: days[nowDay]}})
            bot.sendMessage(msg.chat.id, `${name} ${surname}`)


            }


    })


// Запускаем бота
bot.on('polling_error', (error) => {
    sequelize.authenticate()
    sequelize.sync()
    console.log(error);
})
