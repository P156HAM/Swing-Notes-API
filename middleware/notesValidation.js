const Joi = require('joi')

export const validateNoteInput = {
    before: async (request) => {
        const schema = Joi.object({
            title: Joi.string().max(50).required(),
            text: Joi.string().max(300).required(),
          });
          
          console.log(request.event.body)
          const { error } = schema.validate(request.event.body);
          if (error) {
            request.event.error = '400'
            return request.response
          } 
          return request.response
    }
 
}