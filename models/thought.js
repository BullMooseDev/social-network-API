const { Schema, model, types } = require('mongoose');

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
    reactions: {
        /* array of nested couments created with the reactionSchema */
    }
});

const Thought = model('thought', thoughtSchema);

module.exports = Thought;