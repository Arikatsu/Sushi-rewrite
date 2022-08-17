const mongoose = require('mongoose');

const warnSchema = new mongoose.Schema({
    guild_user_id: String,
    warns_num: Number
});

module.exports = mongoose.model('warns', warnSchema);