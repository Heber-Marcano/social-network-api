const router = require('express').Router();
const {
getAllThoughts,
getSingleThought,
createThought,
updateThought,
deleteThought,
createReaction,
deleteReaction
} = require('../../controllers/thoughtsControllers');

// /api/thoughts
router.route('/').get(getAllThoughts).post(createThought);

// /api/students/:studentId
router.route('/:thoughtId').get(getSingleThought).delete(deleteThought).put(updateThought);

// /api/students/:studentId/assignments
router.route('/:thoughtId/reactions').post(createReaction);

// /api/students/:studentId/assignments/:assignmentId
router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction);

module.exports = router;