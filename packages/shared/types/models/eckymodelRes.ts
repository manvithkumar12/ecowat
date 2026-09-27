export type EckyModelResponse = {
  messageId: string;
  role: "assistant" | "user" | "system";
  message: string;
  action: string;
  parameters?:
    | {
        id: number;
        name: string;
        power: number;
        powerUnit: string;
        time: string;
        usageHours: number;
      }
    | {
        id: number;
        name: string;
        power: number;
        powerUnit: string;
        time: string;
        usageHours: number;
      }[]
    | null;
  sources?: {
    sourceName: string;
    sourceUrl: string;
  }[] | null;
};

