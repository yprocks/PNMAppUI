const mongoose = require('mongoose');
const schema = mongoose.Schema;

const nurse = mongoose.model("nurse").schema;
const userlogin = mongoose.model("userlogin").schema;

const patientModel = new schema({
        name: {
            type: String,
            required: true
        },
        address: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        phone: {
            type: String,
            required: true
        },
        userLoginId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'userlogin',
            required: true,
            unique: true
        },
        nurseId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'nurse',
            required: true
        },
        isOnMedication: {
            type: Boolean,
            required: true
        }
    },
    {
        timestamps: true
    }
);
module.exports = mongoose.model("patient", patientModel);