const { ObjectId } = require('mongoose').Types;
const { Thought, User, Reaction } = require('../models');


module.exports = {
    // Get all students
    async getThoughts(req,res) {
        try {
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
            const user = await User.findbyIdAndUpdate(req.body.userId,
                { $addToSet: { thoughts: thought._id } },
            )
            return res.json(thoughts);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },
}
