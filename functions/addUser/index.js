import { db } from "../../services/db.js";
const { bcryptPassword } = require("../addUser/helpers.js");
const { v4: uuidv4 } = require('uuid');
import { sendResponse } from "../../responses/index.js";

exports.handler = async (event) => {
    try {
        const userID = uuidv4()
        const { userName, password } = JSON.parse(event.body)
        const hashedPassword = await bcryptPassword(password, userName)
        const newUser = {
            PK: `u#${userID}`,
            SK: `u#${userID}`,
            entityType: "User",
            userName: userName,
            password: hashedPassword

        }

        await db.put({
            TableName: "swing-db",
            Item: newUser
        }).promise();

        return sendResponse(200, {sucess: true, newUser})
    } catch (error) {
        return sendResponse(400, { message: error.message })
    }
};
  