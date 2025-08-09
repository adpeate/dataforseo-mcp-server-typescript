import { z } from 'zod';
import { DataForSEOClient } from '../../../client/dataforseo.client.js';
import { BaseTool } from '../../base.tool.js';

export class AiKeywordsSearchVolume extends BaseTool {
  constructor(private client: DataForSEOClient) {
    super(client);
  }

  getName(): string {
    return 'ai_keyword_data_keywords_search_volume';
  }

  getDescription(): string {
    return "Using this function you will get search volume data for your target keywords, reflecting their estimated usage in AI tools";
  }

  getParams(): z.ZodRawShape {
    return {
      keywords: z.array(z.string()).describe("Keyword(s) to analyze, up to a maximum of 1000 keywords."),
      location_name: z.string().optional().describe("Full name of the location (Country) to analyze, e.g. 'United Kingdom'. Field is required if location_code is not specified."),
      location_code: z.number().optional().describe("Location code to analyze. Use the locations and languages API to get the list of codes. Field is required if location_name is not specified."),
      language_name: z.string().optional().describe("Full name of the language (e.g. 'English') to analyze. Field is required if language_code is not specified."),
      language_code: z.number().optional().describe("Language code to analyze. Use the locations and languages API to get the list of codes. Field is required if language_name is not specified."),
    };
  }

  async handle(params: any): Promise<any> {
    try {
        const response = await this.dataForSEOClient.makeRequest('/v3/ai_optimization/ai_keyword_data/keywords_search_volume/live', 'POST', [{
          keywords: params.keywords,
          location_name: params.location_name,
          location_code: params.location_code,
          language_name: params.language_name,
          language_code: params.language_code,
        }]);
        return this.validateAndFormatResponse(response);
      } catch (error) {
        return this.formatErrorResponse(error);
      }
  }
} 