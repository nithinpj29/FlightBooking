const mongoose = require('mongoose');

const flightSchema = new mongoose.Schema({
  airline: { type: String, required: true },
  departurePlace: { type: String, required: true },
  departureDate: { type: String, required: true }, // or Date if using actual Date type
  departureTime: { type: String, required: true },
  arrivalPlace: { type: String, required: true },
  arrivalDate: { type: String, required: true },  // or Date if using actual Date type
  arrivalTime: { type: String, required: true },
  price: { type: Number, required: true }
});

const Flight = mongoose.model('Flight', flightSchema);
module.exports = Flight;