const { Thought, User } = require('../models');

const userController = {
    // get all Users
    getAllUsers(req, res) {
      User.find({})
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
          console.log(err);
          res.sendStatus(400);
        });
    },
  
    // get one User by id
    getUserById({ params }, res) {
      User.findOne({ _id: params._id })
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
          console.log(err);
          res.sendStatus(400);
        });
    },
  
    // createUser
    createUser({ body }, res) {
      User.create(body)
        .then(dbUserData => res.json(dbUserData))
        .catch(err => res.json(err));
    },
  
    // update User by id
    updateUser({ params, body }, res) {
      User.findOneAndUpdate({ _id: params._id }, body, { new: true, runValidators: true })
        .then(dbUserData => {
          if (!dbUserData) {
            res.status(404).json({ message: 'No User found with this id!' });
            return;
          }
          res.json(dbUserData);
        })
        .catch(err => res.json(err));
    },
  
    // delete User
    deleteUser({ params }, res) {
      User.findOneAndDelete({ _id: params._id })
        .then(dbUserData => res.json(dbUserData))
        .catch(err => res.json(err));
    }
  };

  module.exports = userController;