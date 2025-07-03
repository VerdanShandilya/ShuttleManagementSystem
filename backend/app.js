require('dotenv').config();
const express = require('express');
const app = express();
const port = 3000;
const mongoose = require('mongoose');
const Driver = require('./models/DriverSchema');
const Booking = require('./models/BookingSchema');
const requireAuth = require('./middleware/requireAuth');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const UserSchema = require('./models/UserSchema');


app.use(express.json());
app.use(cors(
    {
        origin: '*'
    }
));


// Create a new driver
app.post('/drivers', async (req, res) => {
    try{
    const { name, phone } = req.body;
    
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
app.post('/bookings',requireAuth, async (req, res) => {
    try{
    const { user } = req;


    const { _id } = user;

    if (!_id) {
        return res.status(401).json({ error: 'User not found' });
    }



    const { customer_name, pickupLocation, dropLocation, date, time} = req.body;
    console.log(req.body);
    
    const booking = new Booking({ userId:_id,customer_name, pickupLocation, dropLocation, date, time });

    await booking.save();
    res.send(booking);
    }
    catch(error){
        console.log("error", error);
        
        res.status(400).send(error);
    }
});

// Get all bookings of a user
app.get('/bookings',requireAuth, async (req, res) => {
    const { user } = req;
    const { _id } = user;
    if (!_id) {
        return res.status(401).json({ error: 'User not found' });
    }
    const bookings = await Booking.find({ userId: _id });
    res.send(bookings);
});

// Get all bookings of a user on admin dashboard
app.get('/admin/bookings', async (req, res) => {

    const bookings = await Booking.find({});
    res.send(bookings);
});

// editing date and time and  status of booking by admin
app.put('/bookings/:id', requireAuth,async (req, res) => {
    try{
    const { user } = req;
    const { _id } = user;
    if (!_id) {
        return res.status(401).json({ error: 'User not found' });
    }

    if (!req.params.id) {
        return res.status(401).json({ error: 'Booking not found' });
    }
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
        return res.status(401).json({ error: 'Booking not found' });
    }
    const { userId } = booking;
    if (userId.toString() !== _id.toString()) {
        return res.status(401).json({ error: 'You are not authorized to edit this booking' });
    }

    const { date, time, status} = req.body;
    const updatedBooking = await Booking.findByIdAndUpdate(req.params.id, { date, time, status }, { new: true });
    res.send(updatedBooking);
    }
    catch(error){
        console.log("error", error);
        
        res.status(400).send(error);
    }
});

// editing date and time and  status of booking by admin
app.put('/admin/bookings/:id',async (req, res) => {
    try{

    if (!req.params.id) {
        return res.status(401).json({ error: 'Booking not found' });
    }
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
        return res.status(401).json({ error: 'Booking not found' });
    }
    
    const { date, time, status} = req.body;
    const updatedBooking = await Booking.findByIdAndUpdate(req.params.id, { date, time, status }, { new: true });
    res.send(updatedBooking);
    }
    catch(error){
        console.log("error", error);
        
        res.status(400).send(error);
    }
});

// handle user signup
app.post('/signup', async (req, res) => {
    const {email, password } = req.body;
    try {
        const user = await UserSchema.signup( email, password);
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
        res.status(200).json({ user: user._id, token });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});
// handle user login
app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await UserSchema.login(email, password);
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
        res.status(200).json({ user: user._id, token });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.get('/', (req, res) => {
    res.send('Hello World!');
});

mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log("connected to the database");
}).catch((error) => {
    console.log("error ", error);
});


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});