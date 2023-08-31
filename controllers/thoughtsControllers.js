const { Thoughts, User } = require("../models");

module.exports = {
  getAllThoughts(req, res) {
    Thoughts.find()
      .then(async (thoughts) => {
        return res.json(thoughts);
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  getSingleThought(req, res) {
    Thoughts.findOne({ _id: req.params.thoughtId })
    .select('-__v')
    .then(async (thought) =>
      !thought
        ? res.status(404).json({ message: 'No thought with that ID' })
        : res.json(
            thought
          )
    )
    .catch((err) => {
      console.log(err);
      return res.status(500).json(err);
    });

  },

  createThought(req, res) {
    Thoughts.create(req.body)
    .then((thought) => res.json(thought))
    .catch((err) => res.status(500).json(err))

  },

  updateThought(req, res) {
    Thoughts.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $set: req.body },
        { runValidators: true, new: true }
      )
        .then((thought) =>
          !thought
            ? res.status(404).json({ message: 'No thought with this id!' })
            : res.json(thought)
        )
        .catch((err) => {
          console.log(err);
          res.status(500).json(err);
        });

  },

  deleteThought(req, res) {
    Thought.findOneAndDelete({ _id: req.params.thoughtId })
    .then((dbThought) => {
      if (!dbThought) {
        res.status(404).json({ message: "No thought found with this id!" });
        return;
      }
     
      return User.findOneAndUpdate(
        { username: dbThought.username },
        { $pull: { thoughts: req.params.thoughtId } },
        { new: true }
      );
    })
    .then((dbUser) => {
      if (!dbUser) {
        res.status(404).json({ message: "No user found with this id!" });
        return;
      }
      res.json(dbUser);
    })
    .catch((err) => res.status(400).json(err));

  },
  createReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $addToSet: { reactions: req.body } }, 
      { new: true }
    )
      .then((dbThought) => {
        if (!dbThought) {
          res.status(404).json({ message: "No thought found with this id!" });
          return;
        }
        res.json(dbThought);
      })
      .catch((err) => res.status(400).json(err));

  },
  deleteReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: { reactionId: req.params.reactionId } } },
      { new: true }
    )
      .then((dbThought) => {
        if (!dbThought) {
          res.status(404).json({ message: "No thought found with this id!" });
          return;
        }
        res.json(dbThought);
      })
      .catch((err) => res.status(400).json(err));
  },

  
};
