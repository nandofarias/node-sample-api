const express = require('express');
const router = express.Router();

const controller = require('./controller');
const items = require('./items');

router.post('/', controller.create);
router.get('/', controller.list);

router.use('/:todoId/items', items);



module.exports = router;
