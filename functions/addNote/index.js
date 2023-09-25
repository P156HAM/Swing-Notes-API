const middy = require('@middy/core');
const { validateNoteInput } = require('../../middleware/notesValidation');
const { validateToken } = require('../../middleware/auth');
import { sendResponse } from "../../responses/index.js";
import { db } from "../../services/db.js";

exports.handler = middy()
    .handler(async (event) => {
        try {
            // Check if the event has a validation error response
            if (event.statusCode === 400) {
                // Return the validation error response as is, this gives us information that the validation passed. 
                return event;
            }

            console.log(event.body);
            const { text, title } = JSON.parse(event.body);
            const userId = event.userId;
            const id = userId.substring(2);
            const createdAt = new Date().toISOString();
            const modifiedAt = new Date().toISOString();
            const newNote = {
                PK: `u#${id}`,
                SK: `n#${id}`,
                entityType: "Note",
                title: title,
                text: text,
                createdAt: createdAt,
                modifiedAt: modifiedAt,                
            }

            console.log(newNote)

            await db.put({
                TableName: "swing-db",
                Item: newNote
            }).promise();

            return sendResponse(200, { success: true, message: "Note added successfully" });
        } catch (error) {
            return sendResponse(400, { message: error.message });
        }
    })
    .use(validateToken)
    .use(validateNoteInput);