const express = require('express')
const router = express.Router()
const ctrl = require('../../controllers/contacts')
const { ctrlWrapper } = require('../../helpers')

router.get('/', ctrlWrapper(ctrl.getAll))
router.get('/:contactId', ctrlWrapper(ctrl.getById))
router.post('/', ctrlWrapper(ctrl.addContact) )
router.delete('/:contactId', ctrlWrapper(ctrl.removeById))
router.put('/:contactId', ctrlWrapper(ctrl.updateById))

module.exports = router
