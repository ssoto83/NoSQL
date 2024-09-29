const router = require('express').Router();
const userRoute = require('./api/user-route');  // Import user route
const thoughtRoute = require('./api/thought-route');  // Import thought route

// Use user and thought routes
router.use('/users', userRoute);
router.use('/thoughts', thoughtRoute);

// Handle wrong routes
router.use((req, res) => res.send('Wrong route!'));

module.exports = router;
