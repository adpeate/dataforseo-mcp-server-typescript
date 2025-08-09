import { z } from 'zod';
import { DataForSEOClient } from '../../../client/dataforseo.client.js';
import { BaseTool } from '../../base.tool.js';

export class AiLocationsAndLanguages extends BaseTool {
  constructor(private client: DataForSEOClient) {
    super(client);
  }

  getName(): string {
    return 'ai_locations_languages';
  }

  getDescription(): string {
    return "Using this function you will get the full list of locations and languages supported in AI Keywords Search Volume API";
  }

  getParams(): z.ZodRawShape {
    return {};
  }

  async handle(params: any): Promise<any> {
    try {
        const response = await this.dataForSEOClient.makeRequest('/v3/ai_optimization/ai_keyword_data/locations_and_languages', 'GET', [{
        }]);
        return this.validateAndFormatResponse(response);
      } catch (error) {
        return this.formatErrorResponse(error);
      }
  }
} 