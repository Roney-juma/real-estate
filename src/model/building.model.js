// Building model
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const buildingSchema = new Schema(
    {
        name: { type: String, required: true },
        street: { type: String, required: true },
        city: { type: String, required: true },
        area: { type: String, required: true },
        country: { type: String }, 
        numberOfUnits: { type: Number, default: 1 },
        buildingType: { 
            type: String, 
            enum: ['residential', 'commercial', 'mixed'],
            required: true 
        },
        owner: { type: Schema.Types.ObjectId, ref: 'Owner' },
        manager: { type: Schema.Types.ObjectId, ref: 'User' },
        amenities: { type: [String] },
        properties: [{ type: Schema.Types.ObjectId, ref: 'Property' }],
        yearBuilt: { type: Number },  
        status: { 
            type: String, 
            enum: ['active', 'inactive', 'under construction'], 
            default: 'active' 
        },
        createdAt: { type: Date, default: Date.now },
        updatedAt: { type: Date, default: Date.now }
    },
    { timestamps: true }
);

const Building = mongoose.model('Building', buildingSchema);
module.exports = Building;