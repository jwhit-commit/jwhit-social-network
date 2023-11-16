const { ObjectId } = require('mongoose').Types;
const { Thought, User, Reaction } = require('../models');


module.exports = {
    // Get all students
    async getUsers(req,res) {
        try {
            const users = await User.find();
            return res.json(users);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },
    async newUser(req,res) {
        try {
            console.log("Adding new user");
            console.log(req.body);
            const user = await User.create(req.body);
            return res.json(user);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },
    async getSingleUser(req,res) {
        try {
            console.log(req.params.userId);
            const user = await User.findOne({ _id: req.params.userId })
              .select('-__v')
              .lean();
      
            if (!user) {
              return res.status(404).json({ message: 'No user with that ID' });
            }
      
            return res.json(user);

          } catch (err) {
            console.log(err);
            return res.status(500).json(err);
          }
        },
    async updateUser(req, res) {
        try {
            const user = await User.findOneAndUpdate(
            { _id: req.params.userId },
            { $set: req.body },
            { runValidators: true, new: true }
        );

        if (!user) {
            return res.status(404).json({ message: 'No user with this id!' });
        }

        res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async deleteUser(req, res) {
        try {
          const user = await User.findOneAndDelete({ _id: req.params.userId });
    
          if (!user) {
            return res.status(404).json({ message: 'No user with that ID' });
          }

          await Thought.deleteMany({ _id: { $in: user.thoughts } });
    
          res.json({ message: 'User deleted!' });
        } catch (err) {
          res.status(500).json(err);
        }
    },
    async addFriend(req, res) {
        try {
            const user = await User.findOneAndUpdate(
            { _id: req.params.userId },
            { $addToSet: { friends: req.params.friendId } },
            { new: true }
        );

        if (!user) {
            return res.status(404).json({ message: 'No user with this id!' });
        }

        res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async deleteFriend(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $pull: { friends: req.params.friendId } },
                { runValidators: true, new: true }
        );
        console.log(req.params.friendId)

        if (!user) {
            return res.status(404).json({ message: 'No user with this id!' });
        }

        res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },
}
