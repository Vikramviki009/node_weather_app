const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geoCode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
const port = process.env.PORT || 3000

// Define paths for express config
const publicDirectory = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars location and views engine
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to server
app.use(express.static(publicDirectory));

app.get('', (req, res) => {
    res.render('index', {
        name: "Vikram",
        title: "Weather"
    })
})

app.get('/about', (req, res) =>{
    res.render('about', {
        name: 'Vikram',
        title: "About"
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        name: 'Vikram',
        title: 'Help'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'Please provide the Address'
        })
    }

    const place = req.query.address;

    geoCode(place, (error, {latitude, longitude, location} = {} ) => {
        if(error){
            return res.send({error: error})
        }

        forecast(latitude, longitude, (error, forecastData)=> {
            if(error){
                return res.send({error: error})
            }

            res.send({
                address: place,
                location,
                forecast: forecastData
            })
        })
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Vikram',
        errorMessage: 'Help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Vikram',
        errorMessage: 'Page not found'
    })
})

app.listen(port, () => {
    console.log("Server is up on port " + port)
})