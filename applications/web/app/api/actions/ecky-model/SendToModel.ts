import { EckyModelResponse } from "@ecowat/shared";
import { randomUUID } from "crypto";

export async function SendToModel(userId: string, question: string) {
  const model_route = `${process.env.MODEL_URL}/ecky-model`;
  console.log("routeussss==",model_route)

  const messageId = randomUUID() + "_" + userId;
  const res = await fetch(model_route, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ question, userId }),
  });

  if (!res.ok) {
    throw new Error(await res.text());
  }

  const text = await res.text();
  console.log("text is ==", text);

  const data = JSON.parse(text);

  const result: EckyModelResponse = {
    role: data.role,
    message: data.message,
    messageId: data.messageId ?? messageId,
    action: data.action,
    parameters: data.parameters,
  };
  console.log("Query sent to model:");
  console.log(JSON.stringify(question, null, 2));
  return result;
}
