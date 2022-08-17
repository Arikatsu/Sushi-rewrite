const mongoose = require('mongoose');

const welcomeChSchema = new mongoose.Schema({
    guild_id: String,
    wel_ch_id: String
});

module.exports = mongoose.model('welcome_channels', welcomeChSchema);