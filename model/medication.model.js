const mongoose = require('mongoose');
const schema = mongoose.Schema;

const patient = mongoose.model("patient").schema;
const nurse = mongoose.model("nurse").schema;

const medicationModel = new schema({
        patientId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'patient',
            required: true
        },
        nurseId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'nurse',
            required: true
        },
        name: {
            type: String,
            required: true
        },
        end_date: {
            type: Date
        },
        checkups: [
            {
                date_added: {
                  type: Date,
                  required: true
                },
                bodyTemperature: {
                    type: Number,
                    required: true
                },
                heartRate: {
                    type: Number,
                    required: true
                },
                bloodPressure: {
                    type: Number,
                    required: true
                },
                respiratoryRate: {
                    type: Number,
                    required: true
                },
            }
        ],
    },
    {
        timestamps: true
    }
);
module.exports = mongoose.model("medication", medicationModel);