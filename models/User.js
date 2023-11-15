const { Schema, model } = require('mongoose');

// Schema to create User model
const userSchema = new Schema(
  {
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/^(?=.{1,256})(?=.{1,64}@.{1,255}$)[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/,"Invalid email"],
      },
    thoughts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'thought',
        },
    ],
    friends: [
        {
            type: Schema.Types.ObjectId,
            ref: 'user',
        },
    ]
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);


userSchema
  .virtual('friendCount')
  // Getter
  .get(function () {
    return this.friends.length;
  });



// Initialize model
const User = model('user', userSchema);

module.exports = User;
