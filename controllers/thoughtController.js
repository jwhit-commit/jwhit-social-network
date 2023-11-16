const { ObjectId } = require('mongoose').Types;
const { Thought, User, Reaction } = require('../models');


module.exports = {
    // Get all students
    async getThoughts(req,res) {
        try {
            console.log(req);
            const thoughts = await Thought.find();
            return res.json(thoughts);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },
    async newThought(req,res) {
        try {
            console.log("Adding new thought");
            console.log(req.body);
            const thought = await Thought.create(req.body);
            const user = await User.findByIdAndUpdate(req.body.userId,
                { $addToSet: { thoughts: thought._id } },
            )
            return res.json(thought);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },
    async getSingleThought(req,res) {
        try {
            console.log(req.params.thoughtId);
            const thought = await Thought.findOne({ _id: req.params.thoughtId })
              .select('-__v')
              .lean();
      
            if (!thought) {
              return res.status(404).json({ message: 'No thought with that ID' });
            }
      
            return res.json(thought);

          } catch (err) {
            console.log(err);
            return res.status(500).json(err);
          }
    },
    async updateThought(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body },
            { runValidators: true, new: true }
        );

        if (!thought) {
            return res.status(404).json({ message: 'No thought with this id!' });
        }

        res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async deleteThought(req, res) {
        try {
          const thought = await Thought.findOneAndDelete({ _id: req.params.thoughtId });
    
          if (!thought) {
            return res.status(404).json({ message: 'No thought with that ID' });
          }
    
          res.json({ message: 'Thought deleted!' });
        } catch (err) {
          res.status(500).json(err);
        }
      },
}
