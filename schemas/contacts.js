const Joi = require("joi")

const addSchema = Joi.object(
    {
        name: {
          type: String,
          required: [true, 'Set name for contact'],
        },
        email: {
          type: String,
        },
        phone: {
          type: String,
        },
        favorite: {
          type: Boolean,
          default: false,
        },
      }
//     {
//     name: Joi.string().required(),
//     email: Joi.string()
//     .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
//     phone: Joi.number().required()
//   }
  )

  module.exports = addSchema