export type ModuleId = string;

export interface ModuleDef {
  id: ModuleId;
  label: string;
  description: string;
  iconName: string;
  easyDescription: string;
  exampleUsage: {
    input: string;
    output: string;
  };
  usageScenarios: string[];
  // For Custom Modules
  isCustom?: boolean;
  customInstruction?: string; // AI에게 전달할 구체적인 지시사항
}

export type Theme = 'light' | 'dark';

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: number;
}