const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


const app = express()
const port = process.env.PORT || 3000

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to server
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Clinton Mendoza' 
    })
})
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Clinton Mendoza'
    })
})
app.get('/help', (req,res) =>{
    res.render('help', {
        title: 'Help page',
        helpText: 'This is some helpful text'
    })
})

app.get('/weather', (req,res) => {
    if(!req.query.address){
        return res.send({
            error: 'You must provide an address' 
        })
    } 
    
    geocode(req.query.address, (error,{Latitude, Longitude, Location} = {}) => {
         if (error){
            return res.send({error})
          }
         forecast(Latitude,Longitude, (error, forecastData) => {
           if (error){
              return res.send(error)
             }
         res.send({
              forecast: forecastData,
              Location,
              address: req.query.address
        })
       })
   })
})
app.get('/products', (req,res) => {
    if (!req.query.search){
        return res.send({
            error: 'You must provide a seach term'
        })
    }
    console.log(req.query)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res)=> {
    res.render('error',{
        //title: '404 error',
        name: 'Clinton Mendoza',
        msgError: 'Help article not found'
    })
})
app.get('*', (req, res) =>{
    res.render('error', {
        //title: '404 error',
        name: 'Clinton Mendoza',
        msgError: 'Page not found'
    })
})


//app.com
// app.get('', (req, res) =>{
//     res.send('<h1>Hello express!</h1>')
// })

//app.com/help
// app.get('/help', (req,res) => {
//     res.send('Help page!')
// })
// //app.com/about
// app.get('/about', (req,res) => {
//     res.send([{
//         name: 'Clinton Mendoza',
//         age: 26
//        },
//        {
//         name: 'Clint',
//         age: 'never aged'
//        }
//     ])
// })
//app.com/weather

app.listen(port, ()=> {
    console.log('Server is up on port ' + port)
})