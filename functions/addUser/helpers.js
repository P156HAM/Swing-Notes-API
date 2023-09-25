const bcrypt = require('bcryptjs');
import { db } from '../../services/db.js';

export async function bcryptPassword(password, userName) {
    const userExist = await db.query({
        TableName: "swing-db",
        IndexName: "GSI2-PK",
        KeyConditionExpression: "#userName = :userName",
        ExpressionAttributeNames: {
            "#userName": "userName",
        },
        ExpressionAttributeValues: {
            ":userName": userName,
        },
    }).promise();

    if (userExist.Count === 0) {
        const hashedPassword = await bcrypt.hash(password, 10);
        return hashedPassword;
    } else {
        throw new Error("User already exists");
    }
}