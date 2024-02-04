require("dotenv").config()
const { Telegraf } = require('telegraf')
const { message } = require('telegraf/filters')
let axios = require("axios")


let userStage = 0


const bot = new Telegraf(process.env.TG_API_KEY)
bot.start((ctx) => ctx.reply('Welcome'))
bot.on('message', async (ctx) => {
    if (ctx.message.text) {
        if (ctx.message.text == 'привет') {
            ctx.reply('Тебя интересует погода?')
            userStage = 1



        } else if (ctx.message.text == 'да' && userStage == 1) {
            ctx.reply('Пришлите пожалуйста свою геопозицию')
            userStage = 2
        }
    }
    if (ctx.message.location) {
        let url = `https://api.openweathermap.org/data/2.5/weather?lat=${ctx.message.location.latitude}&lon=${ctx.message.location.longitude}&appid=${process.env.WEATHER_API_KEY}&lang=ru&units=metric`
        let response = await axios.get(url)
        console.log(response)
        ctx.reply(`район: ${response.data.name}, \nтемпература: ${response.data.main.temp}`)
    }

})
bot.launch()



// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))