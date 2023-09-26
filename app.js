import 'dotenv/config'
import TelegramBot from "node-telegram-bot-api";
import {AddStudent, students} from './database.js'


const token = process.env.T_TOKEN;
const bot = new TelegramBot(token, {polling: true});


const admins = [process.env.ADMIN_ID]




bot.on('message', (msg) =>{
    if (msg.text === '/add' && msg.from.id === admins[0]) {
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
})




bot.on('message', (msg) => {
    if (msg.text === '/today') {
        let nowDay = new Date().getDay()
        switch (nowDay) {
            case 1:
                bot.sendMessage(msg.chat.id, 'Сегодня дежурят: ')
                students.findAll({raw: true, where: {date: 'понедельник'}}).then(r => {
                    for (let i = 0; i < 4; i++) {

                        bot.sendMessage(msg.chat.id,`${r[i].name} ${r[i].surname} `)


                    }
                })
                break;
            case 2:
                bot.sendMessage(msg.chat.id, 'Сегодня дежурят: ')
                students.findAll({raw: true, where: {date: 'Вторник'}}).then(r => {
                    for (let i = 0; i < 4; i++) {

                        bot.sendMessage(msg.chat.id,`${r[i].name} ${r[i].surname} `)


                    }
                })

                break;
            case 3:
                bot.sendMessage(msg.chat.id, 'Сегодня дежурят: ')
                students.findAll({raw: true, where: {date: 'Среда'}}).then(r => {
                    for (let i = 0; i < 4; i++) {

                        bot.sendMessage(msg.chat.id,`${r[i].name} ${r[i].surname} `)


                    }
                })
                break;
            case 4:
                bot.sendMessage(msg.chat.id, 'Сегодня дежурят: ')
                students.findAll({raw: true, where: {date: 'Четверг'}}).then(r => {
                    for (let i = 0; i < 4; i++) {

                        bot.sendMessage(msg.chat.id,`${r[i].name} ${r[i].surname} `)


                    }
                })
                break;
            case 5:
                bot.sendMessage(msg.chat.id, 'Сегодня дежурят: ')
                students.findAll({raw: true, where: {date: 'Пятница'}}).then(r => {
                    for (let i = 0; i < 4; i++) {

                        bot.sendMessage(msg.chat.id,`${r[i].name} ${r[i].surname} `)


                    }
                })
                break;
            case 6:
                bot.sendMessage(msg.chat.id, 'Сегодня дежурят: ')
                students.findAll({raw: true, where: {date: 'Суббота'}}).then(r => {
                    for (let i = 0; i < 4; i++) {

                        bot.sendMessage(msg.chat.id,`${r[i].name} ${r[i].surname} `)


                    }
                })
                break;
        }
    }

})

bot.on('message', (msg) => {
    if(msg.text === '/all'){
        students.findAll({raw: true}).then(r => {
            for (let i = 0; i < r.length; i++) {

                bot.sendMessage(msg.chat.id,`${r[i].name} ${r[i].surname}`)


            }
        })
    }
})

// Запускаем бота
bot.on('polling_error', (error) => {
    console.log(error);
});
