const { log } = require("console")
const expres= require("express")
const app = expres()
const https = require("https")
const bodyParser = require("body-parser")
app.use(bodyParser.urlencoded({extended:true}))


app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html")
})


app.post("/", function(req,response){
    
    const query = req.body.cityName;
const url =
    "https://api.openweathermap.org/data/2.5/weather?q="+query+"&units=metric&appid=8c30372062fdd7cf1e7ff17255c7b586";

https.get(url, function (res) {
    console.log(res.statusCode);

    let data = "";

    res.on("data", function (chunk) {
        data += chunk;
    });

    res.on("end", function () {
        const weatherData = JSON.parse(data);
        console.log(weatherData);
         // Now you can use response.write to send data back incrementally
         response.write(`<h1>Weather in ${query}:</h1>`);
         response.write(`<p>Temperature: ${weatherData.main.temp}°C</p>`);
         response.write(`<p>Description: ${weatherData.weather[0].description}</p>`);
       const icon = weatherData.weather[0].icon
       const iconurl = "https://openweathermap.org/img/wn/"+icon+"@2x.png"
       response.write(`<img src=${iconurl}>`)  
         // Don't forget to end the response
         response.end();
        // Now you can send the data back to the client
        // const temp = weatherData.main.temp;
        // const waetherDescription = weatherData.weather[0].description;
        
        
        // response.send(weatherData);
    });
});

})

app.listen(3000, function () {
    console.log("server is running in port 3000");
});

// app.get("/", function (req, response) {
//     // response.sendFile(__dirname+"/index.html")
//     const query = "London"
//     const url =
//         "https://api.openweathermap.org/data/2.5/weather?q="+query+"&units=metric&appid=8c30372062fdd7cf1e7ff17255c7b586";

//     https.get(url, function (res) {
//         console.log(res.statusCode);

//         let data = "";

//         res.on("data", function (chunk) {
//             data += chunk;
//         });

//         res.on("end", function () {
//             const weatherData = JSON.parse(data);
//             console.log(weatherData);
//              // Now you can use response.write to send data back incrementally
//              response.write(`<h1>Weather in London:</h1>`);
//              response.write(`<p>Temperature: ${weatherData.main.temp}°C</p>`);
//              response.write(`<p>Description: ${weatherData.weather[0].description}</p>`);
//            const icon = weatherData.weather[0].icon
//            const iconurl = "https://openweathermap.org/img/wn/"+icon+"@2x.png"
//            response.write(`<img src=${iconurl}>`)  
//              // Don't forget to end the response
//              response.end();
//             // Now you can send the data back to the client
//             // const temp = weatherData.main.temp;
//             // const waetherDescription = weatherData.weather[0].description;
            
            
//             // response.send(weatherData);
//         });
//     });
// });












// app.get("/", function(req,response){
//     const url = "https://api.openweathermap.org/data/2.5/weather?q=London&units=metric&appid=8c30372062fdd7cf1e7ff17255c7b586"
//     https.get(url, function(res){
//         console.log(res.statusCode);
//     })
//     res.on("data", function (chunk) {
//                      data += chunk;
//                 });
//     res.on("data",function(data){
//        const weatherData = JSON.parse(data)
//        console.log(weatherData);
//     })
//     response.send("server is running")

// })
// app.listen(3000, function()
// {
//     console.log("server is running in port 3000");
// })