const mongoose = require('mongoose');
const schema = mongoose.Schema;
const userlogin = mongoose.model("userlogin").schema;

const nurseModel = new schema({
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
        }
    },
    {
        timestamps: true
    }
);
module.exports = mongoose.model("nurse", nurseModel);