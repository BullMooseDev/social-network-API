const { ObjectId } = require('bson');
const { Schema, model, types } = require('mongoose');

const reactionSchema = new Schema(
{
    reactionId: {
        type: ObjectId,
        default: ObjectId
    },
    reactionBody: {
        type: String,
        required: true,
        maxlength: 280
    },
    userName: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: createdAtVal => dateFormat(createdAtVal)
    }
});

const Reaction = model('Reaction', reactionSchema);

module.exports = Reaction;