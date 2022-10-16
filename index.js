const express = require('express')
const app = express()
const port = 3000
const https = require("https")
const bodyParser= require("body-parser")
const request = require("request")


app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
   
    res.sendFile(__dirname + '/index.html')
    
})

app.post("/", (req, res)=>{
    const city = req.body.city
    console.log(city)
    const url= "https://api.openweathermap.org/data/2.5/weather?q="+ city + "&appid=6f32371049adafcd30368f337db00a5a&units=metric"
    const request = https.get(url, (response)=>{
        response.on("data", (data)=>{
            const weatherData= JSON.parse(data)
            console.log(weatherData)
            const temp = weatherData.main.temp
            const {description, icon} = weatherData.weather[0]
            const iconUrl ="http://openweathermap.org/img/wn/"+ icon+ ".png"
            res.set("Content-Type", "text/html")
            res.write("<h2>The weather in "+ city + " is "+ temp +"</h2><h3>Description: "+description+"</h3>")
            res.write(`<img src = "${iconUrl}">`)
            res.send()




        })
    })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})




