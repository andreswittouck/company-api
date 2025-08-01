import { APIGatewayEvent, APIGatewayProxyResult } from "aws-lambda";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  PutCommand,
  DynamoDBDocumentClient,
  GetCommand,
} from "@aws-sdk/lib-dynamodb";

// Create DynamoDB client
const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

export const handler = async (
  event: APIGatewayEvent
): Promise<APIGatewayProxyResult> => {
  try {
    const body = JSON.parse(event.body || "{}");
    const { cuit, name, joinDate, type } = body;

    // Validate required fields
    if (
      !name ||
      !cuit ||
      !type ||
      typeof name !== "string" ||
      !/^\d{11}$/.test(cuit) ||
      !["pyme", "corporativa"].includes(type.toLowerCase())
    ) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          statusCode: 400,
          message: "Missing or invalid required fields",
        }),
      };
    }

    // Check if CUIT already exists
    const getCommand = new GetCommand({
      TableName: "Companies",
      Key: { cuit },
    });

    const result = await docClient.send(getCommand);

    if (result.Item) {
      return {
        statusCode: 409,
        body: JSON.stringify({
          statusCode: 409,
          message: "Company with this CUIT already exists",
        }),
      };
    }

    // Use current date if registrationDate is not provided or invalid
    const finalDate =
      joinDate && /^\d{4}-\d{2}-\d{2}$/.test(joinDate)
        ? joinDate
        : new Date().toISOString().split("T")[0];

    // Store in DynamoDB
    const command = new PutCommand({
      TableName: "Companies",
      Item: {
        cuit,
        name,
        registrationDate: finalDate,
        type,
      },
    });

    await docClient.send(command);

    return {
      statusCode: 201,
      body: JSON.stringify({
        statusCode: 201,
        message: "Company registered successfully",
      }),
    };
  } catch (error) {
    console.error("❌ Error processing request:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        statusCode: 500,
        message: "Internal server error",
      }),
    };
  }
};
