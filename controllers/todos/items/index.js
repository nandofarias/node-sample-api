const express = require('express');
const router = express.Router({ mergeParams: true });

const controller = require('./controller');

router.post('/', controller.create);
router.put('/:itemId', controller.update);
router.delete('/:itemId', controller.destroy);

module.exports = router;
