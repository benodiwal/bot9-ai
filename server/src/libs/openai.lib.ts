import getEnvVar from "env/index";
import OpenAI from "openai";
import { ChatCompletionMessageParam } from "openai/resources";

class OpenAIService {
    #client: OpenAI;
    #assistantPrompts: ChatCompletionMessageParam[]

    constructor() {
        this.#client = new OpenAI({
            apiKey: getEnvVar('OPENAI_API_KEY')
        });
        
        this.#assistantPrompts = [
        {
            role: 'assistant',
            content: ''
        }
    ];
    
    }
}

export default OpenAIService;
