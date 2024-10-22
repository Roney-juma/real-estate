// Building model
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const buildingSchema = new Schema(
    {
        name: { type: String, required: true },
        street: { type: String, required: true },
        city: { type: String, required: true},
        area: {type: String, required: true}
    }

)
const Building = mongoose.model('Building', buildingSchema);
module.exports = Building;