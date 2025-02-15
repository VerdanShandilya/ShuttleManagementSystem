require('dotenv').config();
const express = require('express');
const app = express();
const port = 3000;
const mongoose = require('mongoose');
const Driver = require('./models/DriverSchema');
const Booking = require('./models/BookingSchema');
const cors = require('cors');


app.use(express.json());
app.use(cors(
    {
        origin: '*'
    }
));


// Create a new driver
app.post('/drivers', async (req, res) => {
    try{
    const { name, phone} = req.body;
    console.log(req.body);
    
    const driver = new Driver({ name, phone });

    await driver.save();
    res.send(driver);
    }
    catch(error){
        console.log("error", error);
        
        res.status(400).send(error);
    }
});

// Get all drivers
app.get('/drivers', async (req, res) => {
    const drivers = await Driver.find();
    res.send(drivers);
});


// change the status of driver
app.put('/drivers/:id', async (req, res) => {
    try{
    const { currentStatus} = req.body;
    const driver = await Driver.findByIdAndUpdate(req.params.id, { currentStatus }, { new: true });
    res.send(driver);
    }
    catch(error){
        console.log("error", error);
        
        res.status(400).send(error);
    }
});


// Create a new booking
app.post('/bookings', async (req, res) => {
    try{
    const { customer_name, pickupLocation, dropLocation, date, time} = req.body;
    console.log(req.body);
    
    const booking = new Booking({ customer_name, pickupLocation, dropLocation, date, time });

    await booking.save();
    res.send(booking);
    }
    catch(error){
        console.log("error", error);
        
        res.status(400).send(error);
    }
});

// Get all bookings
app.get('/bookings', async (req, res) => {
    const bookings = await Booking.find();
    res.send(bookings);
});

// now create a api for editing date and time and  status of booking by admin
app.put('/bookings/:id', async (req, res) => {
    try{
    const { date, time, status} = req.body;
    const booking = await Booking.findByIdAndUpdate(req.params.id, { date, time, status }, { new: true });
    res.send(booking);
    }
    catch(error){
        console.log("error", error);
        
        res.status(400).send(error);
    }
});




app.get('/', (req, res) => {
    res.send('Hello World!');
});






// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log("connected to the database");
}).catch((error) => {
    console.log("error ", error);
});


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});