const mongoose = require('mongoose');
const schema = mongoose.Schema;
const nurse = mongoose.model("nurse").schema;
const patient = mongoose.model("patient").schema;

const alertModel = new schema({
        message: {
            type: String,
            required: true
        },
        hasViewed: {
            type: Boolean,
            required: false,
            default: false
        },
        nurseId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'nurse',
            required: true
        },
        patientId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'patient',
            required: true
        }
    },
    {
        timestamps: true
    }
);
module.exports = mongoose.model("alert", alertModel);