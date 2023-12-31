const { Schema, Types } = require('mongoose');

const reactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    reactoinBody: {
      type: String,
      required: true,
      maxlength:280
    },
    username: {
      type: STRING,
      required: true,
     
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get:(timestamp) => timestamp.toLocaleDateString()
    },
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);

module.exports = reactionSchema;