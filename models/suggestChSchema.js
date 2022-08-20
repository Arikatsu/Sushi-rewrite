const mongoose = require('mongoose');

const suggestChSchema = new mongoose.Schema({
    guild_id: String,
    suggest_ch_id: String
});

module.exports = mongoose.model('suggestion_channels', suggestChSchema);