const Joi = require('joi');

module.exports = {
  // POST /mail/send
  sendMail: {
    body: {
      username: Joi.string().required(),
      message: Joi.string().required()
    }
  }
};
