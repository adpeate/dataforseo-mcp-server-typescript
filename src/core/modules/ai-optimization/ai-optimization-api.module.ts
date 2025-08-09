import { BaseModule, ToolDefinition } from '../base.module.js';
import { AiKeywordsSearchVolume } from './tools/keywords-search-volume.tool.js';
import { AiLocationsAndLanguages } from './tools/locations-languages.tool.js';

export class AiOptimizationApiModule extends BaseModule {
  getTools(): Record<string, ToolDefinition> {
    const tools = [
      new AiKeywordsSearchVolume(this.dataForSEOClient),
      new AiLocationsAndLanguages(this.dataForSEOClient),
      // Add more tools here
    ];

    return tools.reduce((acc, tool) => ({
      ...acc,
      [tool.getName()]: {
        description: tool.getDescription(),
        params: tool.getParams(),
        handler: (params: any) => tool.handle(params),
      },
    }), {});
  }
} 