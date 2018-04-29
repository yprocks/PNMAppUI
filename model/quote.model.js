const mongoose = require('mongoose');
const schema = mongoose.Schema;
const nurse = mongoose.model("nurse").schema;

const quoteModel = new schema({
        phrase: {
            type: String,
            required: true
        },
        author: {
            type: String
        },
        nurseId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'nurse',
            required: true
        }
    },
    {
        timestamps: true
    }
);
module.exports = mongoose.model("quotes", quoteModel);