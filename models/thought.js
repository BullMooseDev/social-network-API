const { Schema, model, types } = require('mongoose');
const reactionSchema = require('./Reaction')
const dateFormat = require("../utils/dateFormat")

const thoughtSchema = new Schema(
{
    thoughtText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: createdAtVal => dateFormat(createdAtVal)
    },
    userName: {
        type: String,
        required: true
    },
    reactions: [reactionSchema]
});

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;