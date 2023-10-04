import { NextResponse } from "next/server";
import { ChatCompletionRequestMessage, Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);
export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { messages } = body;

    const customPrompt: ChatCompletionRequestMessage = {
      role: "system",
      content:
        "You're a code generator. You must reply using markdown code while adding comments to the code you generate. You shouldn't respond to promps that are not related to coding.",
    };

    if (!configuration.apiKey) {
      return new NextResponse("API Key required", { status: 401 });
    }

    if (!messages) {
      return new NextResponse("Msg required", { status: 400 });
    }

    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [customPrompt, ...messages],
    });

    return NextResponse.json(response.data.choices[0].message);
  } catch (error) {
    console.log(error);
    return new NextResponse("An error occurred", { status: 500 });
  }
}