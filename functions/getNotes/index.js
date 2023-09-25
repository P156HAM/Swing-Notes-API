const { validateToken } = require("../../middleware/auth");
const { sendResponse } = require("../../responses");
const { getNotes } = require("./helpers");
const middy = require('@middy/core')

exports.handler = middy()
    .handler(async (event) => {
        try {

            if(!event?.username || (event?.error && event?.error === '401')) return sendResponse(401, { sucess: false, message: 'Invalid token' })

            const notes = await getNotes(event.username);
    
            if (!notes) {
                return sendResponse(401, { sucess: false, message: 'No account found for the giving details!' })
            } else {
                return sendResponse(200, { sucess: true, notes })
            }
        } catch (error) {
            return sendResponse(400, { message: error.message })
        }
    })
    .use(validateToken);



