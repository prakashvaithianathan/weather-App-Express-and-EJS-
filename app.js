const express = require('express');
const app = express();
const https = require('https');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const path = require('path');

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use('/favicon',express.static(path.join(__dirname,'/favicon')))
app.use(express.static('aaa'));
// app.use('/css',express.static(path.join(__dirname,'/css')));
app.use('/images',express.static(path.join(__dirname,'/images')))




app.get('/', (req, res) =>{
    res.sendFile(path.join(__dirname,'/aaa/index.html'))
})

app.post('/data',(req, res) =>{
   
    const cityName = req.body.cityname;
    if(cityName==""){
        return;
    }
    const url =`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=b1ec96a976a8441e9088e75c5b1f1d68`
    https.get(url,(response)=>{
       
        response.on('data',(data)=>{
            const info = JSON.parse(data);
            res.render("output",{
                temp:info.main.temp-273.15,
                tempMin:info.main.temp_min-273.15,
                tempMax:info.main.temp_max-273.15,
                humidity:info.main.humidity,
                windSpeed:info.wind.speed,
                description:info.weather[0].description,
                icon:info.weather[0].icon,
                image:`https://openweathermap.org/img/wn/${info.weather[0].icon}@2x.png`,
                name:info.name
            })
            
        })
    })
})

app.listen(5000,()=>{
    console.log('server started');
})

