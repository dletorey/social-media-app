const {model, Schema} =  require('mongoose');

const userSchema = new Schema({
    username: String,
    password: String,
    email: String,
    createdAt: Date,
    firstName: String,
    lastName: String
});

module.exports = model('User', userSchema);