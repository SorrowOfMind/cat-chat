const router = require('express').Router();

router.route('/').get((req, res) => {
    res.send('Server is up and running')
})

module.exports = router;