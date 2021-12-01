import { APIGatewayProxyHandler } from "aws-lambda";
import { document } from "src/utils/dynamodbClient";


export const handle: APIGatewayProxyHandler = async (event) => {
  const { id } = event.pathParameters;

  const response = await document.scan({
    TableName: "users_todos",
    FilterExpression: "user_id = :id",
    ExpressionAttributeValues: { ":id": id },
    ReturnConsumedCapacity: "TOTAL"
  }).promise();

  return {
    statusCode: 200,
    body: JSON.stringify(response.Items)
  }
}