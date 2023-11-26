var express = require('express');
var router = express.Router();
var request = require('request');

const apiKey = '3b92e0c8cc8de7d8c0d28efc111ec88b'; // Replace with your OpenWeatherMap API key
const city = 'Osaka'; // Replace with your desired city
const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

router.get('/', async (req, res) => {
    request(url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            const weatherData = JSON.parse(body);
            // 整形された天気情報を作成
            const formattedWeather = {
                city: city,
                temperature: `${weatherData.main.temp}°C`,
                weather: weatherData.weather[0].main,
                description: weatherData.weather[0].description,
                humidity: `${weatherData.main.humidity}%`,
                windSpeed: `${weatherData.wind.speed} m/s`
            };
            // 整形されたデータをユーザーに送信
            res.json(formattedWeather);
        } else {
            // エラー処理
            res.status(500).send("Unable to retrieve weather data");
        }
    });
});