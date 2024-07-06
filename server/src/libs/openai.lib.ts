import getEnvVar from 'env/index';
import OpenAI from 'openai';
import Hotel from 'services/hotel.service';
import { parseEnv } from 'env/index';

class OpenAIService {
  #client: OpenAI;

  constructor() {
    parseEnv();
    this.#client = new OpenAI({
      apiKey: getEnvVar('OPENAI_API_KEY'),
    });
  }

  async botResponse(messages: any): Promise<any> {

    const initialMessage = {
      role: 'system',
      content: 'You are a multilingual assistant. Detect the language of the user and respond in the same language and tone. If you need additional information to proceed, ask the user for it clearly and politely.' 
    };

    if (!messages.some((msg: any) => msg.role === 'system')) {
      messages.unshift(initialMessage);
    }

    const completion = await this.#client.chat.completions.create({
      model: 'gpt-3.5-turbo-0613',
      messages: messages,
      tools: [
        {
          type: 'function',
          function: {
            name: 'get_room_options',
            description: 'Get available room options from the hotel',
            parameters: {
              type: 'object',
              properties: {},
              required: [],
            },
          },
        },
        {
          type: 'function',
          function: {
            name: 'book_room',
            description: 'Book a room at the hotel',
            parameters: {
              type: 'object',
              properties: {
                roomId: { type: 'integer' },
                fullName: { type: 'string' },
                email: { type: 'string' },
                nights: { type: 'integer' },
              },
              required: ['roomId', 'fullName', 'email', 'nights'],
            },
          },
        },
      ],
      tool_choice: 'auto',
    });

    const message = completion.choices[0].message;

    if (message.tool_calls) {
      for (const tool_call of message.tool_calls) {
        const functionName = tool_call.function.name;
        const functionArgs = JSON.parse(tool_call.function.arguments);

        let functionResult;
        if (functionName === 'get_room_options') {
          functionResult = await Hotel.getRoomOptions();
        } else if (functionName === 'book_room') {
          functionResult = await Hotel.bookRoom(functionArgs.roomId, functionArgs.fullName, functionArgs.email, functionArgs.nights);
        }

        messages.push(message);
        messages.push({
          role: 'tool',
          tool_call_id: tool_call.id,
          name: functionName,
          content: JSON.stringify(functionResult),
        });
      }

      return this.botResponse(messages);
    }

    return message;
  }
}

const openAiServcie = new OpenAIService();
export default openAiServcie;
