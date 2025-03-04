const express = require('express')
const Joi = require("joi")
const router = express.Router()

const contacts = require("../../models/contacts")
const addSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string()
  .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
  phone: Joi.number().required()
})
const {RequestError} = require('../../helpers')

router.get('/', async (req, res, next) => {
  try {
    const result = await contacts.listContacts()
    res.json(result)
  } catch (error) {
    next(error)
  }
})

router.get('/:contactId', async (req, res, next) => {
  try {
     const {contactId} = req.params
     const result = await contacts.getContactById(contactId)
     if(!result) {
      throw RequestError(404, "Not found")
      // const error = new Error("Not found")
      // error.status = 404
      // throw error
      // return res.status(404).json({
      //   message: "Not found"
      // })
     }
     res.json(result)
  } catch (error) {
     next(error)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const {error} = addSchema.validate(req.body)
    if(error) {
      throw RequestError(400, error.message)
    }
    console.log(error)
    const result = await contacts.addContact(req.body)
    res.status(201).json(result)
    // const result = await contacts.addContact(req.body)
    // res.status(201).json(result)
  } catch (error) {
    next(error)
  }
   
})

router.delete('/:contactId', async (req, res, next) => {
  try {
    const {contactId} = req.params;
    const result = await contacts.removeContact(contactId);
    if(!result){
        throw RequestError(404, "Not found")
    }
    res.json({
        message: "Contact deleted"
    })
} catch (error) {
    next(error);
}
})

router.put('/:contactId', async (req, res, next) => {
  try {
    const {error} = addSchema.validate(req.body)
    if(error) {
      throw RequestError(400, error.message)
    }
 
    const {contactId} = req.params
     const result = await contacts.updateContact(contactId, req.body)
     if(!result) {
      throw RequestError(404, "Not found")
      
     }
     res.json(result)
   
   
  } catch (error) {
    next(error)
  }
})

module.exports = router
