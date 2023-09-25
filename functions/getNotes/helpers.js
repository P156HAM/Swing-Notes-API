import { db } from "../../services/db.js";

export async function getNotes(userName) {
    const user = await db.query({
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
    
    if(user.Items) {
        const notes = await db.query({
            TableName: "swing-db",
            IndexName: "GSI1-PK",
            KeyConditionExpression: "#PK = :pk AND begins_with(#SK, :sk)",
            ExpressionAttributeNames: {
                "#PK": "PK",
                "#SK": "SK",
            },
            ExpressionAttributeValues: {
                ":pk": user.Items[0].PK,
                ":sk": 'n#'
            },
        }).promise();
        return notes
    } else {
        throw new Error("User is not found")
    }
}