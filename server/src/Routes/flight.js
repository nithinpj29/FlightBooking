const express = require('express');
const router = express.Router();
const Flight = require('../Models/flight');
const authenticate = require('../middleware/authenticationMiddleware');

// get available flight
router.get('/availableflight',async (req, res) => {
  try{
    let flightAvailable=[{
      airline: "Airline A",
      departurePlace: "New York",
      departureDate: "2024-09-15",
      departureTime: "14:30",
      arrivalPlace: "London",
      arrivalDate: "2024-09-16",
      arrivalTime: "06:00",
      price: 750},
      {
        airline: "Airline A",
        departurePlace: "New York",
        departureDate: "2024-09-15",
        departureTime: "14:30",
        arrivalPlace: "London",
        arrivalDate: "2024-09-16",
        arrivalTime: "06:00",
        price: 750},
        {
          airline: "Airline A",
          departurePlace: "New York",
          departureDate: "2024-09-15",
          departureTime: "14:30",
          arrivalPlace: "London",
          arrivalDate: "2024-09-16",
          arrivalTime: "06:00",
          price: 750}
    ]
    res.status(201).send(flightAvailable);

  }catch(error){
    res.status(400).send({ message: "Something went wrong" });
  }
 
 
});

router.get('/bookedflights',authenticate,async (req, res) => {
  try {
    // Check if the collection is empty
    const count = await Flight.countDocuments();
    
    if (count === 0) {
      // Collection is empty, so insert new data
      const bookedFlight = [{
        airline: "US AirLine",
        departurePlace: "New York",
        departureDate: "2024-09-15",
        departureTime: "14:30",
        arrivalPlace: "London",
        arrivalDate: "2024-09-16",
        arrivalTime: "06:00",
        price: 750
      },
      {
        airline: "Dubai Emirates",
        departurePlace: "New York",
        departureDate: "2024-09-15",
        departureTime: "14:30",
        arrivalPlace: "London",
        arrivalDate: "2024-09-16",
        arrivalTime: "06:00",
        price: 750}
      ];
      
      const bookedflights = new Flight(bookedFlight);
      await bookedflights.save(); // Save the new flight
    }

    // Fetch and send all booked flights
    const bookedflights = await Flight.find();
    res.status(201).send(bookedflights);
  } catch (error) {
    res.status(400).send({ message: "Something went wrong" });
  }
 
});
router.post("/conformbook",authenticate,async(req,res)=>{
  try{
    let bookParams=req.body;

    console.log("params",req.body)
      const newBookParams = {
        airline: bookParams.airline,
        departurePlace: bookParams.departurePlace,
        departureDate: bookParams.departureDate,
        departureTime: bookParams.departureTime,
        arrivalPlace: bookParams.arrivalPlace,
        arrivalDate: bookParams.arrivalDate,
        arrivalTime: bookParams.arrivalTime,
        price: bookParams.price,
       }
      // Add the new flight to the table
      let newFlightSave=new Flight(newBookParams)
      await newFlightSave.save()
      const conformedBooks= await Flight.find()
    console.log("pj",conformedBooks)
    res.status(201).send(conformedBooks);

  }catch(error){
    res.status(400).send({ message: "Something went wrong" });
  }

})

// delete flight
router.get('/tasks', authenticate, async (req, res) => {
 // const tasks = await Task.find({ userId: req.user._id });
  res.send("tasks");
});


// Delete Flight
router.delete('/flight/:id', authenticate,async (req, res) => {
  try {
    console.log("params",req.params)
    const flight = await Flight.findByIdAndDelete(req.params.id);
    
    // If the flight with the given id is not found
    if (!flight) {
      return res.status(404).send({ message: 'Flight not found' });
    }

    res.send({ message: 'Flight deleted successfully' });
  } catch (error) {
    console.error('Error deleting flight:', error);
    res.status(500).send({ message: 'Something went wrong' });
  }
});

router.put('/flight/:id',authenticate, async (req, res) => {
  const flightId = req.params.id;
  const updatedFlightData = req.body;
console.log("rrrr",updatedFlightData)
  try {
    const updatedFlight = await Flight.findByIdAndUpdate(flightId, updatedFlightData, { new: true });

    if (!updatedFlight) {
      return res.status(404).json({ message: 'Flight not found' });
    }

    res.status(200).json(updatedFlight);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
