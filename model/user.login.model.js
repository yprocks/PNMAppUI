const mongoose = require('mongoose');
const schema = mongoose.Schema;
const crypto = require('crypto');

const salt = '8nkjfdoi@$f93_039_=90ldkv';

const userSchema = new schema({
        username: {
            type: String, required: true, unique: true
        },
        password: {
            type: String, required: true
        },
        isNurse: {
            type: Boolean, required: true
        }
    },
    {
        timestamps: true
    }
);

userSchema.statics.register = function (user, cbfn) {
    user.password = doHash(user.password);
    user.save(cbfn);
};

userSchema.statics.findByName = function (name, cbfn) {
    user.findOne({username: name}, cbfn);
};

userSchema.methods.checkPassword = function (password, cbfn) {
    if (this.password === doHash(password)) {
        cbfn(null, true);
    } else {
        cbfn(new Error('user nameor password does not match', false));
    }
};

function doHash(val) {
    return crypto.pbkdf2Sync(val, salt, 10000, 64, 'sha512').toString('base64');
}

let user = mongoose.model("userlogin", userSchema);

module.exports = user;