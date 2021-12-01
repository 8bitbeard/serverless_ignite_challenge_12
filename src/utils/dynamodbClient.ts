import { DynamoDB } from "aws-sdk"

const options = {
  region: "localhost",
  endpoint: "http://localhost:8000"
}

export const document = process.env.IS_OFFLINE ? new DynamoDB.DocumentClient(options) : new DynamoDB.DocumentClient()