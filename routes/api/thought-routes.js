const router = require('express').Router();

const {
getAllThoughts,
getThoughtById,
addThought,
updateThought,
deleteThought
} = require('../../controllers/thought-controller');

// api route for thoughts
router
.route('/')
.get(getAllThoughts)
.post(addThought);

// api for thoughts
router
.route('/:thoughtId')
.get(getThoughtById)
.put(updateThought)
.delete(deleteThought);

/* router.route('/thoughts/:thoughtId/reactions').delete(removeReaction); */

module.exports = router;