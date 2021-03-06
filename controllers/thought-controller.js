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
        .sort({_Id: -1})
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => {console.log(err); res.sendStatus(400)})
    },

    //get a single thought by id
    getThoughtById({params}, res) {
        Thought.findOne({ _Id: params.id})
        .populate({
            path: 'users',
            select: '-__v'
        })
        select("-__v")
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => {
            console.log(err);
            res.sendStatus(400);
        })
    },

    // create a thought
    addThought({ params, body }, res) {
        console.log(params);
        Thought.create(body)
        .then(({_Id}) => {
            return User.findOneAndUpdate(
                { _Id: params.userId},
                { $push: { user: _Id }},
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
    deleteThought({ params }, res) {
        Thought.findOneAndDelete({ _Id: params.id })
          .then(dbThoughtData => res.json(dbThoughtData))
          .catch(err => res.json(err));
      }
};

module.exports = thoughtController;