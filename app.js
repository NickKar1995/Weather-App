const express = require('express');

const https = require('https')


const app = express();

// //
// app.use('/css', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css')))
// app.use('/js', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/js')))
// app.use('/js', express.static(path.join(__dirname, 'node_modules/jquery/dist')))
// //

app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));

app.set('view engine', 'ejs');


// var input = document.getElementById("cityInput");
//
//
//
// input.addEventListener("keyup", function(event) {
//   // Number 13 is the "Enter" key on the keyboard
//   if (event.keyCode === 13) {
//     // Cancel the default action, if needed
//     event.preventDefault();
//     // Trigger the button element with a click
//     document.getElementById("myBtn").click();
//   }
// });


app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
  
})

app.post('/', (req, res) => {
  const query = req.body.cityName;
  const apiKey = '03c79c5746b13b4a9c455a1b427842e7'
  const unit = 'metric'
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${apiKey}&units=${unit}`

  https.get(url, function(response) {


    response.on('data', (data) => {
      const weatherData = JSON.parse(data)
      const temp = weatherData.main.temp;
      const weatherDescription = weatherData.weather[0].description
      const icon = weatherData.weather[0].icon;
      const imageURL = `http://openweathermap.org/img/wn/${icon}@2x.png`
      console.log(weatherDescription)
      // res.write(`<p>Weather is ${weatherDescription} </p>`)
      // res.write(`<h1>Temperature in ${query} is ${temp}</h1>`)
      // res.write(`<img src = ${imageURL}>`)

      // ,temp:temp,weatherDescription:weatherDescription
      
      res.render('card',{Town:query,Temp:temp,Descr:weatherDescription,img:imageURL})

  //     res.write(`<div class="container-fluid">
  //     <div class="row justify-content-center">
  //         <div class="col-12 col-md-5 col-sm-12 col-xs-12">
  //             <div class="card text-white">
  //                 <div class="div1 p-4 p-md-5 ">
  //                     <h5>${query}</h5>
  //                     <h1>${temp}<sup>°C </sup> </h1>
  //                     <h4 class="my-0">${weatherDescription}</h4>
  //                     <img src = ${imageURL}>
  //                 </div>
  //                 <div class="div2"> </div>
  //             </div>
  //         </div>
  //     </div>
  // </div>`)
      res.send()
    })
  })


  console.log(req.body.cityName)
  console.log('RECEIVED')
})





// const query = 'London';
// const apiKey = '03c79c5746b13b4a9c455a1b427842e7'
// const unit = 'metric'
// const url = `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${apiKey}&units=${unit}`
//
// https.get(url,function(response){
//
//
//   response.on('data',(data)=>{
//     const weatherData = JSON.parse(data)
//     const temp = weatherData.main.temp;
//     const weatherDescription = weatherData.weather[0].description
//     const icon = weatherData.weather[0].icon;
//     const imageURL =  `http://openweathermap.org/img/wn/${icon}@2x.png`
//     console.log(weatherDescription)
//     res.write(`<p>Weather is ${weatherDescription} </p>`)
//     res.write(`<h1>Temperature in London is ${temp}</h1>` )
//     res.write(`<img src = ${imageURL}>`)
// res.send()
// })
// })


app.listen(3000, function() {
  console.log('Up n running on 3000')
})









//       res.write(`<!doctype html>
//       <html lang="en">
//         <head>
//           <title>Weather App</title>
//           <!-- Required meta tags -->
//           <meta charset="utf-8">
//           <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
//
//           <!-- Bootstrap CSS -->
//           <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
//           <link rel="stylesheet" href="styles.css">
//         </head>
//         <body>
//         <h1>Here i am</h1>
//
//
//
//
//           <!-- Optional JavaScript -->
//           <!-- jQuery first  then Bootstrap JS -->
//           <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
//           <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>
//         </body>
//       </html>
// `)
