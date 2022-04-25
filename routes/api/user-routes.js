const router = require('express').Router();

const {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
} = require('../../controllers/user-controller.js');

// api route for thoughts
router
.route('/')
.get(getAllUsers)
.post(createUser);

// api for thoughts
router
.route('/:_Id')
.get(getUserById)
.put(updateUser)
.delete(deleteUser);

/* router.route('/thoughts/:thoughtId/reactions').delete(removeReaction); */

module.exports = router;