const { Schema, model } = require("mongoose");

const ProfileCreator = new Schema({
    GuildId: {
        type: String,
        required: true
    },
    UserId: {
        type: String,
        required: true
    },
    CommandCount: {
        type: Number,
        required: true
    },
    Playedsong: {
        type: Number,
        required: true
    }
});

module.exports = model('ProfileCreator', ProfileCreator);