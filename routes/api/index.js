const router = require('express').Router();
const thoughtRoutes = require('./thoughtRoutes');
// const users = require('./userRoutes');
// const reactions = require('./reactionRoutes');

router.use('/thoughts', thoughtRoutes);
// router.use('/users', userRoutes);
// router.use('/reactions', reactionRoutes);

module.exports = router;
