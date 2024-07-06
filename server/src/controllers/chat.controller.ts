import { Request, Response } from 'express';
import AbstractController from './index.controller';
import openAiServcie from 'libs/openai.lib';

class ChatController extends AbstractController {
  post() {
    return [
      async (req: Request, res: Response) => {
        try {
          const { userId, message } = req.body as { userId: string; message: string };

          let conversation = await this.ctx.db.client.conversation.findFirst({
            where: { userId: userId },
          });

          if (!conversation) {
            conversation = await this.ctx.db.client.conversation.create({
              data: { userId: userId, messages: '[]' },
            });
          }

            const messages = JSON.parse(conversation.messages);
            messages.push({ role: 'user', content: message });

            const response = await openAiServcie.botResponse(messages);
            messages.push(response);

            await this.ctx.db.client.conversation.update({
              where: { id: conversation.id },
              data: { messages: JSON.stringify(messages) },
            });

            res.json({ response: response.content });
          } catch (error) {
          console.error(error);
        }
      },
    ];
  }
}

export default ChatController;
