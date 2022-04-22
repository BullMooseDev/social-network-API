const { Thought, User } = require('../models');

const thoughtController = {
    // get all thoughts
    getAllThoughts( req, res) {
        Thought.find({})
        .populate({
            path: 'thoughts',
            select: '-__v'
        })
        .select('-__v')
        .sort({_id: -1})
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => {console.log(err); res.sendStatus(400)})
    },

    // create a thought
    addThought({ params, body }, res) {
        console.log(params);
        Thought.create(body)
        .then(({_id}) => {
            return User.findOneAndUpdate(
                { _id: params.userId},
                { $push: { user: _id }},
                { new: true}
            );
        })
        .then(dbUserdata => {
            console.log(dbUserdata);
            if (!dbUserdata) {
                res.status(404).json({message: 'no user found with this id!'});
                return;
            }
            res.json(dbUserdata);
        })
        .catch(err => res.json(err));
    },

    // update a thought
    updateThought({ params, body}, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId},
            {$push: {thoughts: body}},
            {new: true, runValidators: true}
        )
        .then(dbUserdata => {
            if (!dbUserdata) {
                res.status(404).json({ message: 'no user found with this id'});
                return
            }
            res.json(dbUserdata);
        })
        .catch(err => res.json(err));
    },

    //remove a thought
};

module.exports = thoughtController;


/* 

- get all users

- get a single user by its id and populated thought and friend data

- post new user

- put to update by id

/api/users/:userId/friends/:friendId

- get all thoughts

- get a single thought

- post create a new thought (push the created thoughts id to the associated user)

- PUT to update a thought by its _id

DELETE to remove a thought by its _id

/api/thoughts/:thoughtId/reactions

POST to create a reaction stored in a single thought's reactions array field

DELETE to pull and remove a reaction by the reaction's reactionId value
*/