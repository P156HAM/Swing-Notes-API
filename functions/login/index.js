const { createToken } = require("../../middleware/auth");
const { validateUser } = require("./helpers");
import { sendResponse } from "../../responses/index.js";

exports.handler = async (event) => {
    try {
        const { userName, providedPassword } = JSON.parse(event.body)
        const user = await validateUser(userName, providedPassword);

        if (user) {
            const token = await createToken(userName, user.PK);
            return sendResponse(200, { sucess: true, token: token, user: user })
        } else {
            return (401, { sucess: false, message: "Invalid credentials" })
        }

    } catch (error) {
        return sendResponse(400, { message: error.message })
    }
};
  