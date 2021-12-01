import { APIGatewayProxyHandler } from "aws-lambda";
import { document } from "src/utils/dynamodbClient";
import { v4 as uuidV4 } from "uuid";
import dayjs from "dayjs"
import utc from "dayjs/plugin/utc";

interface ICreateTodo {
  title: string;
  deadline: Date;
}

interface ITodo {
  id: string;
  user_id: string;
  title: string;
  done: boolean;
  deadline: string;
}

dayjs.extend(utc);

export const handle: APIGatewayProxyHandler = async (event) => {
  const { id } = event.pathParameters;
  const { title, deadline } = JSON.parse(event.body) as ICreateTodo;

  const todoData: ITodo = {
    id: uuidV4(),
    user_id: id,
    title,
    done: false,
    deadline: dayjs(deadline).utc().local().format()
  }

  await document.put({
    TableName: "users_todos",
    Item: todoData
  }).promise()

  return {
    statusCode: 201,
    body: JSON.stringify(todoData)
  }
}