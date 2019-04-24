const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true }, // unique is not validator, it is used to optimize database
  password: { type: String, required: true }
});

userSchema.plugin(uniqueValidator); //plugin() is provided by mongoose

module.exports = mongoose.model('User', userSchema);