const { Schema, model } = require("mongoose");
const reactionSchema = require("./reactions")
const thoughtsSchema = new Schema({
    thoughtText:{
        type: String,
      required: true,
      minlength: 1,
      maxlength:280
    },
    createdAt:{
        type: Date,
        default: Date.now,
        get:(timestamp) => timestamp.toLocaleDateString()
    },
    username:{
        type: String,
      required: true,
    },
    reactions:[reactionSchema]
  },
    {
      toJSON: {
        virtuals: true,
        getters: true,
      },
      id: false,
    
});

userSchema.virtual("reactionCount").get(function(){
  return this.reactions.length
})
const Thoughts = model("thoughts",thoughtsSchema)
module.exports = Thoughts;
